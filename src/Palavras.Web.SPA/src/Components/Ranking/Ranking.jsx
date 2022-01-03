import { Heading, Box, List, Card, Text } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faCube } from '@fortawesome/free-solid-svg-icons'

const UrlRank = "http://localhost:5001/Page/GetRank"
const UrlGroup = "http://localhost:5001/Page/GetGroups"
const Ranking = () => {
    const [list, setList] = useState([]);
    const [group, setGroup] = useState([]);

    const load = () => {
        fetch(UrlRank).then(a => a.json()).then((a) => {
            setList(a)
        });
        fetch(UrlGroup).then(a => a.json()).then((a) => {
            setGroup(a)
        });
    }
    useEffect(load, []);

    return (

        <Box>
            <Heading size="xl" style={{
                textAlign:"center",
                marginTop:"50px",
                marginBottom:"50px"
            }}>Palavras mais citadas nos sites de notícia</Heading>
            <Card style={{
                width: "22%",
                float: "left"
            }}
                color="purpleCyan" m="sm" p="sm">
                <Heading p="sm" >
                    <Text color="black"><FontAwesomeIcon icon={faGlobeAmericas} />   TOP 10 </Text>
                </Heading>
                {list.map((i, c) =>
                    <div key={c}>
                        <List size="" p="">
                            <li className="drac-text drac-text-white">
                                <Text color="black"> {c + 1}º <b>{i.word}</b> ({i.count})</Text>
                            </li>
                        </List>
                    </div>
                )}
            </Card>

       
                {group.map((i, c) =>
                        <Card style={{
                            width: "22%",
                            float: "left"
                        }}
                            color="pinkPurple" m="sm" p="sm">
            
                   
                        <div key={c}>
                            <Heading p="sm" size="sm">
                            <Text color="black"> <FontAwesomeIcon icon={faCube} /> {i.site} </Text>
                            </Heading>
                            <List size="" p="">
                                {
                                    i.wordCounts.map((wordCount, count) =>
                                        <li key={count} className="drac-text drac-text-white">
                                             <Text color="black"> {count + 1}º <b>{wordCount.word}</b> ({wordCount.count})</Text>
                    </li>
                                    )}
                            </List>
                        </div>
                        </Card>
                )}
           
        </Box>
    )
}
export default Ranking