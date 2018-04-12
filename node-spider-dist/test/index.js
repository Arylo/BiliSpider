import test from 'ava';

const { process, setMock } = require('../client');
const mock = setMock(require('superagent-mocker'));

mock.get("http://45.32.68.44:16123/getPackage", (req) => {
    const body = { 'success': true, 'pid': 1234 };
    return {
        body, text: JSON.stringify(body)
    };
});

test('Default', async (t) => {
    let startTime;
    mock.get("http://api.bilibili.com/x/web-interface/card?mid=:mid", (req) => {
        const body = require('./user-info.json');
        return {
            body, text: JSON.stringify(body)
        };
    });
    mock.post("http://45.32.68.44:16123/uploadPackage", (req) => {
        const body = {
            pid: req.body.pid,
            package: JSON.parse(req.body.package)
        };
        t.is(body.pid, 1234);
        t.is(body.package.length, 1000);
        t.true((Date.now() - startTime) >= 150 * 1000);
        return { };
    });
    startTime = Date.now();
    await process();
});
