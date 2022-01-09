const axios = require('axios')
require('dotenv')
module.exports = {
    load: async (collection) => {
        const result = await axios.post('https://palavras-api.eduardoworrel.com/Page/StoreWord', {
            Token: process.env.Token,
            Palavras: collection
        })
        console.log(result.data)
    }
}