const USERAGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4692.71 Safari/537.36"

let apiBreakers = {
    "default": (c) => { return { px: (c[0] / 300).toFixed(2), py: (c[1] / 200).toFixed(2), x: c[0], y: c[1] } },
    "method_1": (c) => { return { x: c[1], y: c[0] } },
    "method_2": (c) => { return { x: c[0], y: (c[1] + c[0]) * c[0] } },
    "method_3": (c) => { return { a: c[0], b: c[1] } },
    "method_4": (c) => { return [c[0], c[1]] },
    "method_5": (c) => { return [c[1], c[0]].map(v => Math.sqrt(v)) }
}

function tileToLoc(tile) {
    return [
        tile % 3 * 100 + tile % 3 * 3 + 3 + 10 + Math.floor(Math.random() * 80),
        Math.floor(tile / 3) * 100 + Math.floor(tile / 3) * 3 + 3 + 10 + Math.floor(Math.random() * 80)
    ]
}

function random() {
    return Array(16).fill(0).map(() => "0123456789abcdef"[Math.floor(Math.random()*16)]).join("")
}

let fingerprints = require("./fingerprint")
let murmurHash = require("./fp")
let crypto = require("./crypto")

function get_bda() {
    return new Promise(async a => {
        let fingerprint = fingerprints.getFingerprint()
        
        let bda = [
            {"key":"fe", "value":fingerprint},
            {"key":"ife_hash", "value": murmurHash(fingerprint.join(", "), 38)},
            {"key":"api_type", "value": "js"},
            {"key": "p", "value":1},
            {"key": "f", "value":random()},
            {"key": "n", "value":Buffer.from(Math.round(Date.now() / (1000 - 0)).toString()).toString("base64")},
            {"key": "wh", "value":`${random()}|${random()}`},
            // FINGERPRINTING SHIT MADE ME WANT TO FUCKIN DIE
            {"key": "cs", "value":1},
            {"key": "jsbd", "value": JSON.stringify({
                DA: null,
                DMT: Math.floor(Math.random()*20)+30,
                DR: null,
                DT: "Games - Roblox",
                HL: 4,
                NCE: true,
                NWD: "false"
            })},
        ]

        for(let x = 0; x < fingerprints.baseEnhancedFingerprint.length; x++) {
            bda.push({ key: "enhanced_fp", value: fingerprints.baseEnhancedFingerprint})
        }
        let time = new Date().getTime() / 1000;
        let key = USERAGENT + Math.round(time - time % 21600)
        let encrypted = await crypto.encrypt(JSON.stringify(bda), key)
        a(Buffer.from(encrypted).toString("base64"))
    })
}

module.exports = { apiBreakers, tileToLoc, get_bda, USERAGENT }
