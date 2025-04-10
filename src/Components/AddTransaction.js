import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { AddTransaction } from "../Features/FinanceSlice";

function AddTransactionComponent() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      type,
      category,
    };

    dispatch(AddTransaction(newTransaction));
    setTitle("");
    setAmount("");
    setType("income");
    setCategory("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 700,
        width: "100%",         
        mt: 4,
        borderRadius: 3,
        ml: 2,                
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem" }}>
        📌 Add Transaction
      </h2>

      <form onSubmit={handleAddTransaction}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2, fontWeight: 600, backgroundColor: "#1976d2" }}
            >
              ➕ Add Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AddTransactionComponent;
