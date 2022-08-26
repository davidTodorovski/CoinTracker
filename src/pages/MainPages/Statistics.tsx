import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";

import CardComponent from "../../components/CardComponent";
import ExpenseChart from "../../components/ExpenseChart";
import IncomeAndExpensesChart from "../../components/IncomeAndExpensesChart";
import IncomeChart from "../../components/IncomeChart";
import AnimatedPage from "../AnimatedPage";

const useStyles = makeStyles({
  statisticsContainer: {
    padding: "85px 15px 100px !important",
    display: "flex !important",
    flexDirection: "column",
    rowGap: "35px",
  },
});

const Statistics = () => {
  const classes = useStyles();

  return (
    <AnimatedPage>
      <Container maxWidth="md" className={classes.statisticsContainer}>
        <CardComponent title="Income">
          <IncomeChart />
        </CardComponent>
        <CardComponent title="Expense">
          <ExpenseChart />
        </CardComponent>
        <CardComponent title="Expenses & Income">
          <IncomeAndExpensesChart />
        </CardComponent>
      </Container>
    </AnimatedPage>
  );
};

export default Statistics;
