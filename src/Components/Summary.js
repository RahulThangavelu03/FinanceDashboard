import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Box } from "@mui/material";

function Summary() {
  const { totalIncome, totalExpenses, balance } = useSelector(
    (state) => state.Finance
  );

  const summaryItems = [
    {
      title: "Income",
      value: totalIncome,
      color: "success.main",
      bg: "success.light",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      color: "error.main",
      bg: "error.light",
    },
    {
      title: "Balance",
      value: balance,
      color: "primary.main",
      bg: "primary.light",
    },
  ];

  return (
    <Box sx={{ px: 0,  width: '100%'  ,mx: "auto",             
    px: { xs: 2, sm: 3, md: 4 }, }}>
      <Grid container spacing={3}   justifyContent="space-around" 
  alignItems="stretch">
        {summaryItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: item.bg,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: item.color, mt: 1 }}
                fontWeight="bold"
              >
                ₹{item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Summary;
