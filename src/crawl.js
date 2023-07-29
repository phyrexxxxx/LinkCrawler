const { JSDOM } = require('jsdom');

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
    getURLsFromHTML
};