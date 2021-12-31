const {blackList} = require('./blacklist.js') 
const whiteSpace = ' ';

module.exports = {
    transform : (collection) => {
        //remove pronomes e conectores
        for(keyValue of collection){
            for(remove of blackList){
                keyValue.data = keyValue.data.replace(remove, whiteSpace);
            }
        }
        return collection;
    }
}