import { createSlice } from "@reduxjs/toolkit";
const FinanceSlice =createSlice({

    name:"Finance",
    initialState: {

      transactions: [], 
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    SavingsGoals:[]
  },
reducers:{ 
AddTransaction :(state,action) =>{


   state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.totalIncome += action.payload.amount;
        state.balance += action.payload.amount;
      } else {
        state.totalExpenses += action.payload.amount;
        state.balance -= action.payload.amount;
      }

},

EditTransaction: (state, action) => {
  const { id, title, amount, type } = action.payload;
  const index = state.transactions.findIndex(txn => txn.id === id);
  if (index !== -1) {
    const oldTxn = state.transactions[index];

  
    if (oldTxn.type === 'income') {
      state.totalIncome -= oldTxn.amount;
      state.balance -= oldTxn.amount;
    } else {
      state.totalExpenses -= oldTxn.amount;
      state.balance += oldTxn.amount;
    }

    state.transactions[index] = { id, title, amount, type };

    if (type === 'income') {
      state.totalIncome += amount;
      state.balance += amount;
    } else {
      state.totalExpenses += amount;
      state.balance -= amount;
    }
  }
},

DeleteTransaction:(state,action)=>{
    const index = state.transactions.findIndex(txn => txn.id === action.payload);
    if (index !== -1) {
      const txn = state.transactions[index];
      if (txn.type === 'income') {
        state.totalIncome -= txn.amount;
        state.balance -= txn.amount;
      } else {
        state.totalExpenses -= txn.amount;
        state.balance += txn.amount;
      }
      state.transactions.splice(index, 1);
    }
},


AddSavingsGoal: (state, action) => {
  state.SavingsGoals.push({
    id: Date.now(),
    ...action.payload,
    current: 0,
  });
},
UpdateSavingsProgress: (state, action) => {
  const { id, amount } = action.payload;
  const goal = state.SavingsGoals.find(goal => goal.id === id);
  if (goal) {
    goal.current = amount;
  }
},


EditSavingsGoal: (state, action) => {
  const { id, title, target } = action.payload;
  const goal = state.SavingsGoals.find(goal => goal.id === id);
  if (goal) {
    if (title) goal.title = title;
    if (target) goal.target = target;
  }
},

RemoveOneGoal:(state,action)=>{

 const goalId = action.payload;
  state.SavingsGoals = state.SavingsGoals.filter(goal => goal.id !== goalId);


}




    }
})

export const {AddTransaction,DeleteTransaction,EditTransaction,AddSavingsGoal,UpdateSavingsProgress,EditSavingsGoal,RemoveOneGoal} = FinanceSlice.actions

export default FinanceSlice.reducer