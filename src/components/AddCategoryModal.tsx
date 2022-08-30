import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Icon,
  InputAdornment,
  Checkbox,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import Categories from "../assets/categories";

const useStyles = makeStyles({
  modal: {
    zIndex: "1150 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    marginBottom: "75px !important",
    backgroundColor: "#fff",
    maxWidth: "500px !important",
    width: "90%",
    padding: "10px 20px",
    boxShadow:
      "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
    borderRadius: "4px",
    maxHeight: "calc(100% - 90px)",
    overflow: "auto",
  },
  formControl: {
    margin: "15px 0 !important",
  },
  buttonGroup: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const AddCategoryModal = () => {
  const classes = useStyles();
  const {
    selectedCategories,
    categoryToUpdate,
    categoryModalOpen,
    emptyCategoryToUpdate,
    categoryModalOpenHandler,
    addNewCategory,
    updateCategory,
  } = useBudgetContext();

  const [categoryType, setCategoryType] = useState(
    categoryToUpdate?.type || "Income"
  );
  const [categoryIcon, setCategoryIcon] = useState(
    categoryToUpdate?.iconName || "euro"
  );
  const [categoryName, setCategoryName] = useState(
    categoryToUpdate?.name || ""
  );
  const [categoryBudget, setCategoryBudget] = useState(
    categoryToUpdate?.budget || ""
  );
  const [categoryEnabled, setCategoryEnabled] = useState<boolean>(
    categoryToUpdate ? categoryToUpdate?.isEnabled : true
  );
  const [nameError, setNameError] = useState("");

  const [filteredIcons, setFilteredIcons] = useState<string[]>(
    Categories.map((cat) => cat.iconName)
  );

  useEffect(() => {
    const filtered = Categories.filter((cat) => cat.type === categoryType).map(
      (cat) => cat.iconName
    );
    setFilteredIcons(filtered);
    setCategoryIcon(
      categoryToUpdate?.iconName && categoryToUpdate.type === categoryType
        ? categoryToUpdate?.iconName
        : filtered[0]
    );
  }, [categoryType, categoryToUpdate]);

  const closeModal = () => {
    emptyCategoryToUpdate();
    categoryModalOpenHandler(false);
  };

  const checkNameError = () => {
    if (categoryName === "") {
      setNameError("Name cannot be empty");
      return false;
    }
    if (
      selectedCategories.some(
        (sCat) =>
          sCat.name.toLowerCase() === categoryName.toLowerCase() &&
          !categoryToUpdate
      )
    ) {
      setNameError("Category with this name already exists");
      return false;
    }
    setNameError("");
    return true;
  };

  const addOrUpdateCategory = () => {
    if (!checkNameError()) return;
    const categoryObj = {
      id: categoryToUpdate?.id || uuidv4(),
      name: categoryName,
      type: categoryType,
      budget: categoryBudget,
      iconName: categoryIcon,
      isEnabled: categoryEnabled,
    };

    if (categoryToUpdate) {
      updateCategory(categoryObj);
    } else {
      addNewCategory(categoryObj);
    }
    closeModal();
  };

  return (
    <Modal
      BackdropProps={{ style: { background: "rgba(255, 255, 255, 0.6)" } }}
      open={categoryToUpdate || categoryModalOpen ? true : false}
      className={classes.modal}
      onClose={closeModal}
    >
      <form className={classes.modalContainer}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          {categoryToUpdate ? "Update Category" : "Add New Category"}
        </Typography>
        <FormControl fullWidth className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryType}
            variant="outlined"
            onChange={(e) => setCategoryType(e.target.value)}
            size="small"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            label="Name"
            onBlur={() => {}}
            variant="outlined"
            value={categoryName}
            size="small"
            error={nameError ? true : false}
            helperText={nameError}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            label="Budget"
            variant="outlined"
            type="number"
            value={categoryBudget}
            size="small"
            onChange={(e) => setCategoryBudget(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="outlined"
            value={categoryIcon}
            size="small"
            onChange={(e) => setCategoryIcon(e.target.value)}
          >
            {filteredIcons.map((icon) => {
              return (
                <MenuItem key={icon} value={icon}>
                  <Icon>{icon}</Icon>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            className={classes.formControl}
            label="Enabled"
            disabled
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Checkbox
                    color="primary"
                    checked={categoryEnabled}
                    name="categoryEnabled"
                    size="small"
                    onChange={(e) => setCategoryEnabled(!categoryEnabled)}
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <div className={classes.buttonGroup}>
          <Button color="primary" onClick={closeModal}>
            CANCEL
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={addOrUpdateCategory}
          >
            {categoryToUpdate ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
