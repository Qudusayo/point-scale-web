import { StyleSheet } from "@react-pdf/renderer";

export const pageWrapperStyles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  headerText: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 800,
    color: "#5271FF",
    textTransform: "uppercase",
  },
  headerSubText: {
    fontSize: 14,
    marginTop: -16,
    textAlign: "center",
    fontWeight: 800,
    color: "#000",
    textTransform: "uppercase",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 11,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export const resultStyles = StyleSheet.create({
  reportText: {
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: 800,
  },
  tableHeaderText: {
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: 800,
    textAlign: "center",
  },
  tableDataText: {
    fontSize: 10,
  },
});
