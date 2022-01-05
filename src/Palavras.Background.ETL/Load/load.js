const axios = require('axios')
module.exports = {
    load: async (collection) => {
        for(keyValue of collection){
            axios.post('http://eduardoworrel:5001/Page/Store', keyValue)
            .catch(function (error) {
                console.log(error.response.data);
            })

        }
    }
}