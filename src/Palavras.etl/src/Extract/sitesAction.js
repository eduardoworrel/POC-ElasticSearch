const axios = require('axios')
module.exports = {
    globo: async (page) => {
        await page.goto("https://globo.com");
        const pageText = await page.evaluate(() => {
            document.querySelector("#header-section").remove();
            return document.querySelector("body").innerText;
        });

        return {
            key: 'globo.com',
            data: pageText
        }
    },
    uol: async (page) => {
        await page.goto("https://noticias.uol.com.br");
        const pageText = await page.evaluate(() => {
            document.querySelector(".header").remove();
            document.querySelector("script").remove();
            document.querySelector("style").remove();
            return document.querySelector("body").innerText;
        });

        return {
            key: 'noticias.uol.com.br',
            data: pageText
        }
    },
}