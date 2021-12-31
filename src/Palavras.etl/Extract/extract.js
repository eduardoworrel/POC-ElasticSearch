
const actions = require("./sitesAction.js.js")
const {loadPage} = require("./loadPage.js.js")


module.exports = {
    extract : async () => {
        const collection = [];
        try{
            
            for(let siteAction in actions){
               collection.push( await loadPage(actions[siteAction])) 
            }
            
        }catch(e){
            console.log(e);
        }
        return collection;
    }
}