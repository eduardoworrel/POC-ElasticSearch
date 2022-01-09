import { Heading, Box, List, Card, Text, Paragraph, Anchor } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube, faCubes } from '@fortawesome/free-solid-svg-icons'

import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const UrlUltimaAtualizacao = "https://palavras-api.eduardoworrel.com/PageWord/GetUltimaAtualizacao"
const UrlRank = "https://palavras-api.eduardoworrel.com/PageWord/GetRank"
const UrlGroup = "https://palavras-api.eduardoworrel.com/PageWord/GetGroups"
function montaGrafico(data) {
   
    if (data != 0)
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
const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);
    const [data, setData] = useState(0);
    const [atualizacao, setAtualizacao] = useState("Carregando..");

    const load = () => {
        fetch(UrlRank).then(a => a.json()).then((a) => {
            setList(a)

            const labels = [];
            const data = [];
            const colors = [];

            for (let wordCount of a) {
                labels.push(`${wordCount.word} - ${(
                    (wordCount.count / a
                        .reduce((s, b) => s + b.count, 0)) * 100).toFixed(2)}%`)
                data.push((
                    (wordCount.count / a
                        .reduce((s, b) => s + b.count, 0)) * 100).toFixed(2))

                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 200);
                const rgb = `rgba(${r},${g},${b},0.7)`;
                colors.push(rgb)
            }

            setData({
                labels: labels,
                datasets: [
                    {
                        label: '#',
                        data: data,
                        backgroundColor: colors,

                        borderWidth: 1,
                    },
                ],
            });

        });
        fetch(UrlGroup).then(a => a.json()).then((a) => {
            setGroup(a)
        });
        fetch(UrlUltimaAtualizacao).then(a => a.text()).then((a) => {
            setAtualizacao(a)
        });
    }
    useEffect(load, []);

    return (

        <Box>
            <Heading size="xl" style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "50px"
            }}>Palavras mais citadas nos sites de notícia</Heading>
            <Card className="smallCard"
                variant="subtle"
                color="pink" m="sm" p="sm">

                <div >
                    <Heading p="sm" size="sm">
                        <Text color="white"> <FontAwesomeIcon icon={faCube} /></Text>
                    </Heading>
                    <Paragraph>
                        <Text color="white"> Ultima Atualização: <b>{atualizacao}</b> </Text>
                    </Paragraph>
                </div>
            </Card>
            {group.map((i, c) =>
                <Card key={c} className="smallCard"
                    color="pinkPurple" m="sm" p="sm">
                    <div >
                        <Heading p="sm" size="sm">
                            <Text color="black"> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                        </Heading>
                        <Box>
                            {
                                i.wordCounts.map((wordCount, count) =>
                                    <div key={count} className="drac-text drac-text-white">
                                        <Text color="black"> {count + 1}º <b>{wordCount.palavra}
                                        </b> ({((wordCount.frequencia / i.wordCounts
                                            .reduce((a, b) => a + b.count, 0)) * 100).toFixed(2)}%)</Text>
                                    </div>
                                )
                            }
                        </Box>
                    </div>
                </Card>
            )}

            <Card className="smallCard"
                color="pink" m="sm" p="sm">

                <Heading p="sm" >
                    <Text color="black"><FontAwesomeIcon icon={faGlobeAmericas} />   TOP 10 </Text>
                </Heading>
                <>
                    <List size="" p="">
                        {list.map((i, c) =>
                            <li key={c} className="drac-text drac-text-white">
                                <Text color="black"> {c + 1}º <b>{i.palavra}</b>
                                    ({(
                                        (i.count / list
                                            .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)
                                    }%)</Text>
                            </li>
                        )}
                    </List>
                </>
            </Card>
            <Card className="bigCard"
                    color="" m="sm" >

                    {montaGrafico(data)}
               
            </Card>
        </Box>
    )
}
export default Ranking