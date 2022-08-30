import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useBudgetContext } from "../../context/BudgedContext/BudgetContext";

interface Props {
  setCurrentPage: () => void;
}

const IncomePage = ({ setCurrentPage }: Props) => {
  const [amountErrorMsg, setAmountErrorMsg] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const { setTheTotalBudget } = useBudgetContext();

  const submitHandler = () => {
    if (+amountValue > 0) {
      setTheTotalBudget(+amountValue);
      setCurrentPage();
      setAmountErrorMsg("");
    } else {
      setAmountErrorMsg("Amount must be greater than zero");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Typography
          variant="subtitle2"
          style={{ margin: "10px 0 70px" }}
          component="p"
          align="center"
        >
          How much money do you have at the moment?
        </Typography>
        <TextField
          style={{ marginBottom: "100px" }}
          inputProps={{ style: { textAlign: "right" } }}
          type="number"
          id="filled-error-helper-text"
          label="Amount"
          error={amountErrorMsg ? true : false}
          helperText={amountErrorMsg}
          variant="filled"
          fullWidth
          value={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
        />
      </div>
      <Button
        fullWidth
        color="primary"
        type="submit"
        variant="contained"
        onClick={submitHandler}
        style={{ marginTop: "auto" }}
        disabled={+amountValue > 0 ? false : true}
      >
        ADD
      </Button>
    </>
  );
};

export default IncomePage;
