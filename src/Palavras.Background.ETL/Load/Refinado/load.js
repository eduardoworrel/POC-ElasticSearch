const axios = require('axios')
module.exports = {
    load: async (collection) => {
            const result = await axios.post('https://palavras-api.eduardoworrel.com/Page/StoreWord', collection)
            console.log(result.data)
    }
}