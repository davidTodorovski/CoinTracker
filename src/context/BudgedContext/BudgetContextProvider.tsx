import { useState, useEffect } from "react";
import { BudgetContext } from "./BudgetContext";
import { useLocation } from "react-router-dom";

export type BudgetContextType = {
  totalBudget: number;
  categoryToUpdate: Category | undefined;
  selectedCategories: Category[];
  categoryModalOpen: boolean;
  entries: Entry[];
  entryToUpdate: Entry | undefined;
  entryButtonClicked: string;
  open: boolean;
  setOpenHandler: (value: boolean) => void;
  setTheTotalBudget: (amount: number) => void;
  setSelectedCategoriesHandler: (selectedCat: Category[]) => void;
  categoryToUpdateHandler: (category: Category) => void;
  emptyCategoryToUpdate: () => void;
  categoryModalOpenHandler: (value: boolean) => void;
  addNewCategory: (category: Category) => void;
  updateCategory: (categoryToUpdate: Category) => void;
  entryToUpdateHandler: (entry: Entry) => void;
  setEntryButtonClickedHandler: (value: string) => void;
  emptyEntryToUpdate: () => void;
  addNewEntry: (entry: Entry) => void;
  updateEntry: (entryToUpdate: Entry) => void;
  duplicateEntry: (entry: Entry) => void;
  deleteEntry: (entryId: number | string) => void;
};

export interface Category {
  id: number | string;
  name: string;
  type: string;
  budget: string | number;
  iconName: string;
  isEnabled: boolean;
}

export interface Entry {
  amount: string;
  date: Date;
  id: number | string;
  description: string;
  type: string;
  selectedCategoryId: number | string;
}

interface Props {
  children: React.ReactNode;
}
const budgetTotalLS = localStorage.getItem("totalBudget");
const selectedCategoriesLS = JSON.parse(
  localStorage.getItem("selectedCategories") || "[]"
);
const entriesLS = JSON.parse(localStorage.getItem("entries") || "[]");

const BudgetContextProvider = ({ children }: Props) => {
  const location = useLocation();

  const [totalBudget, setTotalBudget] = useState(
    budgetTotalLS ? +budgetTotalLS : 0
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    selectedCategoriesLS || []
  );
  const [entries, setEntries] = useState<Entry[]>(entriesLS || []);
  const [open, setOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category>();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [entryToUpdate, setEntryToUpdate] = useState<Entry>();
  const [entryButtonClicked, setEntryButtonClicked] = useState("");

  useEffect(() => {
    setEntryToUpdate(undefined);
    setEntryButtonClicked("");
  }, [location]);

  const setOpenHandler = (value: boolean) => {
    setOpen(value);
  };

  const categoryToUpdateHandler = (category: Category) => {
    setCategoryToUpdate(category);
  };

  const emptyCategoryToUpdate = () => setCategoryToUpdate(undefined);

  const categoryModalOpenHandler = (value: boolean) => {
    setCategoryModalOpen(value);
  };

  const entryToUpdateHandler = (entry: Entry) => setEntryToUpdate(entry);

  const emptyEntryToUpdate = () => setEntryToUpdate(undefined);

  const setEntryButtonClickedHandler = (value: string) =>
    setEntryButtonClicked(value);

  const setTheTotalBudget = (amount: number) => {
    setTotalBudget(amount);
  };

  const setSelectedCategoriesHandler = (selectedCat: Category[]) => {
    setSelectedCategories(selectedCat);
  };

  const addNewCategory = (category: Category) => {
    const newCategories = [...selectedCategories, category];
    setSelectedCategories(newCategories);
    localStorage.setItem("selectedCategories", JSON.stringify(newCategories));
  };

  const updateCategory = (categoryToUpdate: Category) => {
    const updatedCategories = selectedCategories.map((category) => {
      if (category.id === categoryToUpdate.id) {
        return { ...category, ...categoryToUpdate };
      }
      return category;
    });

    setSelectedCategories(updatedCategories);
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(updatedCategories)
    );
  };

  const addNewEntry = (entry: Entry) => {
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    localStorage.setItem("entries", JSON.stringify(newEntries));
  };

  const updateEntry = (entryToUpdate: Entry) => {
    const updatedEntries = entries.map((category) => {
      if (category.id === entryToUpdate.id) {
        return { ...category, ...entryToUpdate };
      }
      return category;
    });

    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const duplicateEntry = (entry: Entry) => {
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    localStorage.setItem("entries", JSON.stringify(newEntries));
  };

  const deleteEntry = (entryId: number | string) => {
    const filteredEntries = entries.filter((entry) => entry.id !== entryId);
    setEntries(filteredEntries);
    localStorage.setItem("entries", JSON.stringify(filteredEntries));
  };

  const values = {
    totalBudget,
    selectedCategories,
    categoryToUpdate,
    categoryModalOpen,
    entries,
    entryToUpdate,
    entryButtonClicked,
    open,
    setOpenHandler,
    setTheTotalBudget,
    setSelectedCategoriesHandler,
    categoryToUpdateHandler,
    emptyCategoryToUpdate,
    categoryModalOpenHandler,
    addNewCategory,
    updateCategory,
    entryToUpdateHandler,
    setEntryButtonClickedHandler,
    emptyEntryToUpdate,
    addNewEntry,
    updateEntry,
    duplicateEntry,
    deleteEntry,
  };
  return (
    <BudgetContext.Provider value={values}>{children}</BudgetContext.Provider>
  );
};

export default BudgetContextProvider;
