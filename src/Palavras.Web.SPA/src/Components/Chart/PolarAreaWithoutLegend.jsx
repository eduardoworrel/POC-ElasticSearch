import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function montaGrafico(data) {

    if (data != [])
        return (
            <>
                <PolarArea
                    data={data}
                    options={
                        {
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }
                    }
                />
            </>)
}

export const PolarAreaWithoutLegend = ({list}) => {
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