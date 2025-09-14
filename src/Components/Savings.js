import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSavingsGoal,
  UpdateSavingsProgress,
  RemoveOneGoal,
} from "../Features/FinanceSlice";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Savings() {
  const dispatch = useDispatch();
  const savingsGoals = useSelector((state) => state.Finance.SavingsGoals);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [progress, setProgress] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title || !target) return;
    dispatch(AddSavingsGoal({ title, target: parseFloat(target) }));
    setTitle("");
    setTarget("");
  };

  const handleUpdateProgress = (e) => {
    e.preventDefault();
    if (!progress || savingsGoals.length === 0) return;
    const lastGoal = savingsGoals[savingsGoals.length - 1];
    dispatch(
      UpdateSavingsProgress({ id: lastGoal.id, amount: parseFloat(progress) })
    );
    setProgress("");
  };

  return (
    <Box
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fff",
        maxWidth: 1200,
        width: "100%",
        mx: "auto",            
    px: { xs: 2, sm: 3, md: 4 }, 
      }}
    >
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Manage Savings Goals
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddGoal(e);
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Add Goal */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Goal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Target Amount"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleAddGoal}
              >
                Add Goal
              </Button>
            </Grid>

            {/* Update Progress */}
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Add to Savings"
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleUpdateProgress}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Progress Chart */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Savings Goal Progress
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={savingsGoals}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="target" fill="#8884d8" name="Target" barSize={20} />
            <Bar dataKey="current" fill="#82ca9d" name="Saved" barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Goals List */}
      <Box>
        {savingsGoals.map((goal) => (
          <Paper key={goal.id} sx={{ p: 2, mb: 2 }} elevation={1}>
            <Typography variant="subtitle1">
              <strong>{goal.title}</strong> — ₹{goal.current} / ₹{goal.target}
            </Typography>
            <Box display="flex" gap={1} mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => dispatch(RemoveOneGoal(goal.id))}
              >
                Remove
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Savings;
