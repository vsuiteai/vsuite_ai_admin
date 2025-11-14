<template>
  <Line id="stepped-line-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// Chart Data (two datasets: blue & red)
const chartData = ref({
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Active (Blue)",
      data: [40, 20, 12, 60, 35],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      tension: 0,
      stepped: true,
      fill: false,
    },
    {
      label: "Inactive (Red)",
      data: [30, 50, 20, 40, 55],
      borderColor: "#EF4444",
      backgroundColor: "rgba(239, 68, 68, 0.3)",
      tension: 0,
      stepped: true,
      fill: false,
    },
  ],
});

// Chart Options
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "start",
    },
    title: {
      display: false,
    },
  },
});
</script>
