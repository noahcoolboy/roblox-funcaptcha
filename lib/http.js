let request = require("undici").request

function http(options) {
    return new Promise(a => {
        request(options.url, options).then(async dat => {
            a(Buffer.from(await dat.body.arrayBuffer()))
        })
    })
}

module.exports = http