const axios = require('axios')
module.exports = {
    load: async (collection) => {
        for(keyValue of collection){

            axios.post('http://localhost:5001/Page/Store', {
               keyValue
            })
            .catch(function (error) {
                throw error;
            })

        }
    }
}