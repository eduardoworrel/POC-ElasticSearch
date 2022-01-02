const globo = async (page) => {
    await page.goto("https://globo.com");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
            "#header-section",
            ".footer-container",
            ".footer_links",
            "#banner_vitrine"
        ].forEach((selector) => {
            _document.querySelector(selector).remove()
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'globo.com',
        data: pageText
    }
}
const uol = async (page) => {
    await page.goto("https://noticias.uol.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
          ".header"
        ].forEach((selector) => {
            _document.querySelector(selector).remove()
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'noticias.uol.com.br',
        data: pageText
    }
}
const cnnbrasil = async (page) => {
    await page.goto("https://www.cnnbrasil.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [".header__group","footer"].forEach((selector) => {
            _document.querySelector(selector).remove()
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'cnnbrasil.com.br',
        data: pageText
    }
}
const jovempan = async (page) => {
    await page.goto("https://jovempan.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
            ".container-top-to-menu-link",
            "#footer",
            ".container-panflix-collection",
            ".podcasts-header-home",
            ".container-follow-apps"

        ].forEach((selector) => {
            _document.querySelector(selector).remove()
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'jovempan.com.br',
        data: pageText
    }
}
const terra = async (page) => {
    await page.goto("https://www.terra.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
            [
                ".table-ad",
                "#zaz-app-t360-navbar",
              
            ].forEach((selector) => {
                _document.querySelector(selector).remove()
            });;

        return _document.querySelector("body").innerText;
    });

    return {
        key: 'terra.com.br',
        data: pageText
    }
}
module.exports = {
    globo,
    uol,
    cnnbrasil,
    jovempan,
    terra
}