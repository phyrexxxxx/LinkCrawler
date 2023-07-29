const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    try {
        const response = await fetch(currentURL);
        
        if (response.status > 399) {
            console.log(`Error in fetch with status code: ${response.status} on page: ${currentURL}`);
            return;
        }
        
        const contentType = response.headers.get('Content-Type');
        if (!contentType.includes('text/html')) {
            console.log(`Non-HTML response, content type: ${contentType} on page: ${currentURL}`);
            return;
        }
        
        console.log(await response.text());
    } catch (err) {
        console.log(err.message);
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');
    for (const aElement of aElements) {
        let href = aElement.href;

        try {
            // ? relative path : absolute path OR invalid path
            const urlObj = (href.startsWith('/')) ? new URL(href, baseURL) : new URL(href);
            urls.push(urlObj.href);
        } catch (err) {
            console.log(err.message);
        }
    }
    return urls;
}

function normalizeURL(url) {
    if (url.length > 0 && url.slice(-1) === '/') {
        url = url.slice(0, -1);
    }
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname}`;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};