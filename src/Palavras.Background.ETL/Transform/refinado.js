const whiteSpace = ' ';
const url = 'https://significado.herokuapp.com/';
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

module.exports = {
    transform : (collection) => {
        //remove pronomes e conectores 
        WordList = [];
        for(keyValue of collection){

            let newData = keyValue.data.toUpperCase();
            let splitData = newData.split(whiteSpace);
            splitData = splitData.filter(function(el){
                return el != '';
            });
            const group = groupBy(splitData, (item) => item);

            for(wordArray of group){
                let urlRequest = url + wordArray[0];
                let response = fetch(urlRequest).then(res => res.json());
                response.then(data => {
                    if(!data.error){
                        let newWord = {
                            site : keyValue.Key,
                            word : wordArray[0],
                            class : data.class,
                            count : wordArray.length,
                        }
                        WordList.push(newWord);
                    }
                });
            }
          
        }
        return WordList;
    }
}
