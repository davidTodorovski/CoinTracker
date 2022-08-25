import { useState, useEffect } from "react";
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
import { makeStyles } from "@mui/styles";

import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import CardComponent from "./CardComponent";
import { Category } from "../context/BudgedContext/BudgetContextProvider";
import { entryAmountCalculator, percentageCalculator } from "../assets/helpers";

const useStyles = makeStyles({
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

const IncomeList = () => {
  const classes = useStyles();
  const { selectedCategories, entries } = useBudgetContext();
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);

  useEffect(() => {
    const filtered = selectedCategories.filter(
      (sCat) => sCat.type === "Income" && sCat.isEnabled
    );
    setIncomeCategories(filtered);
  }, [selectedCategories]);

  return (
    <CardComponent title="Income">
      <List className={classes.list}>
        {incomeCategories.length ? (
          incomeCategories.map((incomeCat) => (
            <div key={incomeCat.id} className={classes.listItemContainer}>
              <ListItem className={classes.listItem}>
                <ListItemIcon style={{ marginRight: "6px" }}>
                  <Icon className={classes.listIcon} style={{ color: "#000" }}>
                    {incomeCat?.iconName}
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">{incomeCat.name}</Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {incomeCat.budget
                        ? `${entryAmountCalculator(entries, incomeCat.id)}/${
                            incomeCat.budget
                          }`
                        : `${entryAmountCalculator(entries, incomeCat.id)}`}
                    </Typography>
                  }
                  style={{ textAlign: "right" }}
                />
              </ListItem>
              {incomeCat.budget ? (
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  value={percentageCalculator(
                    entryAmountCalculator(entries, incomeCat.id),
                    +incomeCat.budget
                  )}
                  className={classes.progressBar}
                />
              ) : (
                <Divider variant="inset" />
              )}
            </div>
          ))
        ) : (
          <Alert severity="warning">No income categories</Alert>
        )}
      </List>
    </CardComponent>
  );
};

export default IncomeList;
