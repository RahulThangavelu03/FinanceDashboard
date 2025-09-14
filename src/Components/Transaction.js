import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteTransaction } from '../Features/FinanceSlice';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Transaction() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.Finance.transactions);
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredTransactions =
    filterCategory === "All"
      ? transactions
      : transactions.filter((txn) => txn.category === filterCategory);

  return (
    <Box
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fff",
        maxWidth: 800,
        width: "100%",
        marginRight:"5px",
        ml: 1,
        mx: "auto",         
    px: { xs: 2, sm: 3, md: 4 }, 
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        🧾 Transaction History
      </Typography>

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="filter-label">Filter by Category</InputLabel>
        <Select
          labelId="filter-label"
          value={filterCategory}
          label="Filter by Category"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Other">General</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <TableRow key={txn.id} hover>
                  <TableCell>{txn.title}</TableCell>
                  <TableCell>
                     {txn.type === "income" ? "+" : "-"} ₹{txn.amount.toLocaleString()} 
                
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>{txn.type}</TableCell>
                  <TableCell>{txn.category}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => dispatch(DeleteTransaction(txn.id))}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 1.5, color: "gray", fontWeight: 300 }}>
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Transaction;
