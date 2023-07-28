const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('../src/crawl');

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