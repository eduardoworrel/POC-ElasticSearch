import { Heading, Box, Button, Card, Text, Paragraph, Divider, List, Anchor } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube, faFilter, faLock, faCaretDown, faCaretUp, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { Puff } from 'react-loading-icons'
import { PolarAreaWithoutLegend } from "../Chart/PolarAreaWithoutLegend";
import { Horizontal } from "../Chart/Horizontal";

import env from "react-dotenv";

const UrlUltimaAtualizacao = env.API + "/PageWord/GetUltimaAtualizacao"
const UrlRank = env.API + "/PageWord/GetRank"
const UrlGroup = env.API + "/PageWord/GetGroups"
const UrlClasses = env.API + "/PageWord/GetClasses"

const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);
    const [atualizacao, setAtualizacao] = useState({});
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
        fetch(UrlUltimaAtualizacao).then(a => a.json()).then((a) => {
            setAtualizacao(a)
        });
        fetch(UrlClasses).then(a => a.json()).then((a) => {
            setClasses(a)
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
            </Box>
            <Box style={{ margin: "0 auto", width: "95%" }}>

                {atualizacao.quantidadePalavras ?
                    <section style={{ borderRadius: "15px", background: "rgb(17, 17, 17)", marginBottom: "50px", textAlign: "center", display: "flex", flexFlow: "row wrap", padding: "0 7% 30px", justifyContent: "space-around" }}>
                        <Box style={{ marginTop: "20px" }}>
                            <Text color="white"> <b style={{ fontSize: "1.8em" }} >{atualizacao.quantidadePalavras.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</b> <br />Palavras registradas </Text>
                        </Box>
                        <Box style={{ marginTop: "20px" }}>
                            <Text color="white"><b style={{ fontSize: "1.8em" }} >{atualizacao.quantidadeClasses}</b> <br />Classes gramaticais </Text>
                        </Box>
                        <Box style={{ marginTop: "30px" }}>
                            <Text color="white"> Ultima Atualização <br /><b style={{ fontSize: "1.2em" }} >{atualizacao.ultimaAtualizacao}</b> </Text>
                        </Box>
                        <Box style={{ marginTop: "30px" }}>
                            <Text color="white"> Primeira coleta: <br /><b style={{ fontSize: "1.2em" }} >{atualizacao.dataInicio}</b> </Text>
                        </Box>
                    </section>
                    : <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>}

            </Box>
            <Box style={{ width: "95%", margin: "0 auto" }}>



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
                        <Box style={{ display: "flex", flexFlow: "row wrap", width: "95%", margin: "0 auto", justifyContent: "space-between" }}>
                            <>
                                {classes.length > 0 ?
                                    classes.map((classe, k) =>
                                        <Box key={k}>
                                            {classe.classe == "?" ?
                                                <Box style={{ order: "1", margin: "auto" }} m="">
                                                    <Button style={{
                                                        fontSize: ".8em",
                                                        padding: "0 5px",
                                                        margin: "3px"
                                                    }} m="xxs" color="purple" disabled={true} >
                                                        Desconhecido * <FontAwesomeIcon icon={faLock} />  <span style={{ fontSize: ".6em", background: "#1D0E29", padding: "2px 9px", borderRadius: "5px", color: "white" }}>{classe.quantidade}</span>
                                                    </Button>
                                                </Box>
                                                :
                                                <Box style={{ order: "2", margin: "auto", }} m="">
                                                    <Button style={{
                                                        fontSize: ".8em",
                                                        padding: "0 5px",
                                                        margin: "3px"
                                                    }} color="purple" variant="ghost">

                                                        {classe.classe} <span style={{ fontSize: ".6em", background: "#1D0E29", padding: "2px 9px", borderRadius: "5px", color: "bisque" }}>
                                                            {classe.quantidade}
                                                        </span>
                                                    </Button>
                                                </Box>
                                            }

                                        </Box>
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
                    <Box style={{ width: "100%", display: "flex", flexFlow: "row wrap" }}>

                        {list.length ?
                            <>
                                <Card style={{ flex: "2", flexGrow: "2" }}
                                    variant="subtle" color="pink" m="xs" >
                                    <Box style={{ width: "95%", height: "400px", margin: "10px auto" }}>

                                        <>
                                            <Horizontal list={list}></Horizontal>
                                        </>

                                    </Box>
                                </Card>
                                {list.map((i, c) =>

                                    <Box key={c} style={{ flex: "1", }} >
                                        <Card style={{ minWidth: "240px" }} variant="subtle" color="pink" m="xs" p="sm">
                                            <Box>
                                                <Text>
                                                    <div> {c + 1}º <b style={{ fontSize: "1.3em" }}>{i.palavra}</b></div>
                                                    <br />
                                                    <div style={{ background: "", padding: "6px 8px 7px 12px", borderRadius: "8px", color: "#cc4b7a" }}>
                                                        <b>{((i.frequencia / list
                                                            .reduce((a, b) => a + b.frequencia, 0)) * 100).toFixed(2)}%</b> dos top 10
                                                    </div>
                                                    <div style={{ padding: "6px 8px 7px 12px", color: "rgb(255, 144, 184)" }}>
                                                        apareceu <b>{i.frequencia}</b> vezes
                                                    </div>
                                                    <div style={{ padding: "6px 8px 7px 12px", color: "rgb(255, 144, 184)" }}>
                                                        <Anchor hoverColor="pinkPurple" isExternal={true} href={`https://dicionario-aberto.net/search/${i.palavra}`}> Significado <FontAwesomeIcon color="#9580ff" icon={faExternalLinkAlt}></FontAwesomeIcon></Anchor>
                                                    </div>
                                                </Text>
                                            </Box>
                                        </Card>
                                    </Box>

                                )}
                            </>
                            :
                            <><Puff stroke="pink" strokeOpacity={.925} speed={.75} /></>
                        }



                    </Box>
                    :
                    <></>}

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
                <Box style={{ paddingBottom: "100px" }}>
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

                                                        <div style={{ padding: "12px 0px 0px 0px", color: "rgb(255, 144, 184)" }}>
                                                            <Anchor hoverColor="pinkPurple" isExternal={true} href={`https://dicionario-aberto.net/search/${i.palavra}`}> Significado <FontAwesomeIcon color="#9580ff" icon={faExternalLinkAlt}></FontAwesomeIcon></Anchor>
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
                </Box>
                <Box style={{ bottom: "10px" }}>
                    <Divider />
                    <List variant="none" color="purple">
                        <li className="drac-text drac-text-white">
                            Desenvolvido por <Anchor href="https://eduardoworrel.com" color="cyanGreen" hoverColor="yellowPink" mb="sm">
                                Eduardo Worrel
                    </Anchor>
                        </li>
                        <li className="drac-text drac-text-white">Disponível em <Anchor href="https://github.com/eduardoworrel/Palavras-ETL-ElasticSearch" color="cyanGreen" hoverColor="yellowPink" mb="sm">
                            Github
                    </Anchor>
                        </li>
                    </List>
                </Box>
            </Box >
        </>
    )
}
export default Ranking