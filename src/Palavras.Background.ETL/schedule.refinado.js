const {extract} = require('./Extract/extract');
const {transform} = require('./Transform/Refinado/transform');
const {load} = require('./Load/Refinado/load');

const cron = require("node-cron");

async function start(){
    const FirstTimeToCount = new Date();
    let timeToCount = FirstTimeToCount;
    const duration = () => {
        
       const diferenceInSeconds = Math.round(((new Date() - timeToCount)/ 1000))
       
       timeToCount = new Date();
       
       if(diferenceInSeconds > 60){
           return diferenceInSeconds / 60 + "m"
       }
       return diferenceInSeconds + "s";
    }

    try{
        console.log("\n Extração iniciada")
        const extracted = await extract();
        console.log("\n Extração:")
        console.log("\n - Duração: " +  duration())
        console.log("\n - Quantidade de sites: " +  extracted.length)

        for(let siteCollection of extracted){
            console.log("\n Transformação iniciada")
            timeToCount = new Date();
            const {transformed, analise} = await transform(siteCollection);

            console.log("\n Transformação:")
            console.log("\n - Duração: " +  duration())
            console.log(`${analise.site}: ${analise.semClasse} palavras sem classe de ${analise.palavras} `)
            
            console.log("\n Carregamento iniciado")
            timeToCount = new Date();
            const result = await load(transformed);
            console.log("\n Carregamento:")
            console.log("\n - " +  analise.site)
            console.log("\n - Duração: " +  duration())
            
        }
    
        timeToCount = FirstTimeToCount;
        console.log("\n - Duração Total: " +  duration())

        
    }
    catch(e){
        console.log(e)
        timeToCount = FirstTimeToCount;
        console.log("\n - Duração Total: " +  duration())
          
    } 
}
cron.schedule("00 15 9 * * *", async () => {
    await start();
 })
 