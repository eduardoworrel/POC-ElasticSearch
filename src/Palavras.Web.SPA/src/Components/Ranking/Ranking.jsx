import { Heading, Box, List } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";


const Url = "http://localhost:5001/Page/GetRank"
const Ranking = ()=>{
    const [list,setList] = useState([]);

    const load = ()=>{
        fetch(Url).then(a => a.json()).then((a)=>{
            setList(a)
        });
    }
    useEffect(load,[]);
    
    return (
        
        <Box>
            <Heading p="sm">
                TOP 10 PALAVRAS 
            </Heading>
           
            {list.map((i,c)=> 
            <div key={c}>
                <List size="lg" p="md">
                <li className="drac-text drac-text-white"><b>{c + 1}º</b>
                - {i.word} </li>
                
                <div className="bag">
                    {i.count} 
                </div>
                </List>
            </div>
            )}
           
        </Box>
    )
}
export default Ranking