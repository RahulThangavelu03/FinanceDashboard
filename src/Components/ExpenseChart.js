import React from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#FF6B6B', '#FF8E72', '#FFB347', '#FFDA77', '#FFD6D6'];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name}: ₹${value}`}
    </text>
  );
};

function ExpenseChart() {
  const transactions = useSelector((state) => state.Finance.transactions);
  const expenseData = transactions
    .filter((txn) => txn.type === 'expense')
    .map((txn) => ({
      name: txn.title,
      value: txn.amount,
    }));

  return (
    <div className="  w-full
        max-w-[650px]   
        mx-auto              
        px-4 sm:px-6 md:px-8 
        py-4
      ">
      <h2 className="text-lg font-semibold mb-2">Expense Breakdown</h2>
      {expenseData.length === 0 ? (
        <p className="text-gray-500" >No expense data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={renderCustomLabel}
              labelLine={true}
            >
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;
