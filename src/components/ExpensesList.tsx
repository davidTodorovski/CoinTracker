import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { makeStyles } from "@mui/styles";
import {
  Alert,
  Divider,
  Icon,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Category } from "../context/BudgedContext/BudgetContextProvider";
import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import { entryAmountCalculator, percentageCalculator } from "../assets/helpers";

const useStyles = makeStyles({
  root: {
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#C3F6F1",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#03DAC5",
    },
    "& .MuiLinearProgress-colorSecondary": {
      backgroundColor: "#ff5876",
    },
    "& .MuiLinearProgress-barColorSecondary": {
      backgroundColor: "#B00020",
    },
  },
  positive: {
    color: "#03DAC5 !important",
  },
  negative: {
    color: "#B00020 !important",
  },
  categoryContainer: {
    padding: "85px 15px 100px !important",
  },
  list: {
    padding: "0 !important",
  },

  listItem: {
    height: "40px !important",
    paddingRight: "0 !important",
    paddingLeft: "10px !important",
  },
  listIcon: {
    fontSize: "26px !important",
  },
  progressBar: {
    marginLeft: "72px !important",
  },
  listItemContainer: {
    padding: "8px 15px 10px 5px",
  },
});

const ExpensesList = () => {
  const { selectedCategories, entries } = useBudgetContext();
  const classes = useStyles();
  const [expenses, setExpenses] = useState<Category[]>([]);

  useEffect(() => {
    const filtered = selectedCategories.filter(
      (sCat) => sCat.type === "Expense" && sCat.isEnabled
    );
    setExpenses(filtered);
  }, [selectedCategories]);

  return (
    <CardComponent title="Expenses">
      <List className={classes.list}>
        {expenses.length ? (
          expenses.map((expenseCat) => (
            <div key={expenseCat.id} className={classes.listItemContainer}>
              <ListItem className={classes.listItem}>
                <ListItemIcon style={{ marginRight: "6px" }}>
                  <Icon
                    className={`${classes.listIcon} ${
                      entryAmountCalculator(entries, expenseCat.id) >
                        expenseCat.budget && expenseCat.budget
                        ? `${classes.negative}`
                        : ""
                    }`}
                    style={{ color: "#000" }}
                  >
                    {expenseCat?.iconName}
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      className={`${
                        entryAmountCalculator(entries, expenseCat.id) >
                          expenseCat.budget && expenseCat.budget
                          ? `${classes.negative}`
                          : ""
                      }`}
                    >
                      {expenseCat.name}
                    </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      className={`${
                        entryAmountCalculator(entries, expenseCat.id) >
                          expenseCat.budget && expenseCat.budget
                          ? `${classes.negative}`
                          : ""
                      }`}
                    >
                      {expenseCat.budget
                        ? `${entryAmountCalculator(entries, expenseCat.id)}/${
                            expenseCat.budget
                          }`
                        : `${entryAmountCalculator(entries, expenseCat.id)}`}
                    </Typography>
                  }
                  style={{ textAlign: "right" }}
                />
              </ListItem>
              {expenseCat.budget ? (
                <div className={classes.root}>
                  <LinearProgress
                    variant="determinate"
                    color={
                      entryAmountCalculator(entries, expenseCat.id) >
                      expenseCat.budget
                        ? "secondary"
                        : "primary"
                    }
                    value={percentageCalculator(
                      entryAmountCalculator(entries, expenseCat.id),
                      +expenseCat.budget
                    )}
                    className={classes.progressBar}
                  />
                </div>
              ) : (
                <Divider variant="inset" />
              )}
            </div>
          ))
        ) : (
          <Alert severity="warning">No expense categories</Alert>
        )}
      </List>
    </CardComponent>
  );
};

export default ExpensesList;
