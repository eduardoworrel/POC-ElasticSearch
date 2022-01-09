import { Heading, Box, List, Card, Text, Paragraph, Divider } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube, faCubes } from '@fortawesome/free-solid-svg-icons'
import { Puff } from 'react-loading-icons'
import { PolarAreaWithoutLegend } from "../Chart/PolarAreaWithoutLegend";
require('dotenv').config()

const UrlUltimaAtualizacao = process.env.API + "/PageWord/GetUltimaAtualizacao"
const UrlRank = process.env.API + "/PageWord/GetRank"
const UrlGroup = process.env.API + "PageWord/GetGroups"

const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);
    const [atualizacao, setAtualizacao] = useState("");

    const load = () => {
        fetch(UrlRank).then(a => a.json()).then((a) => {
            setList(a)
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
        <>
            <Box>
                <Heading size="xl" style={{
                    textAlign: "center",
                    marginTop: "50px",
                    marginBottom: "50px"
                }}>Palavras mais citadas nos sites de notícia</Heading>
                <Card className="smallCard"
                    variant="subtle"
                    color="pink" m="sm" p="sm">

                    <div>
                        <Heading p="sm" size="sm">
                            <Text color="white"> <FontAwesomeIcon icon={faCube} /> Ultima Atualização</Text>
                        </Heading>
                        {atualizacao ?
                            <Paragraph>
                                <Text color="white"> <b>{atualizacao}</b> </Text>
                            </Paragraph>
                            : <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}
                    </div>
                </Card>
                {group.map((i, c) =>
                    <Card key={c} className="smallCard"
                        variant="subtle" color="pinkPurple" m="sm" p="sm">
                        <div >
                            <Heading p="sm" size="sm">
                                <Text color="black"> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                            </Heading>
                            <Box>
                                {
                                    i.palavras.map((wordCount, count) =>
                                        <div key={count} className="drac-text drac-text-white">
                                            <Text color="black"> {count + 1}º <b>{wordCount.palavra}
                                            </b> ({((wordCount.frequencia / i.palavras
                                                .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)}%)</Text>
                                        </div>
                                    )
                                }
                            </Box>
                        </div>
                    </Card>
                )}

            </Box>
            <Box>

                <Card className="smallCard"
                    variant="subtle" color="pink" m="sm" p="sm">
                    <Heading p="sm" >
                        <Text><FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10 </Text>
                    </Heading>
                    {list.length ?
                        <>
                            <List size="" p="">
                                {list.map((i, c) =>
                                    <li key={c} className="drac-text drac-text-white">
                                        <Text color="black"> {c + 1}º <b>{i.palavra}</b>
                                    ({(
                                                (i.frequencia / list
                                                    .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)
                                            }%)</Text>
                                    </li>
                                )}
                            </List>
                        </>
                        :
                        <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}
                </Card>

                <Card className="bigCard"
                    variant="subtle" color="pink" m="sm" >
                    <Heading p="sm" >
                        <Text><FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10 </Text>
                    </Heading>
                    {list.length ?
                        <PolarAreaWithoutLegend list={list}></PolarAreaWithoutLegend>
                        :
                        <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                    }
                </Card>

            </Box>
        </>
    )
}
export default Ranking