let request = require("phin")

function http(options) {
    return new Promise(a => {
        request(options).then(dat => {
            a(dat.body)
        })
    })
}

module.exports = http