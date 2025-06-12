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
  activeFilterText: {
    color: themas.colors.white,
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
    marginBottom: 15,
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
  // Novos estilos para visualizações simples
  progressContainer: {
    marginVertical: 15,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: themas.colors.green,
  },
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  progressLabel: {
    fontSize: 12,
    color: themas.colors.midGray,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: themas.colors.black,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  activityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  activityItem: {
    alignItems: "center",
    marginBottom: 10,
    width: "14.2%", // Valor padrão fixo
  },
  activityCell: {
    width: 30,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  activityValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  activityLabel: {
    fontSize: 10,
    marginTop: 4,
    color: themas.colors.midGray,
  },
});
