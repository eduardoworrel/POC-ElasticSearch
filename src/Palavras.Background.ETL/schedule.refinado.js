const {extract} = require('./Extract/extract');
const {transform} = require('./Transform/Refinado/transform');
const {load} = require('./Load/Refinado/load');

const cron = require("node-cron");

async function start(){
    let timeToCount = new Date();
    const duration = () => {
       const diferenceInSeconds = Math.round(((new Date() - timeToCount)/ 1000))
       timeToCount = new Date();
       return diferenceInSeconds + "s";
    }

    try{
        console.log("\n Extração iniciada")
        const extracted = await extract();
        console.log("\n Extração:")
        console.log("\n - Duração" +  duration())
        console.log("\n - Quantidade de sites" +  extract.length)

        console.log("\n Transformação iniciada")
        
        for(let siteCollection of extracted){
            console.log("\n Transformação iniciada")
            timeToCount = new Date();
            let {transformed, analise} = await transform(siteCollection);

            console.log("\n Transformação:")
            console.log("\n - Duração" +  duration())
            console.log(`${analise.site}: ${analise.semClasse} palavras sem classe de ${analise.palavras} `)
            
            console.log("\n Carregamento iniciado")
            timeToCount = new Date();
            const result = await load(transformed);
            console.log("\n Carregamento:")
            console.log("\n - " +  analise.site)
            console.log("\n - Duração" +  duration())
            
        }
    

        
    }
    catch(e){
        console.log(e)
    } 
}
cron.schedule("00 00 00,6,12,18 * * *", async () => {
    await start();
 })
 
start().catch(e => console.log(e));