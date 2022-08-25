import { Entry } from "../context/BudgedContext/BudgetContextProvider";

export const percentageCalculator = (valOne: number, valTwo: number) => {
  if (valTwo < valOne) return 100;
  if (valTwo === 0) return 0;
  return Math.round((valOne / valTwo) * 100);
};

export const entryAmountCalculator = (entries: Entry[], id: number | string) =>
  entries
    .filter((e) => e.selectedCategoryId === id)
    .reduce((a, b) => a + +b.amount, 0);
