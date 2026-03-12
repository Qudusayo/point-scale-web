import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { resultStyles, pageWrapperStyles } from "./styles";
import { calculateCGPA, tw, snippetGradePoint, getResultTableData } from "./utils";

const weightings = [1.6, 8, 1, 1.6, 1, 1.8];

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5271FF",
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#000",
  },
  userInfo: {
    fontSize: 9,
    fontFamily: "Helvetica",
  }
});

const InfoText = ({ title, value }: { title: string; value: string }) => {
  const displayValue = (!value || value === "N/A" || value === "null") ? "N/A" : value;
  return (
    <View style={tw("flex flex-row mb-1")}>
      <Text
        style={{
          ...styles.userInfo,
          fontWeight: "bold",
        }}
      >
        {title + ": "}
      </Text>
      <Text style={styles.userInfo}>{displayValue}</Text>
    </View>
  );
};

export const ResultDocument = ({ data = [], studentInfo, bioData }: { data: any[], studentInfo?: { name: string, matricNo: string }, bioData?: any }) => {
  const [totalUnits, totalUnitPassed, totalGradePoint, cgpa] = calculateCGPA(data);

  return (
    <Document>
      <Page size="A4" style={pageWrapperStyles.page}>
        {/* Header Section */}
        <View style={tw("mb-10")} fixed>
          <View style={tw("flex flex-row items-center justify-center mb-6")}>
             <Image style={tw("h-16 w-16 mr-6")} src="/logo.png" />
             <View>
                <Text style={styles.headerText}>PointScale</Text>
                <Text style={styles.subHeaderText}>
                    STATEMENT OF RESULTS
                </Text>
             </View>
          </View>

          {/* Student Info Layout */}
          <View style={tw("flex flex-row gap-4 border-t border-b border-gray-200 py-4")}>
            <View style={tw("flex-1")}>
              <InfoText title="Faculty" value={bioData?.faculty || "N/A"} />
              <InfoText title="Course of Study" value={bioData?.dept || "N/A"} />
              <InfoText title="Class of Degree" value="" />
              <InfoText title="Mode of Entry" value={bioData?.mode || "UTME"} />
              <InfoText title="Year of Admission" value={bioData?.session_admitted || "2019/2020"} />
              <InfoText title="Year of Graduation" value="" />
            </View>
            <View style={tw("flex-1")}>
              <InfoText
                title="Matriculation Number"
                value={studentInfo?.matricNo || bioData?.matricNo || "N/A"}
              />
              <InfoText
                title="Full Name"
                value={
                    bioData?.surname ? `${bioData.surname} ${bioData.firstname || ""} ${bioData.middlename || ""}`.trim() : (bioData?.full_name || studentInfo?.name || "Student")
                }
              />
              <InfoText title="Date of Birth" value={bioData?.dob || "2000-01-01"} />
              <InfoText title="Sex" value={bioData?.gender_id || bioData?.sex || bioData?.gender || "N/A"} />
              <InfoText title="Nationality" value={bioData?.nationality || "Nigerian"} />
            </View>
          </View>
        </View>

        {/* Results Table */}
        <View>
          <Table style={tw("mb-4")}>
            <TH style={tw("bg-[#5271FF]")}>
              {["Course", "Course Description", "Unit", "Marks%", "WGP", "Remarks"].map((title, i) => (
                <TD key={title} weighting={weightings[i]} style={tw("py-2 justify-center")}>
                  <Text style={{ ...resultStyles.tableHeaderText, ...tw("text-white") }}>{title}</Text>
                </TD>
              ))}
            </TH>
            {data.map((course, i) => (
              <TR key={i} style={{ backgroundColor: i % 2 !== 0 ? "#eeeeee" : undefined }}>
                {getResultTableData(course).map((val, j) => (
                  <TD key={j} weighting={weightings[j]} style={{ justifyContent: j === 1 ? "flex-start" : "center", paddingVertical: 3 }}>
                    <Text style={{ ...resultStyles.tableDataText, paddingLeft: j === 1 ? 4 : 0 }}>{val ?? ""}</Text>
                  </TD>
                ))}
              </TR>
            ))}
          </Table>

          {/* Summary Section */}
          <View wrap={false}>
            <Text style={resultStyles.reportText}>Cumulative Units Registered: {totalUnits}</Text>
            <Text style={resultStyles.reportText}>Cumulative Units Passed: {totalUnitPassed}</Text>
            <Text style={resultStyles.reportText}>Total Weighted Grade Points: {totalGradePoint}</Text>
            <Text style={resultStyles.reportText}>CGPA: {cgpa}</Text>
          </View>
        </View>

        {/* Footer / Page Number */}
        <Text
          style={pageWrapperStyles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};
