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

const UrlRank = "http://localhost:5001/Page/GetRank"
const UrlGroup = "http://localhost:5001/Page/GetGroups"

const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);
    const [data, setData] = useState(0);

    function montaGrafico(data) {

        if (data != 0)
            return (
                <>

                    <PolarArea
                        data={data} />

                </>)
    }
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
                        label: '# of Votes',
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
    }
    useEffect(load, []);

    return (

        <Box>
            <Heading size="xl" style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "50px"
            }}>Palavras mais citadas nos sites de notícia</Heading>
            <Card style={{
                width: "22%",
                float: "left"
            }}
                variant="subtle"
                color="pink" m="sm" p="sm">


                <div >
                    <Heading p="sm" size="sm">
                        <Text color="white"> <FontAwesomeIcon icon={faCube} /></Text>
                    </Heading>
                    <Paragraph>
                        <Text color="white"> Ultima Atualização: <b>02/02/2022 12h00</b> </Text>
                    </Paragraph>
                </div>
            </Card>
            {group.map((i, c) =>
                <Card key={c} style={{
                    width: "22%",
                    float: "left"
                }}
                    color="pinkPurple" m="sm" p="sm">


                    <div >
                        <Heading p="sm" size="sm">
                            <Text color="black"> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                        </Heading>
                        <Box>
                            {
                                i.wordCounts.map((wordCount, count) =>
                                    <div key={count} className="drac-text drac-text-white">
                                        <Text color="black"> {count + 1}º <b>{wordCount.word}
                                        </b> ({((wordCount.count / i.wordCounts
                                            .reduce((a, b) => a + b.count, 0)) * 100).toFixed(2)}%)</Text>
                                    </div>
                                )
                            }
                        </Box>
                    </div>
                </Card>
            )}
            <Box style={{
                width: "96%",
                float: "left",
                padding: "20px",
                background: "rgba(255,255,255,1)",
                borderRadius: "10px"
            }}
                color="" m="sm" >

                <Card style={{
                    width: "30%",
                    float: "left"
                }}
                    color="pink" m="sm" p="sm">

                    <Heading p="sm" >
                        <Text color="black"><FontAwesomeIcon icon={faGlobeAmericas} />   TOP 10 </Text>
                    </Heading>
                    <>
                        <List size="" p="">
                            {list.map((i, c) =>
                                <li key={c} className="drac-text drac-text-white">
                                    <Text color="black"> {c + 1}º <b>{i.word}</b>
                                    ({(
                                            (i.count / list
                                                .reduce((a, b) => a + b.count, 0)) * 100).toFixed(2)
                                        }%)</Text>
                                </li>
                            )}
                        </List>
                    </>
                </Card>
                <Box style={{
                    width: "39%",
                    float: "left"
                }}>
                    {montaGrafico(data)}
                </Box>
            </Box>
        </Box>
    )
}
export default Ranking