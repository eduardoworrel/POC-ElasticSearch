const axios = require('axios')
module.exports = {
    globo: async (page) => {
        await page.goto("https://globo.com");
        const pageText = await page.evaluate(() => {
            document.querySelector("#header-section").remove();
            return document.querySelector("body").innerText;
        });

        axios.post('http://localhost:5001/Page/Store', {
                key: 'globo.com',
                data: pageText
            })
            .catch(function (error) {
                console.log(error.response.data);
            })
        return true;
    }
}