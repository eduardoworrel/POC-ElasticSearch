const {blackList,sinalList} = require('./blacklist.js') 
const whiteSpace = ' ';

module.exports = {
    transform : (collection) => {
        //remove pronomes e conectores https://significado.herokuapp.com/livro
        cleanList = [];
        for(keyValue of collection){
            let newData = keyValue.data.toLowerCase();
            for(remove of sinalList){
                newData = newData.replace(remove, whiteSpace)
            }
            for(remove of blackList){
                newData = newData.replace(new RegExp(remove, 'g'), whiteSpace)
            }
            cleanList.push({
                key:   keyValue.key,
                data:  newData.trim()
            });
        }
        return cleanList;
    }
}
