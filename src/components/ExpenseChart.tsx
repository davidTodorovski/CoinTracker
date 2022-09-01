import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const ExpenseChart = () => {
  const { selectedCategories, entries } = useBudgetContext();

  const categoriesNames = selectedCategories
    .filter((sCat) => sCat.type === "Expense" && sCat.isEnabled)
    .map((sCat) => sCat.name);
  const categoriesAmount = selectedCategories
    .filter((sCat) => sCat.type === "Expense" && sCat.isEnabled)
    .map((sCat) =>
      entries.reduce(
        (a, entry) =>
          entry.selectedCategoryId === sCat.id ? a + +entry.amount : a,
        0
      )
    );

  const data = {
    labels: categoriesNames,
    datasets: [
      {
        label: "Amount",
        data: categoriesAmount,
        backgroundColor: "rgba(255, 88, 118, 0.2)",
        borderColor: "rgba(176, 0, 32, 0.4)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      style={{ padding: "10px" }}
      data={data}
      options={{
        indexAxis: "y",

        elements: {
          bar: {
            borderWidth: 0,
          },
        },
        responsive: true,
      }}
    />
  );
};

export default ExpenseChart;
