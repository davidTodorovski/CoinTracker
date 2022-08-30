import {
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import Icon from "@mui/material/Icon";

import { useState } from "react";
import { Categories } from "../../assets/categories";
import { useBudgetContext } from "../../context/BudgedContext/BudgetContext";
import { Category } from "../../context/BudgedContext/BudgetContextProvider";

interface Props {
  setCurrentPage: () => void;
}

const CategorySelect = ({ setCurrentPage }: Props) => {
  const [selectedCategoriesState, setSelectedCategoriesState] = useState<
    Category[]
  >([]);
  const { setSelectedCategoriesHandler } = useBudgetContext();

  const addSelectedCategories = (e: React.ChangeEvent, category: Category) => {
    const checked = (e.target as HTMLInputElement).checked;

    if (!checked) {
      setSelectedCategoriesState(
        selectedCategoriesState.filter((sCat) => sCat.name !== category.name)
      );
    } else {
      setSelectedCategoriesState([...selectedCategoriesState, { ...category }]);
    }
  };

  const doneHandler = () => {
    setSelectedCategoriesHandler(selectedCategoriesState);
    setCurrentPage();
  };

  return (
    <>
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <Typography
          variant="subtitle2"
          style={{ margin: "10px 0 70px" }}
          component="p"
          align="center"
        >
          Choose what you spend money on
        </Typography>
        <List dense>
          {Categories.map((category) => (
            <div key={category.id}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <Icon style={{ color: "black", marginRight: "47px" }}>
                    {category.iconName}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={category.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={(e) => addSelectedCategories(e, category)}
                    edge="end"
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" />
            </div>
          ))}
        </List>
      </div>
      <Button
        disabled={selectedCategoriesState.length ? false : true}
        fullWidth
        color="primary"
        style={{ marginTop: "auto" }}
        variant="contained"
        onClick={doneHandler}
      >
        DONE
      </Button>
    </>
  );
};

export default CategorySelect;
