import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { useBudgetContext } from "../context/BudgedContext/BudgetContext";

const IncomeAndExpensesChart = () => {
  const { selectedCategories, entries } = useBudgetContext();

  const data = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Expense",
        data:
          entries &&
          entries
            .filter(
              (entry) =>
                entry.type === "Expense" &&
                selectedCategories.find(
                  (sCat) =>
                    sCat.id === entry.selectedCategoryId && sCat.isEnabled
                )
            )
            .map((entry) => entry.amount)
            .reverse(),
        lineTension: 0.5,
        fill: false,
        backgroundColor: "rgba(255, 88, 118, 0.2)",
        borderColor: "rgba(176, 0, 32, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Income",
        data:
          entries &&
          entries
            .filter(
              (entry) =>
                entry.type === "Income" &&
                selectedCategories.find(
                  (sCat) =>
                    sCat.id === entry.selectedCategoryId && sCat.isEnabled
                )
            )
            .map((entry) => entry.amount)
            .reverse(),
        lineTension: 0.5,
        fill: false,
        backgroundColor: "#C3F6F1",
        borderColor: "#03DAC5",
        borderWidth: 1,
      },
    ],
  };

  return <Line style={{ padding: "10px" }} data={data} />;
};

export default IncomeAndExpensesChart;
