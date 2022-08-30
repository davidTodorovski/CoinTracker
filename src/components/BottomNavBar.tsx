import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Grid,
  Modal,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useBudgetContext } from "../context/BudgedContext/BudgetContext";

const useStyles = makeStyles((theme?: any) => ({
  bottomNavbar: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    zIndex: "1200",
    height: "65px",
    alignItems: "center",
  },
  bottomNavigation: {
    backgroundColor: "#6200EE !important",
    justifyContent: "start !important",
  },
  icons: {
    color: "#fff",
  },
  togglerBtnContainer: {
    textAlign: "right",
    paddingRight: "20px",
  },
  togglerBtn: {
    transform: "translateY(-60%)",
  },
  modal: {
    zIndex: "100 !important",
    height: "calc(100vh - 130px)",
    top: "50% !important",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    rowGap: "25px",
    padding: "0 20px 40px 0 !important",
  },
}));

const BottomNavBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    emptyCategoryToUpdate,
    categoryModalOpenHandler,
    setEntryButtonClickedHandler,
  } = useBudgetContext();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const checkPathname = () => {
    return ["/", "/sign-up", "/welcome"].some((p) => p === pathname);
  };

  const buttonClicked = (e: React.MouseEvent) => {
    const type =
      (e.target as HTMLButtonElement).getAttribute("data-type") || "Income";
    setEntryButtonClickedHandler(type);
    setOpen(false);
  };

  if (checkPathname()) {
    return null;
  }

  return (
    <Grid container className={classes.bottomNavbar}>
      <Grid item xs={9}>
        <BottomNavigation
          className={classes.bottomNavigation}
          value={pathname}
          showLabels
          onChange={(_, value) => {
            navigate(value);
          }}
          sx={{
            "& .Mui-selected, .Mui-selected > svg": {
              color: "#03DAC5",
            },
          }}
        >
          <BottomNavigationAction
            sx={{
              color: "#fff",
            }}
            label="Overview"
            value="/overview"
            icon={<HomeIcon />}
            data-path="/overview"
          />
          <BottomNavigationAction
            sx={{
              color: "#fff",
            }}
            label="Categories"
            value="/categories"
            icon={<CategoryIcon />}
            data-path="/category"
          />
          <BottomNavigationAction
            sx={{
              color: "#fff",
            }}
            label="Statistics"
            value="/statistics"
            data-path="/statistics"
            icon={<LeaderboardIcon />}
          />
        </BottomNavigation>
      </Grid>
      <Grid item xs={3} className={classes.togglerBtnContainer}>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.togglerBtn}
          onClick={() => {
            setOpen(!open);
            emptyCategoryToUpdate();
            categoryModalOpenHandler(false);
          }}
        >
          <AddIcon />
        </Fab>
      </Grid>
      <Modal
        open={open}
        className={classes.modal}
        onClose={() => setOpen(false)}
      >
        <>
          <Button
            size="small"
            color="primary"
            variant="contained"
            data-type="Expense"
            onClick={buttonClicked}
          >
            ADD EXPENSE
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            data-type="Income"
            onClick={buttonClicked}
          >
            ADD INCOME
          </Button>
        </>
      </Modal>
    </Grid>
  );
};

export default BottomNavBar;
