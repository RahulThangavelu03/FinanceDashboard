import React from "react";
import Summary from "./Summary";
import Transaction from "./Transaction";
import Savings from "./Savings";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import AddTransactionComponent from "./AddTransaction";

import { Typography, Grid, Box } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ px: 2, py: 4, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Personal Finance Dashboard
      </Typography>

      
      <Box my={4}>
        <Summary />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <ExpenseChart />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <IncomeChart />
        </Grid>
      </Grid>

      
      <Box my={4}>
        <AddTransactionComponent />
      </Box>

     
      <Box my={4}>
        <Transaction />
      </Box>

      <Box my={4}>
        <Savings />
      </Box>
    </Box>
  );
}

export default Dashboard;
