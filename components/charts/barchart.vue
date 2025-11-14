<script setup lang="ts">
type bar_chart_data = {
  label: string | null;
  count: number;
}[];

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

const props = defineProps<{
  chart_data: bar_chart_data;
}>();

// Register required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Reactive chart options
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
});

const chartData = computed(() => {
  const data = {
    labels: [] as string[],
    datasets: [
      {
        label: "Sales",
        data: [] as number[],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
      },
    ],
  };
  if (typeof props.chart_data !== "object") return data;

  props.chart_data.forEach((el) => {
    if (el.label) {
      data.labels.push(el.label);
      data.datasets[0].data.push(el.count);
    }
  });

  return data;
});
</script>

<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
