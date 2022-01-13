import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function montaGrafico(data) {

    if (data != [])
        return (
            <>
                <Bar
                    data={data}
                    options={
                        {
                            maintainAspectRatio: false,
                            indexAxis: 'y',
                            elements: {
                                bar: {
                                    borderWidth: 2,
                                },
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: 'Frequência dos top 10',
                                },
                            },

                        }
                    }
                />
            </>)
}

export const Horizontal = ({ list }) => {
    const labels = [];
    const data = [];
    const colors = [];

    for (let wordCount of list) {
        labels.push(wordCount.palavra)
        data.push(wordCount.frequencia)

        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 200);
        const rgb = `rgba(${r},${g},${b},0.7)`;
        colors.push(rgb)
    }
    const params = {
        labels: labels,
        datasets: [
            {
                label: '#',
                data: data,
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    }
    return montaGrafico(params);

}