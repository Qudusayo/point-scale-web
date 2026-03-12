import { createTw } from "react-pdf-tailwind";

export const tw = createTw({
  theme: {
    extend: {
      colors: {
        primary: "#5271FF",
      },
    },
  },
});

const gradePoint = (score: number | string) => {
  const numericScore = typeof score === "string" ? parseFloat(score) : score;
  if (isNaN(numericScore)) return 0;
  
  if (numericScore >= 70) return 5; // Fixed UI RMS typical 5.0 scale if requested, but snippet used 4. Adjusting to common UI standard or keeping as is.
  if (numericScore >= 60) return 4;
  if (numericScore >= 50) return 3;
  if (numericScore >= 45) return 2;
  if (numericScore >= 40) return 1;
  return 0;
};

// Reverting to the user's specific logic from the snippet to be safe, but adding string handling
export const snippetGradePoint = (score: any) => {
    const num = parseFloat(score);
    if (isNaN(num)) return 0;
    if (num >= 70) return 4;
    if (num >= 60) return 3;
    if (num >= 50) return 2;
    if (num >= 45) return 1;
    return 0;
};

export function calculateCGPA(results: any[]) {
  let totalUnits = 0;
  let totalUnitPassed = 0;
  let totalGradePoint = 0;

  results.forEach(course => {
    const units = parseFloat(course.course_units) || 0;
    const score = parseFloat(course.result) || 0;
    
    totalUnits += units;
    totalUnitPassed += score >= 45 ? units : 0;
    totalGradePoint += (units * snippetGradePoint(score));
  });

  const cgpa = totalUnits > 0 ? Math.round(((totalGradePoint / totalUnits) + Number.EPSILON) * 100) / 100 : 0;
  return [totalUnits, totalUnitPassed, totalGradePoint, cgpa];
}

export const getResultTableData = (course: any) => [
  course?.course_code || "",
  course?.course_title || "",
  course?.course_units || "0",
  course?.result || "0",
  snippetGradePoint(course?.result) * (parseFloat(course?.course_units) || 0),
  parseFloat(course?.result) >= 45 ? "Passed" : "Failed",
];
