import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

import LogoWithText from "../../components/LogoWithText";
import CategoryAmountPage from "./CategoryAmountPage";
import CategorySelect from "./CategorySelect";
import IncomePage from "./IncomePage";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "600px",
    width: "85%",
    minHeight: "100vh",
    margin: "0 auto",
    paddingBottom: "50px",
  },
}));

const WelcomeWizard = () => {
  const classes = useStyles();
  const [curPage, setCurPage] = useState(1);

  const setCurrentPage = () => {
    setCurPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={classes.container}>
      <LogoWithText />
      <Typography
        style={{ letterSpacing: "10px", marginTop: "80px" }}
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
      >
        WELCOME
      </Typography>
      {curPage === 1 && <IncomePage setCurrentPage={setCurrentPage} />}
      {curPage === 2 && <CategorySelect setCurrentPage={setCurrentPage} />}
      {curPage === 3 && <CategoryAmountPage />}
    </div>
  );
};

export default WelcomeWizard;
