import { Heading, Box, Button, Card, Text, Paragraph, Divider } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube, faFilter, faLock } from '@fortawesome/free-solid-svg-icons'
import { Puff } from 'react-loading-icons'
import { PolarAreaWithoutLegend } from "../Chart/PolarAreaWithoutLegend";

import env from "react-dotenv";

const UrlUltimaAtualizacao = env.API + "/PageWord/GetUltimaAtualizacao"
const UrlRank = env.API + "/PageWord/GetRank"
const UrlGroup = env.API + "/PageWord/GetGroups"
const UrlClasses = env.API + "/PageWord/GetClasses"

const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);
    const [atualizacao, setAtualizacao] = useState("");
    const [classes, setClasses] = useState([]);

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
        fetch(UrlClasses).then(a => a.json()).then((a) => {
            setClasses(a)
        });
    }
    useEffect(load, []);

    return (
        <>
            <Box style={{ width: "95%", margin: "0 auto" }}>

                <Box>
                    <Heading size="xl" style={{
                        textAlign: "center",
                        marginTop: "50px",
                        marginBottom: "50px"
                    }}>Palavras mais citadas nos sites de notícia</Heading>
                </Box>


                <Heading size="xl">
                    <FontAwesomeIcon icon={faFilter} /> CLASSES GRAMATICAIS
                </Heading>
                <Divider color="purple" />

                <Box style={{ display: "flex", flexFlow: "row wrap", width: "95%", margin: "0 auto" }}>
                    <>
                        {classes.length > 0 ?
                            classes.map((classe, k) =>
                                <>
                                    {classe.classe == "?" ?
                                        <Box style={{ order: "1", margin: "auto" }} key={k} m="">
                                            <Button m="xxs" color="purple" disabled={true} >
                                                DESCONHECIDO  <FontAwesomeIcon icon={faLock} /> - {classe.quantidade}
                                            </Button>
                                        </Box>
                                        :
                                        <Box style={{ order: "2", margin: "auto" }} key={k} m="">
                                            <Button m="xxs" color="purple" variant="ghost">
                                                {classe.classe} - {classe.quantidade}
                                            </Button>
                                        </Box>
                                    }
                                </>
                            )
                            :
                            <><Puff stroke="cyan" strokeOpacity={.925} speed={.75} /></>
                        }
                    </>
                </Box>

                <Heading size="xl" style={{marginTop:"75px"}}>
                    <FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10
                </Heading>
                <Divider color="pink" />
                <Box style={{ display: "flex", flexFlow: "row wrap", }}>
                    <Box style={{ flex: "1", }}>
                        <Card
                            variant="subtle" color="pink" m="xs" p="sm">
                            {list.length ?
                                <>

                                    <Box style={{ padding: "0 5%" }}>
                                        {list.map((i, c) =>
                                            <Box key={c}>
                                                <Text> {c + 1}º <b>{i.palavra}</b>
                                    ({(
                                                        (i.frequencia / list
                                                            .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)
                                                    }%)</Text>
                                                <br />
                                            </Box>

                                        )}
                                    </Box>
                                </>
                                :
                                <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}
                        </Card>
                        <Card
                            variant="subtle"
                            color="pink" m="xs" p="sm">

                            <div>
                                <Heading p="sm" size="sm">
                                    <Text color="white"> <FontAwesomeIcon icon={faCube} /> Ultima Atualização</Text>
                                </Heading>

                                <Box style={{ padding: "0 7%" }}>
                                    {atualizacao ?
                                        <Paragraph>
                                            <Text color="white"> <b>{atualizacao}</b> </Text>
                                        </Paragraph>
                                        : <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}
                                </Box>
                            </div>
                        </Card>
                    </Box>

                    <Card style={{ flex: "3",  }}
                        variant="subtle" color="pink" m="xs" >
                        <Box style={{width: "60%", margin:"10px auto"}}>

                            {list.length ?
                                <PolarAreaWithoutLegend list={list}></PolarAreaWithoutLegend>
                                :
                                <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                            }
                        </Box>
                    </Card>



                </Box>

                <Heading size="xl" style={{marginTop:"75px"}}>
                    <FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10 CADA SITE
                    </Heading>
                <Divider color="yellow" />
                <Box  style={{ display: "flex", flexFlow: "row wrap"}}>
                    {group.map((i, c) =>
                        <Card m="xs" key={c} style={{flex:"2"}}
                            variant="subtle" color="yellow" p="sm">
                            <div >
                                <Heading p="sm" size="sm">
                                    <Text> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                                </Heading>
                                <Box style={{ padding: "0 5%" }}>
                                    {
                                        i.palavras.map((wordCount, count) =>
                                            <div key={count} className="drac-text drac-text-white">
                                                <Text> {count + 1}º <b>{wordCount.palavra}
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


            </Box >
        </>
    )
}
export default Ranking