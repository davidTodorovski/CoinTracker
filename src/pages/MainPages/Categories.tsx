import CardComponent from "../../components/CardComponent";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useBudgetContext } from "../../context/BudgedContext/BudgetContext";

import AddCategoryModal from "../../components/AddCategoryModal";
import AnimatedPage from "../AnimatedPage";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "85px 15px 100px !important",
  },
  income: {
    color: "#03DAC5",
  },
  expense: {
    color: "#B00020",
  },
  disabled: {
    color: "#adadad",
  },
  list: {
    paddingBottom: "0 !important",
  },
  categoryTypeText: {
    fontSize: "8px !important",
    color: "grey",
    fontWeight: "600",
    lineHeight: "0 !important",
  },

  listItem: {
    height: "50px important!",
    paddingRight: "10px !important",
    paddingLeft: "10px !important",
  },
  listIcon: {
    fontSize: "30px !important",
  },
});

const Categories = () => {
  const classes = useStyles();
  const { selectedCategories } = useBudgetContext();
  const {
    categoryToUpdate,
    categoryModalOpen,
    categoryToUpdateHandler,
    categoryModalOpenHandler,
  } = useBudgetContext();

  return (
    <AnimatedPage>
      <Container maxWidth="md" className={classes.categoryContainer}>
        <CardComponent title={"Categories"}>
          <List className={classes.list}>
            <ListItem
              className={classes.listItem}
              button
              disableGutters
              onClick={() => categoryModalOpenHandler(true)}
            >
              <ListItemIcon style={{ marginRight: "6px" }}>
                <Icon className={classes.listIcon} style={{ color: "#000" }}>
                  {"add"}
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Add New Category" />
            </ListItem>
            <Divider variant="inset" />
            {selectedCategories.map((category) => (
              <div
                key={`${category.id}-${category.name}`}
                onClick={() => categoryToUpdateHandler(category)}
              >
                <ListItem className={classes.listItem} button disableGutters>
                  <ListItemIcon style={{ marginRight: "6px" }}>
                    <Icon
                      className={`
                         ${
                           !category.isEnabled
                             ? classes.disabled
                             : category.type === "Expense"
                             ? classes.expense
                             : category.type === "Income"
                             ? classes.income
                             : ""
                         } 
                         `}
                    >
                      {category.iconName}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    className={`
                ${
                  !category.isEnabled
                    ? classes.disabled
                    : category.type === "Expense"
                    ? classes.expense
                    : category.type === "Income"
                    ? classes.income
                    : ""
                } 
                `}
                    primary={category.name}
                  />
                  <ListItemText
                    primary={
                      category.budget > 0 ? (
                        <Typography
                          variant="body2"
                          style={{
                            lineHeight: "1",
                            fontSize: "16px",
                            marginBottom: "8px",
                          }}
                          className={`
                          ${
                            !category.isEnabled
                              ? classes.disabled
                              : category.type === "Expense"
                              ? classes.expense
                              : category.type === "Income"
                              ? classes.income
                              : ""
                          } 
                          `}
                        >
                          {category.budget}
                        </Typography>
                      ) : (
                        <Typography
                          variant="caption"
                          className={classes.categoryTypeText}
                        >
                          NO BUDGET LIMIT
                        </Typography>
                      )
                    }
                    secondary={
                      category.budget > 0 && (
                        <Typography
                          className={classes.categoryTypeText}
                          variant="caption"
                        >
                          {category.type === "Income" ? "PLANNED" : "BUDGET"}
                        </Typography>
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  />
                </ListItem>
                <Divider variant="inset" />
              </div>
            ))}
          </List>
        </CardComponent>
        {categoryToUpdate || categoryModalOpen ? <AddCategoryModal /> : null}
      </Container>
    </AnimatedPage>
  );
};

export default Categories;
