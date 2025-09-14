import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function IncomeChart() {
  const transactions = useSelector((state) => state.Finance.transactions);
  const incomeData = transactions
    .filter((txn) => txn.type === 'income')
    .map((txn) => ({
      name: txn.title,
      amount: txn.amount,
    }));

  return (
    <div className="  w-full
        max-w-[650px]        
        mx-auto              
        px-4 sm:px-6 md:px-8 
        py-4
      ">
      <h2 className="text-lg font-semibold mb-2">Income Overview</h2>
      {incomeData.length === 0 ? (
        <p className="text-gray-500">No income data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={incomeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            barCategoryGap={30}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4ade80" barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default IncomeChart;
