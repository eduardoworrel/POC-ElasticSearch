const axios = require('axios')
const whiteSpace = /\s+/;
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
    transform: async (keyValue) => {
        WordList = [];
        const analise = {
            site: keyValue.key,
            palavras: 0,
            semClasse: 0
        }
        let newData = keyValue.data.toUpperCase();
        let splitData = newData
            .replace(/(\r\n|\n|\r)/gm, "  ")
            .replace(/\./g, ' ')
            .replace(/:/g, ' ')
            .replace(/,/g, ' ')
            .replace(/'/g, ' ')
            .replace(/"/g, ' ')
            .split(whiteSpace);

        splitData = splitData.filter(function (el) {
            return el != '';
        });

        const group = groupBy(splitData, (item) => item);

        for (let wordArray of group) {
            const urlRequest = url + wordArray[0];

            try {
                const {
                    data
                } = await axios.get(encodeURI(urlRequest));

                if (data[0].class) {
                    let newWord = {
                        site: keyValue.key,
                        word: wordArray[0],
                        class: data[0].class,
                        count: wordArray[1].length,
                    }
                    WordList.push(newWord);
                    analise.palavras += 1;
                } else {
                    throw new Error('sem class');
                }
            } catch (e) {

                let newWord = {
                    site: keyValue.key,
                    word: wordArray[0],
                    class: '?',
                    count: wordArray[1].length,
                }
                WordList.push(newWord);
                analise.palavras += 1;
                analise.semClasse += 1;
            }
        }
        return {transformed: WordList, analise};
    }
}