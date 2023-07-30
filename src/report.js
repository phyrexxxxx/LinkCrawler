function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    });
    return pagesArr;
}

function printReport(pages) {
    console.log('=============');
    console.log('START REPORT');
    console.log('=============');
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hit = sortedPage[1];
        console.log(`Found ${hit} internal links to ${url}`);
    }
    console.log('===========');
    console.log('END REPORT');
    console.log('===========');
}

module.exports = {
    sortPages,
    printReport
}