
const {globo} = require("./sitesAction.js")
const {loadPage} = require("./loadPage.js")

try{
    loadPage(globo).catch();
}catch(e){
    console.log(e);
}