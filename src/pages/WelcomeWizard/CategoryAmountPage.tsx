import {
  Button,
  Divider,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Icon from "@mui/material/Icon";

import { useBudgetContext } from "../../context/BudgedContext/BudgetContext";
import { useUser } from "../../context/UserContext/UserContext";

const CategoryAmountPage = () => {
  const { totalBudget, selectedCategories, setSelectedCategoriesHandler } =
    useBudgetContext();
  const { setUserHandler } = useUser();

  const completeHandler = () => {
    localStorage.setItem("totalBudget", totalBudget + "");
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    localStorage.setItem("isUserSingedIn", "true");
    setUserHandler(true);
  };

  const updateSelectedCategoriesAmount = (
    e: React.FormEvent,
    id: number | string
  ) => {
    const value = (e.target as HTMLInputElement).value;
    const updatedAmount = selectedCategories.map((sCat) => {
      if (sCat.id === id) {
        const budget = +value > 0 ? value : "";
        return { ...sCat, budget: budget };
      } else {
        return sCat;
      }
    });

    setSelectedCategoriesHandler(updatedAmount);
  };

  return (
    <>
      <div style={{ width: "100%", marginBottom: "50px" }}>
        <Typography
          variant="subtitle2"
          style={{ margin: "10px 0 70px" }}
          component="p"
          align="center"
        >
          Set how much money you spend or earn on each category monthly
        </Typography>
        <List dense>
          {selectedCategories.map((category) => (
            <div key={category.id}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <Icon style={{ color: "black", marginRight: "47px" }}>
                    {category.iconName}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={category.name} />
                <InputAdornment
                  onChange={(e) =>
                    updateSelectedCategoriesAmount(e, category.id)
                  }
                  position="end"
                  children={
                    <InputBase
                      type="number"
                      color="primary"
                      style={{
                        width: "110px",
                        backgroundColor: "#f5f5f5",
                        marginLeft: "auto",
                        padding: "0 8px",
                      }}
                    />
                  }
                />
              </ListItem>
              <Divider variant="inset" />
            </div>
          ))}
        </List>
      </div>
      <Button
        fullWidth
        color="primary"
        style={{ marginTop: "auto" }}
        variant="contained"
        onClick={completeHandler}
      >
        COMPLETE
      </Button>
    </>
  );
};

export default CategoryAmountPage;
