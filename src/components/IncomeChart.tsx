import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const IncomeChart = () => {
  const { selectedCategories, entries } = useBudgetContext();

  const categoriesNames = selectedCategories
    .filter((sCat) => sCat.type === "Income" && sCat.isEnabled)
    .map((sCat) => sCat.name);
  const categoriesAmount = selectedCategories
    .filter((sCat) => sCat.type === "Income" && sCat.isEnabled)
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
        backgroundColor: "#C3F6F1",
        borderColor: "#03DAC5",
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

export default IncomeChart;
