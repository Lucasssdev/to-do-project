import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: themas.colors.grayBackground,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: themas.colors.black,
    textAlign: "center",
  },
  timeFilterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  timeFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: themas.colors.white,
    elevation: 1,
  },
  activeTimeFilter: {
    backgroundColor: themas.colors.blue,
  },
  timeFilterText: {
    fontWeight: "500",
    color: themas.colors.black,
  },
  statsCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsCard: {
    width: "48%",
    backgroundColor: themas.colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: themas.colors.blue,
    marginBottom: 5,
  },
  statsLabel: {
    fontSize: 14,
    color: themas.colors.lightGray,
  },
  chartContainer: {
    backgroundColor: themas.colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: themas.colors.black,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: themas.colors.white,
    borderRadius: 10,
    padding: 30,
    marginTop: 20,
    alignItems: "center",
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    color: themas.colors.lightGray,
    textAlign: "center",
  },
  footer: {
    height: 50,
  },
});
