// DashboardComponent.js

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './DashboardComponent.css'; // Import CSS file

const DashboardComponent = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const chartInstances = useRef([]);

  const [selectedMonth, setSelectedMonth] = useState('June');

  useEffect(() => {
    const createChart = (ctx, chartType, chartData, chartOptions) => {
      const newChart = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: chartOptions
      });

      // Example of adding interactivity
      newChart.options.onClick = (event, elements) => {
        // Handle click event
        if (elements && elements.length > 0) {
          const index = elements[0].index;
          console.log(`Clicked on index ${index}`);
        }
      };

      return newChart;
    };

    const destroyChart = (chart) => {
      if (chart) {
        chart.destroy();
      }
    };

    const lineChartCtx = lineChartRef.current.getContext('2d');
    const barChartCtx = barChartRef.current.getContext('2d');
    const pieChartCtx = pieChartRef.current.getContext('2d');

    const lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    const barChartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [
        {
          label: 'Revenue',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    const pieChartData = {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          label: 'User Activity',
          data: [20, 30, 25],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 205, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1
        }
      ]
    };

    chartInstances.current[0] = createChart(lineChartCtx, 'line', lineChartData, {});
    chartInstances.current[1] = createChart(barChartCtx, 'bar', barChartData, {});
    chartInstances.current[2] = createChart(pieChartCtx, 'pie', pieChartData, {});

    // Cleanup function to destroy chart instances when component unmounts
    return () => {
      chartInstances.current.forEach(chart => {
        destroyChart(chart);
      });
    };
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Dynamic data customization based on the selectedMonth
  useEffect(() => {
    // You can update your chart data here based on the selectedMonth
    // For simplicity, we'll just log the selected month for now
    console.log(`Selected Month: ${selectedMonth}`);
  }, [selectedMonth]);

  return (
    <div>
      <h1>E-commerce Dashboard</h1>
      <div className="controls">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {['January', 'February', 'March', 'April', 'May', 'June'].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-container">
        <canvas ref={lineChartRef} className="chart" />
        <canvas ref={barChartRef} className="chart" />
        <canvas ref={pieChartRef} className="chart" />
      </div>
    </div>
  );
};

export default DashboardComponent;


//abc