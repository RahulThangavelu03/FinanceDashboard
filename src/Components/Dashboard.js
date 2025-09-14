
import React from "react";
import Summary from "./Summary";
import Transaction from "./Transaction";
import Savings from "./Savings";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import AddTransactionComponent from "./AddTransaction";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box, Link, Paper } from "@mui/material";

function Dashboard() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };



  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        mx: "auto",             
    px: { xs: 2, sm: 3, md: 4 }, 
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: { xs: 1, sm: 0 },    
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{color:"#2b6cb0"}}>
          Personal Finance Dashboard
        </Typography>

        <Link
          component="button"
          onClick={handleSignOut}
          underline="hover"
          sx={{
            cursor: "pointer",
            color: "#e53e3e",
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Sign out
        </Link>
      </Box>

      <hr style={{ height: "2px", background: "red", border: "none" }} />

      {/* Dashboard Content */}
      <Box sx={{ width: "100%", maxWidth: "1200px", mt: 3 }}>
        {/* Summary Section */}
        <Grid item xs={12}>
          <Summary />
        </Grid><br/>

        {/* Charts Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 3,
            my: 3,
          }}
        >
          <Box
            sx={{
              flex: "1 1 45%",
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
              minWidth: 300,
            }}
          >
            <ExpenseChart />
          </Box>

          <Box
            sx={{
              flex: "1 1 45%",
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
              minWidth: 300,
            }}
          >
            <IncomeChart />
          </Box>
        </Box>

        {/* Other Sections */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <AddTransactionComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <Transaction />
          </Grid>
          <Grid item xs={12} md={6}>
            <Savings />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}











export default Dashboard