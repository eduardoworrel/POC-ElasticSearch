const puppeteer = require('puppeteer');

module.exports = {
    loadPage: async (siteAction) => {
        let keyValue;
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-logging']
        });

        const page = await browser.newPage();
        page.setDefaultTimeout(30000)
        
        try {

            keyValue = await siteAction(page);

        } catch (er) {
            console.log(er)

        } finally {
            await page.close();
            await browser.close();
        }

        return keyValue;
    }
}