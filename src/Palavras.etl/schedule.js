const {extract} = require('./src/Extract/extract');
const {transform} = require('./src/Transform/transform');
const {load} = require('./src/Load/load');

const cron = require("node-cron");

async function start(){
    await load(await transform(await extract()))
}

cron.schedule("00 00 00,6,12,18 * * *", async () => {
   await start();
})

start().catch();