import { Heading, Box, Button, Card, Text, Paragraph, Divider } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube, faFilter, faLock, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
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

    const [filterIsVisible, setFilterIsVisible] = useState(false);
    const [topIsVisible, setTopIsVisible] = useState(true);
    const [groupIsVisible, setGroupIsVisible] = useState(false);

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


                <Heading size="md" onClick={() => { setFilterIsVisible(!filterIsVisible) }}>
                    <FontAwesomeIcon icon={faFilter} /> CLASSES GRAMATICAIS
                    <span style={{ float: "right", fontSize: "2em", marginRight: "30px" }}>
                        {
                            filterIsVisible
                                ? <FontAwesomeIcon icon={faCaretUp} />
                                : <FontAwesomeIcon icon={faCaretDown} />}

                    </span>
                </Heading>
                <Divider color="purple" />
                {
                    filterIsVisible ?
                        <Box style={{ display: "flex", flexFlow: "row wrap", width: "95%", margin: "0 auto" }}>
                            <>
                                {classes.length > 0 ?
                                    classes.map((classe, k) =>
                                        <>
                                            {classe.classe == "?" ?
                                                <Box style={{ order: "1", margin: "auto" }} key={k} m="">
                                                    <Button style={{
                                                        fontSize: ".7em",
                                                        padding: "0 5px",
                                                        margin: "3px"
                                                    }} m="xxs" color="purple" disabled={true} >
                                                        DESCONHECIDO  <FontAwesomeIcon icon={faLock} />  <span style={{ fontSize: ".6em", background: "#1D0E29", padding: "2px 9px", borderRadius: "5px", color: "white" }}>{classe.quantidade}</span>
                                                    </Button>
                                                </Box>
                                                :
                                                <Box style={{ order: "2", margin: "auto", }} key={k} m="">
                                                    <Button style={{
                                                        fontSize: ".7em",
                                                        padding: "0 5px",
                                                        margin: "3px"
                                                    }} color="purple" variant="ghost">

                                                        {classe.classe} <span style={{ fontSize: ".6em", background: "#1D0E29", padding: "2px 9px", borderRadius: "5px", color: "bisque" }}>
                                                            {classe.quantidade}
                                                        </span>
                                                    </Button>
                                                </Box>
                                            }
                                        </>
                                    )
                                    :
                                    <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                                }
                            </>
                        </Box>
                        : <></>
                }

                <Heading size="lg" style={{ marginTop: "75px" }}
                    onClick={() => { setTopIsVisible(!topIsVisible) }}>
                    <FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10
                    <span style={{ float: "right", fontSize: "2em", marginRight: "30px" }}>
                        {
                            topIsVisible
                                ? <FontAwesomeIcon icon={faCaretUp} />
                                : <FontAwesomeIcon icon={faCaretDown} />}

                    </span>
                </Heading>
                <Divider color="pink" />
                {topIsVisible ?
                    <Box style={{ display: "flex", flexFlow: "row wrap" }}>
                        <Card style={{ flex: "1", minWidth: "240px" }}
                            variant="subtle"
                            color="pink" m="xs" p="sm">

                            <Box style={{ padding: "0 7%" }}>
                                {atualizacao ?
                                    <Paragraph >

                                        <Text color="white"> Ultima Atualização <b style={{ fontSize: "1.2em" }} >{atualizacao}</b> </Text>
                                    </Paragraph>
                                    : <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}
                            </Box>

                        </Card>
                        {list.length ?
                            <>
                                {list.map((i, c) =>
                                    <>
                                        <Box key={c} style={{ flex: "1", }} >
                                            <Card style={{ minWidth: "240px" }} variant="subtle" color="pink" m="xs" p="sm">
                                                <Box>
                                                    <Text>
                                                        <div> {c + 1}º <b>{i.palavra}</b></div>
                                                        <br />
                                                        <div style={{ background: "#4C1A2D", padding: "6px 8px 7px 12px", borderRadius: "8px", color: "white" }}>
                                                            <b>{((i.frequencia / list
                                                                .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)}%</b> dos top 10
                                                </div>
                                                        <div style={{ padding: "6px 8px 7px 12px", color: "white" }}>
                                                            apareceu <b>{i.frequencia}</b> vezes
                                                </div>
                                                    </Text>
                                                </Box>
                                            </Card>
                                        </Box>
                                    </>
                                )}
                            </>
                            :
                            <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                        }


                    </Box>
                    :
                    <></>}


                {/* <Card style={{ flex: "3", }}
                        variant="subtle" color="pink" m="xs" >
                        <Box style={{ width: "60%", margin: "10px auto" }}>

                            {list.length ?
                                <PolarAreaWithoutLegend list={list}></PolarAreaWithoutLegend>
                                :
                                <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                            }
                        </Box>
                    </Card> */}



                <Heading size="md" style={{ marginTop: "75px" }}
                    onClick={() => { setGroupIsVisible(!groupIsVisible) }}>
                    <FontAwesomeIcon icon={faGlobeAmericas} /> TOP 10 CADA SITE
                    <span style={{ float: "right", fontSize: "2em", marginRight: "30px" }}>
                        {
                            groupIsVisible
                                ? <FontAwesomeIcon icon={faCaretUp} />
                                : <FontAwesomeIcon icon={faCaretDown} />}

                    </span>
                </Heading>
                <Divider color="yellow" />
                {groupIsVisible ?
                <Box style={{ display: "flex", flexFlow: "row wrap" }}>
                {group.map((i, c) =>
                    <Box key={c} style={{ flex: "2", minWidth: "240px" }}>
                        <div >
                            <Heading p="sm" size="sm">
                                <Text> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                            </Heading>
                            <Box style={{ padding: "0 0%" }}>
                                {
                                    i.palavras.map((wordCount, count) =>
                                        <Card key={count} variant="subtle" color="yellow" p="sm" m="sm">
                                            <Text>
                                                {count + 1}º <b>{wordCount.palavra}<br /></b>
                                            </Text>
                                            <div style={{ padding: "6px 0px 0px 0px", color: "bisque" }}>
                                                <b>{((wordCount.frequencia / i.palavras
                                                    .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)}%</b> dos top 10
                                                </div>
                                            <div style={{ padding: "6px 0px 0px 0px", color: "bisque" }}>
                                                apareceu <b>{wordCount.frequencia}</b> vezes
                                            </div>
                                        </Card>

                                    )
                                }
                            </Box>
                        </div>
                    </Box>
                )}

            </Box>
                :
                <></>}
                


            </Box >
        </>
    )
}
export default Ranking