import {
  Alert,
  Box,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useBudgetContext } from "../context/BudgedContext/BudgetContext";
import CardComponent from "./CardComponent";
import { makeStyles } from "@mui/styles";
import { format } from "date-fns";
import { Entry } from "../context/BudgedContext/BudgetContextProvider";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  income: {
    color: "#03DAC5",
  },
  expense: {
    color: "#B00020",
  },
  categoryContainer: {
    padding: "85px 15px 100px !important",
  },
  list: {
    paddingBottom: "0 !important",
    paddingTop: "0 !important",
  },

  listItem: {
    height: "50px !important",
    paddingRight: "10px !important",
    paddingLeft: "10px !important",
  },
  listIcon: {
    fontSize: "26px !important",
  },
  modal: {
    zIndex: "900 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInner: {
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const EntriesList = () => {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = useState<{
    mouseX: any;
    mouseY: any;
  } | null>(null);
  const [contextEntry, setContextEntry] = useState<Entry>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const {
    entries,
    selectedCategories,
    entryToUpdateHandler,
    duplicateEntry,
    setEntryButtonClickedHandler,
    deleteEntry,
  } = useBudgetContext();

  const closeContext = () => {
    setContextMenu(null);
  };

  const contextMenuHandler = (e: React.MouseEvent, entry: Entry) => {
    e.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    );
    setContextEntry(entry);
  };

  const duplicateEntryHandler = () => {
    const entry = contextEntry
      ? {
          id: uuidv4(),
          type: contextEntry?.type,
          selectedCategoryId: contextEntry?.selectedCategoryId,
          amount: contextEntry?.amount,
          date: contextEntry?.date,
          description: contextEntry?.description,
        }
      : null;

    entry && duplicateEntry(entry);

    closeContext();
  };

  const closeConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };

  return (
    <CardComponent title="Entries">
      <List className={classes.list}>
        {entries.length &&
        selectedCategories.some(
          (sCat) =>
            sCat.isEnabled &&
            entries.some((entry) => entry.selectedCategoryId === sCat.id)
        ) ? (
          <>
            {entries.map((entry) => {
              if (
                selectedCategories.find(
                  (cat) =>
                    cat.isEnabled === true &&
                    cat.id === entry.selectedCategoryId
                )
              ) {
                const category = selectedCategories.find(
                  (sCat) => sCat.id === entry.selectedCategoryId
                );
                return (
                  <div
                    key={entry.id}
                    onContextMenu={(e) => {
                      contextMenuHandler(e, entry);
                    }}
                    onClick={() => entryToUpdateHandler(entry)}
                  >
                    <ListItem
                      button
                      disableGutters
                      className={classes.listItem}
                    >
                      <ListItemIcon style={{ marginRight: "6px" }}>
                        <Icon
                          className={classes.listIcon}
                          style={{ color: "#000" }}
                        >
                          {category?.iconName}
                        </Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            style={{ lineHeight: "1" }}
                          >
                            {category?.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            style={{ fontSize: "10px" }}
                          >
                            {format(new Date(entry.date), "dd.MM.yyyy")}
                          </Typography>
                        }
                      />
                      <ListItemText
                        primary={`${entry.type === "Income" ? "+" : "-"}${
                          entry.amount
                        }`}
                        style={{ textAlign: "right" }}
                        className={
                          entry.type === "Income"
                            ? classes.income
                            : classes.expense
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </>
        ) : (
          <Alert severity="warning">
            No entries that match income or expense categories
          </Alert>
        )}
        <>
          <Menu
            open={contextMenu !== null}
            elevation={2}
            onClose={closeContext}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem dense onClick={duplicateEntryHandler}>
              Duplicate
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                closeContext();
                setEntryButtonClickedHandler("Expense");
              }}
            >
              Create New
            </MenuItem>
            <MenuItem
              dense
              style={{ color: "#B00020" }}
              onClick={() => {
                setOpenConfirmationModal(true);
                closeContext();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <Modal
            open={openConfirmationModal}
            onClose={closeConfirmationModal}
            className={classes.modal}
          >
            <Box className={classes.modalInner}>
              <Typography variant="h6">
                Are you sure you want to delete this entry?
              </Typography>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={closeConfirmationModal}
                  style={{ color: "#000" }}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    contextEntry && deleteEntry(contextEntry?.id);
                    closeConfirmationModal();
                  }}
                  style={{ color: "#B00020", fontWeight: "bold" }}
                >
                  Yes
                </Button>
              </div>
            </Box>
          </Modal>
        </>
      </List>
    </CardComponent>
  );
};

export default EntriesList;
