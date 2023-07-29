const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('../src/crawl');

test('normalizeURL strip protocol', () => {
    const input = 'https://wagslane.dev/path';
    const actual = normalizeURL(input);
    const expected = 'wagslane.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://wagslane.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'wagslane.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL capitals', () => {
    const input = 'hTtpS://wAgSLane.DEv/path/';
    const actual = normalizeURL(input);
    const expected = 'wagslane.dev/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolute path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://my.website.com/">My Website</a>
    <body>
</html>
`;
    const inputBaseURL = "https://my.website.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://my.website.com/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">My Website Path</a>
    <body>
</html>
`;
    const inputBaseURL = "https://my.website.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://my.website.com/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both absolute and relative path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://my.website.com/path1/">Path1</a>
        <a href="/path2/">Path2</a>
    <body>
</html>
`;
    const inputBaseURL = "https://my.website.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://my.website.com/path1/",
        "https://my.website.com/path2/"
    ];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML with complex HTML structure', () => {
    const inputHTMLBody = `
<html>
    <head>
        <!-- comment -->
        <title>My Website</title>
    </head>
    <body>
        <div>
            <p>
                <a href="/path/to/page/">Nested link</a>
            </p>
            <span> <a href="https://external.site.com/">External link</a></span>
        </div>
        <footer>
            <a href="/footer/">Footer link</a>
        </footer>
    </body>
</html>
`;
    const inputBaseURL = "https://my.website.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://my.website.com/path/to/page/", 
        "https://external.site.com/",
        "https://my.website.com/footer/"
    ];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML with special characters in URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/with?query=parameters&more=parameters#fragment">Link with special characters</a>
    <body>
</html>
`;
    const inputBaseURL = "https://special.characters.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://special.characters.com/path/with?query=parameters&more=parameters#fragment"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">Link with special characters</a>
    <body>
</html>
`;
    const inputBaseURL = "https://my.website.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})