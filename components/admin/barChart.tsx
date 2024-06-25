import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Sales', 'Visits', 'Income', 'Revenue'],
        datasets: [
            {
                label: 'Amount',
                data: [9000, 6000, 5000, 3000],
                backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24'],
                borderColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    return <Bar data={data} options={options} />;
};
export default BarChart;
