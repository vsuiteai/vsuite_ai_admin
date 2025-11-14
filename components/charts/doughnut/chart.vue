<script setup lang="ts">
type chart_data = {
  label: string | null;
  count: number;
}[];

// labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//     {
//       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//       data: [40, 20, 80, 10]
//     }
//   ]

import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

const props = withDefaults(
  defineProps<{
    chart_data?: chart_data;
  }>(),
  {
    chart_data: () => [
      {
        label: "VueJs",
        count: 40,
      },
      {
        label: "NuxtJS",
        count: 30,
      },
    ],
  }
);

// Register required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

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
  cutout: "70%",
});

const chartData = computed(() => {
  const data = {
    labels: [] as string[],
    datasets: [
      {
        label: "Prompts",
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
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
