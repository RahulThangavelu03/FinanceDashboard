import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddSavingsGoal,
  UpdateSavingsProgress,
  EditSavingsGoal,
  RemoveOneGoal,
} from '../Features/FinanceSlice';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Savings() {
  const dispatch = useDispatch();
  const savingsGoals = useSelector((state) => state.Finance.SavingsGoals);

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedTarget, setEditedTarget] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title || !target) return;

    dispatch(AddSavingsGoal({ title, target: parseFloat(target) }));
    setTitle('');
    setTarget('');
  };

  const handleUpdateProgress = (id) => {
    const amount = prompt('Enter amount to add to savings:');
    if (amount) {
      dispatch(UpdateSavingsProgress({ id, amount: parseFloat(amount) }));
    }
  };

  const handleRemoveGoal = (goal) => {
    dispatch(RemoveOneGoal(goal.id));
  };

  const handleEdit = (goal) => {
    setEditingId(goal.id);
    setEditedTitle(goal.title);
    setEditedTarget(goal.target);
  };

  const handleSaveEdit = () => {
    dispatch(EditSavingsGoal({ id: editingId, title: editedTitle, target: parseFloat(editedTarget) }));
    setEditingId(null);
  };

  return (
    <Box sx={{   p: 3,
      mt: 4,
      borderRadius: 2,
      boxShadow: 2,
      bgcolor: "#fff",
      maxWidth: 700,
      width: "100%",
      ml: 2,}}>
      {/* Add Goal Form */}
      <Paper sx={{ p: 3, maxWidth: 600, textAlign: 'left',}} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Add Savings Goal
        </Typography>
        <form onSubmit={handleAddGoal}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Goal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Amount"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="success" type="submit" fullWidth>
                Add Goal
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

   
<Paper sx={{ mt: 4, p: 3, maxWidth: 600,   textAlign: 'left', }} elevation={3}>
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


    
      <Box sx={{ mt: 4 }}>
        {savingsGoals.map((goal) => (
          <Paper key={goal.id} sx={{ p: 2, mb: 2 }} elevation={1}>
            {editingId === goal.id ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    label="Edit Title"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    value={editedTarget}
                    onChange={(e) => setEditedTarget(e.target.value)}
                    label="Edit Target"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" color="success" onClick={handleSaveEdit} fullWidth>
                    Save
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <strong>{goal.title}</strong> — ₹{goal.current} / ₹{goal.target}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" gap={1} justifyContent="flex-end" mt={{ xs: 1, sm: 0 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateProgress(goal.id)}
                    >
                      Update Progress
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => handleEdit(goal)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleRemoveGoal(goal)}>
                      Remove
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Savings;
