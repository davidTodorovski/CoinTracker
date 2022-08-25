import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import EntriesList from "../../components/EntriesList";
import ExpensesList from "../../components/ExpensesList";
import IncomeList from "../../components/IncomeList";
import AnimatedPage from "../AnimatedPage";

const useStyles = makeStyles({
  overviewContainer: {
    padding: "85px 15px 100px !important",
    display: "flex !important",
    flexDirection: "column",
    rowGap: "35px",
  },
});

const Overview = () => {
  const classes = useStyles();

  return (
    <AnimatedPage>
      <Container maxWidth="md" className={classes.overviewContainer}>
        <IncomeList />
        <ExpensesList />
        <EntriesList />
      </Container>
    </AnimatedPage>
  );
};

export default Overview;
