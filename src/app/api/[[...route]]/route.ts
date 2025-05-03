import axios from "axios";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { encryptJSON } from "./encryption";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

async function login(username: string, password: string) {
  // console.log("Logging in...", { username, password });
  try {
    const loginResponse = await axios.post(
      "https://uirms.ui.edu.ng/student/backend/authentication.php?action=login",
      JSON.stringify({
        username,
        password,
      }),
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    const loginData = loginResponse.data;

    if (loginData.status !== "success") {
      throw new Error("Login failed: " + loginData.message);
    }

    // console.log("Login successful");
    return {
      key: loginData.user_details.key,
      matricNo: loginData.user_details.username,
      level: loginData.bio_data.level || "",
      bio_data: loginData.bio_data,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      if (axios.isAxiosError(error) && error.response) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

async function fetchStudentDataFromAPI(
  path: string,
  queryParams: Record<string, string>
) {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `https://uirms.ui.edu.ng/student/backend/${path}?${queryString}`;
    const response = await axios.get(url);

    const data = response.data;
    // console.log("API response:", data);

    if (data.status !== "success") {
      throw new Error("Failed to fetch data: " + data.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    } else {
      console.error("Fetch error:", error);
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
}

interface Session {
  _id: string;
  session: string;
}

async function getSessionName(
  sessions: Session[],
  sessionId: string
): Promise<string> {
  if (!sessions || !Array.isArray(sessions)) {
    throw new Error("Invalid sessions data");
  }
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  const session = sessions.find(
    (session: Session) => session._id === sessionId
  );
  if (!session) {
    throw new Error("Session not found");
  }
  return session.session;
}

async function fetchStudentData(username: string, password: string) {
  const { key, matricNo, level, bio_data } = await login(username, password);

  const data = await fetchStudentDataFromAPI("student.php", {
    action: "get_student_data_res",
    matricNo,
    key,
  });

  const sessions = data.student_sessions;
  const session_id = data.current_session.session_id

  const studentCourses = data.student_results || [];
  interface StudentCourse {
    course_code: string;
    course_title: string;
    course_units: string;
    result: string;
  }

  interface FetchStudentDataResult {
    level: string;
    semester: string;
    result: StudentCourse[];
    sessions: Session[];
    session_id: string;
  }

  return {
    level: bio_data.active_session || level + " Level",
    semester: "Session",
    result: studentCourses
      .filter((course: { result?: string }) => course.result !== "NA")
      .map(
        (course: {
          course_code?: string;
          course_title?: string;
          course_units?: string;
          result?: string;
        }): StudentCourse => ({
          course_code: course.course_code || "",
          course_title: course.course_title || "",
          course_units: course.course_units || "",
          result: course.result || "",
        })
      ),
    sessions,
    session_id,
  } as FetchStudentDataResult;
}

async function getSessionalStudentResults(
  username: string,
  password: string,
  session: number
) {
  const { key, matricNo, level } = await login(username, password);

  const data = await fetchStudentDataFromAPI("student.php", {
    action: "get_sessional_student_results",
    matricNo,
    key,
    session: session.toString(),
  });

  const studentCourses = data.session_courses || [];
  interface StudentCourse {
    course_code: string;
    course_title: string;
    course_units: string;
    result: string;
  }

  interface SessionalStudentResults {
    level: string;
    semester: string;
    result: StudentCourse[];
  }

  const session_name = await getSessionName(
    data.student_sessions,
    session.toString()
  );

  return {
    level: session_name || level + " Level",
    semester: "Session",
    result: studentCourses
      .filter((course: { result?: string }) => course.result !== "NA")
      .map(
        (course: {
          course_code?: string;
          course_title?: string;
          course_units?: string;
          result?: string;
        }): StudentCourse => ({
          course_code: course.course_code || "",
          course_title: course.course_title || "",
          course_units: course.course_units || "",
          result: course.result || "",
        })
      ),
  } as SessionalStudentResults;
}

app.post("/fetch-results", async (c) => {
  const { username, password } = await c.req.json();

  try {
    const result = await fetchStudentData(username, password);
    const sessions = [...result.sessions];
    const session_id = result.session_id;

    // Remove the session data from the result
    delete (result as { sessions?: unknown }).sessions;
    delete (result as { session_id?: unknown }).session_id;

    // console.log("Fetched results:", result);
    const encyptedResult = await encryptJSON(
      result,
      process.env.ENCRYPTION_KEY || ""
    );

    return c.json({
      sessions,
      session_id,
      message: "Results fetched successfully",
      data: "point-scale://import?result=" + encyptedResult,
    });
  } catch (error) {
    return c.json({
      message: "Error fetching results",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

app.post("/fetch-sessional-results", async (c) => {
  const { username, password, session } = await c.req.json();
  // console.log("Received credentials:", { username, password, session });
  try {
    const result = await getSessionalStudentResults(
      username,
      password,
      session
    );

    const encyptedResult = await encryptJSON(
      result,
      process.env.ENCRYPTION_KEY || ""
    );
    // console.log("Encrypted result:", encyptedResult);
    return c.json({
      message: "Results fetched successfully",
      session_id: session,
      data: "point-scale://import?result=" + encyptedResult,
    });
  } catch (error) {
    return c.json({
      message: "Error fetching results",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

export const GET = handle(app);
export const POST = handle(app);
