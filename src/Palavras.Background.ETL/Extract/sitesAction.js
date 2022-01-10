const g1 = async (page) => {
    await page.goto("https://g1.globo.com");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
            "#glb-topo",
            "#banner_vitrine",
            "script",
            "style"
        ].forEach((selector) => {
            for(let e of _document.querySelectorAll(selector)){
                e.remove();
            }
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'g1.globo.com',
        data: pageText
    }
}
const uol = async (page) => {
    await page.goto("https://noticias.uol.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
          ".header",
          "script",
          "style"
        ].forEach((selector) => {
            for(let e of _document.querySelectorAll(selector)){
                e.remove();
            }
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'noticias.uol.com.br',
        data: pageText
    }
}

const google = async (page) => {
    await page.goto("https://news.google.com/topstories?hl=pt-BR&gl=BR");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [
          ".gb_Fc",
          ".SbZred",
          ".gb_4d",
          "span",
          "header",
          "menu",
          "script",
          "style"
        ].forEach((selector) => {
            for(let e of _document.querySelectorAll(selector)){
                e.remove();
            }
        });
        return _document.querySelector("body").innerText;
    });

    return {
        key: 'news.google.com',
        data: pageText
    }
}
const cnnbrasil = async (page) => {
    await page.goto("https://www.cnnbrasil.com.br");
    const pageText = await page.evaluate(() => {
        const _document = document;
        [".header__group"
        ,"footer",
        "script",
        "style"
        ].forEach((selector) => {
            for(let e of _document.querySelectorAll(selector)){
                e.remove();
            }
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
            "#header",
            "#footer",
            ".container-panflix-collection",
            ".podcasts-header-home",
            ".container-follow-apps",
            "script",
            "style"

        ].forEach((selector) => {
            for(let e of _document.querySelectorAll(selector)){
                e.remove();
            }
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
                ".open-menu-t360",
                "script",
                "style"
              
            ].forEach((selector) => {
                for(let e of _document.querySelectorAll(selector)){
                    e.remove();
                }
            });

        return _document.querySelector("body").innerText;
    });

    return {
        key: 'terra.com.br',
        data: pageText
    }
}
module.exports = {
    //g1,
    uol,
    cnnbrasil,
    google,
    jovempan,
    terra
}