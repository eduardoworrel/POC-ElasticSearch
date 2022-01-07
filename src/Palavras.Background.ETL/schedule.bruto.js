const {extract} = require('./Extract/extract');
const {transform} = require('./Transform/Bruto/transform');
const {load} = require('./Load/Bruto/load');

const cron = require("node-cron");

async function start(){
    try{
        await load(await transform(await extract()))
    }
    catch(e){
        console.log(e)
    } 
}
cron.schedule("00 00 00,6,12,18 * * *", async () => {
    await start();
 })
start().catch();