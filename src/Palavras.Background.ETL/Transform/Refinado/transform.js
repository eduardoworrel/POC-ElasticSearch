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
async function getObjectFrom(string) {
    const urlRequest = url + string;
    return {
        data
    } = await axios.get(encodeURI(urlRequest));

}

function lastCharIsS(string) {
    return string[string.length - 1] == 'S'
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
            .replace(/-/g, ' ')
            .replace(/"/g, ' ')
            .split(whiteSpace);

        splitData = splitData.filter(function (el) {
            return el != '';
        });

        const group = groupBy(splitData, (item) => item);

        for (let wordArray of group) {
            try {
                const {
                    data
                } = getObjectFrom(wordArray[0]);
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

                if (!isNaN(parseInt(wordArray[0]))) {
                    newWord.class = 'numeral'
                }



                if (lastCharIsS(wordArray[0])) {
                    const tryWordWithoutS = wordArray[0].slice(0, -1);
                    try {
                        const {
                            data
                        } = getObjectFrom(tryWordWithoutS)
                        if (data[0].class) {
                            newWord = {
                                site: keyValue.key,
                                word: tryWordWithoutS,
                                class: data[0].class,
                                count: wordArray[1].length,
                            }
                            WordList.push(newWord);
                        }
                    } catch (e) {
                        try {
                            if (lastCharIsZ(wordArray[0])) {
                                const tryWordWithER = wordArray[0] + "ER";
                                const {
                                    data
                                } = getObjectFrom(tryWordWithER)
                                if (data[0].class) {
                                    newWord = {
                                        site: keyValue.key,
                                        word: tryWordWithER,
                                        class: data[0].class,
                                        count: wordArray[1].length,
                                    }
                                    WordList.push(newWord);
                                }
                            }
                        } catch (e) {
                            analise.semClasse += 1;
                        }
                    }
                }

                WordList.push(newWord);
                analise.palavras += 1;
            }
        }
        return {
            transformed: WordList,
            analise
        };
    }
}