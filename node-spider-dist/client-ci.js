const { once, nowstr } = require("./spider");

(async () => {
    console.log(nowstr() + " Start to fetch member info.")
    await once();
    console.log(nowstr() + ` End fetch.`);
})()