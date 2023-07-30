const { crawlPage } = require('./src/crawl');

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Please provide exactly one argument: the baseURL to start the crawl');
        process.exit(1); // exit with error status code
    }
    const baseURL = args[0];
    console.log(`Starting the crawler at baseURL: ${baseURL}`);
    
    const pages = await crawlPage(baseURL, baseURL, {});
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main();
