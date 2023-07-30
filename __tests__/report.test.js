const { sortPages } = require('../src/report');

test('sortPages', () => {
    const input = {
        'https://my.example.com/a': 6,
        'https://my.example.com/b': 10,
        'https://my.example.com/c': 3,
        'https://my.example.com/d': 1,
        'https://my.example.com/e': 20,
    };
    const actual = sortPages(input);
    const expected = [
        ['https://my.example.com/e', 20],
        ['https://my.example.com/b', 10],
        ['https://my.example.com/a', 6,],
        ['https://my.example.com/c', 3],
        ['https://my.example.com/d', 1],
    ];
    expect(actual).toEqual(expected);
})