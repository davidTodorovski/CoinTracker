import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { v4 as uuidv4 } from "uuid";

import { useBudgetContext } from "../context/BudgedContext/BudgetContext";

const useStyles = makeStyles({
  modal: {
    zIndex: "1300 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    maxWidth: "500px !important",
    width: "90%",
    maxHeight: "calc(100% - 50px)",
    overflow: "auto",
    padding: "10px 20px",
    boxShadow:
      "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
    borderRadius: "4px",
  },
  inputSpacing: {
    margin: "15px 0 !important",
  },
  buttonGroup: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
  },
});

const AddEntryModal = () => {
  const classes = useStyles();
  const {
    selectedCategories,
    entryToUpdate,
    entryButtonClicked,
    emptyEntryToUpdate,
    setEntryButtonClickedHandler,
    addNewEntry,
    updateEntry,
  } = useBudgetContext();

  const [categoryType, setCategoryType] = useState(
    entryToUpdate ? entryToUpdate.type : entryButtonClicked
  );
  const catToList = selectedCategories
    .filter((sCat) => sCat.type === categoryType && sCat.isEnabled)
    .map((sCat) => sCat.name);
  const [categoriesToList, setCategoriesToList] = useState(catToList);
  const catName = selectedCategories.find(
    (sCat) => sCat.id === entryToUpdate?.selectedCategoryId
  )?.name;
  const [categoryName, setCategoryName] = useState<string | null>(
    entryToUpdate && catName ? catName : null
  );
  const [categoryAmount, setCategoryAmount] = useState(
    entryToUpdate ? entryToUpdate.amount : ""
  );
  const [categoryDate, setCategoryDate] = useState<Date | null>(
    entryToUpdate?.date ? new Date(entryToUpdate?.date) : new Date()
  );
  const [categoryDescription, setCategoryDescription] = useState(
    entryToUpdate ? entryToUpdate.description : ""
  );
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [categoryAmountError, setCategoryAmountError] = useState(false);

  const validateInputs = () => {
    if (!categoryName) {
      setCategoryNameError(true);
    }
    if (categoryAmount === "" || +categoryAmount < 1) {
      setCategoryAmountError(true);
    }

    if (!categoryName || categoryAmount === "" || +categoryAmount < 1) {
      return false;
    }

    setCategoryNameError(false);
    setCategoryAmountError(false);

    return true;
  };
  const addOrUpdateHandler = () => {
    if (!validateInputs()) return;
    const obj = {
      amount: categoryAmount,
      date: categoryDate || new Date(),
      id: entryToUpdate ? entryToUpdate.id : uuidv4(),
      description: categoryDescription,
      type: categoryType,
      selectedCategoryId:
        selectedCategories.find((sCat) => sCat.name === categoryName)?.id || "",
    };
    if (entryToUpdate) {
      updateEntry(obj);
    } else {
      addNewEntry(obj);
    }
    closeModal();
  };

  useEffect(() => {
    setCategoriesToList(catToList);
    setCategoryName(
      entryToUpdate && categoryType === entryToUpdate.type && catName
        ? catName
        : null
    );
  }, [categoryType, selectedCategories]);

  const closeModal = () => {
    emptyEntryToUpdate();
    setEntryButtonClickedHandler("");
  };

  return (
    <Modal
      BackdropProps={{ style: { background: "rgba(255, 255, 255, 0.6)" } }}
      open={entryButtonClicked || entryToUpdate ? true : false}
      className={classes.modal}
      onClose={closeModal}
    >
      <form className={classes.modalContainer}>
        <Typography variant="h6" style={{ marginBottom: "15px" }}>
          {entryToUpdate ? "Update Entry" : "Add New Entry"}
        </Typography>

        <Select
          fullWidth
          className={classes.inputSpacing}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryType}
          variant="outlined"
          size="small"
          onChange={(e) => setCategoryType(e.target.value)}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>

        <Autocomplete
          fullWidth
          className={classes.inputSpacing}
          disablePortal
          id="combo-box-demo"
          size="small"
          options={categoriesToList}
          getOptionLabel={(option) => option}
          value={categoryName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              error={categoryNameError}
              helperText={
                categoryNameError ? "Please select a category name" : ""
              }
            />
          )}
          onChange={(event: any, newValue: null | string) =>
            setCategoryName(newValue)
          }
        />

        <TextField
          error={categoryAmountError}
          helperText={categoryAmountError ? "Please enter a valid amount" : ""}
          fullWidth
          className={classes.inputSpacing}
          label="Amount"
          variant="outlined"
          type="number"
          value={categoryAmount}
          size="small"
          onChange={(e) => setCategoryAmount(e.target.value)}
        />
        <FormControl fullWidth className={classes.inputSpacing}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={categoryDate}
            onChange={(date) => setCategoryDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
        <TextField
          fullWidth
          className={classes.inputSpacing}
          label="Description (optional)"
          variant="outlined"
          value={categoryDescription}
          size="small"
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <div className={classes.buttonGroup}>
          <Button color="primary" onClick={closeModal}>
            CANCEL
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={addOrUpdateHandler}
          >
            {entryToUpdate ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEntryModal;
