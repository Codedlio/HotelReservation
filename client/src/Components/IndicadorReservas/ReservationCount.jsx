import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ReservationCountChart = () => {
  const data = [
    { mes: 'Enero', cantidad: 10 },
    // Agrega más datos para cada mes
  ];

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="mes" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="cantidad" fill="#8884d8" />
    </BarChart>
  );
}

export default ReservationCountChart;