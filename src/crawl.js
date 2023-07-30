const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);

        // We only want to crawl the same domain of baseURL, not the entire internet
        if (baseURLObj.hostname !== currentURLObj.hostname) {
            return pages;
        }

        const currentNormalizeURL = normalizeURL(currentURL);
        if (pages[currentNormalizeURL] > 0) { // already crawled
            pages[currentNormalizeURL]++;
            return pages;
        }
        pages[currentNormalizeURL] = 1;

        console.log(`Actively crawling ${currentURL}`);
        const response = await fetch(currentURL);

        if (response.status > 399) {
            console.log(`Error in fetch with status code: ${response.status} on page: ${currentURL}`);
            // return;
            return pages;
        }
        
        const contentType = response.headers.get('Content-Type');
        if (!contentType.includes('text/html')) {
            console.log(`Non-HTML response, content type: ${contentType} on page: ${currentURL}`);
            // return;
            return pages;
        }
        
        currentHTMLBody = await response.text();
        nextURLs = getURLsFromHTML(currentHTMLBody, baseURL);
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }

    } catch (err) {
        console.log(err.message);
    }
    return pages;
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