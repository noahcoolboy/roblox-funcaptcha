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
        let fingerprint = fingerprints()

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
            })}
        ]

        //let bda = [{"key":"api_type","value":"js"},{"key":"p","value":1},{"key":"f","value":"9e86b6963d05b3e0462c9acb5fe736f0"},{"key":"n","value":"MTY0NDA2NTUxNg=="},{"key":"wh","value":"d3e9d25ad75ba09b9ea4e945f579f18d|72627afbfd19a741c7da1732218301ac"},{"value":["DNT:1","L:en-US","D:24","PR:1.75","S:2195,1235","AS:2195,1195","TO:-60","SS:true","LS:true","IDB:true","B:false","ODB:true","CPUC:unknown","PK:Win32","CFP:-1481757067","FR:false","FOS:false","FB:false","JSF:Arial,Arial Black,Arial Narrow,Book Antiqua,Bookman Old Style,Calibri,Cambria,Cambria Math,Century,Century Gothic,Century Schoolbook,Comic Sans MS,Consolas,Courier,Courier New,Garamond,Georgia,Helvetica,Impact,Lucida Bright,Lucida Calligraphy,Lucida Console,Lucida Fax,Lucida Handwriting,Lucida Sans,Lucida Sans Typewriter,Lucida Sans Unicode,Microsoft Sans Serif,Monotype Corsiva,MS Gothic,MS PGothic,MS Reference Sans Serif,MS Sans Serif,MS Serif,Palatino Linotype,Segoe Print,Segoe Script,Segoe UI,Segoe UI Light,Segoe UI Semibold,Segoe UI Symbol,Tahoma,Times,Times New Roman,Trebuchet MS,Verdana,Wingdings,Wingdings 2,Wingdings 3","P:Chrome PDF Plugin,Chrome PDF Viewer,Native Client","T:0,false,false","H:24","SWF:false"],"key":"fe"},{"key":"ife_hash","value":"d942e444b3c5997567c0f6d5f403b48e"},{"value":1,"key":"cs"},{"key":"jsbd","value":"{\"HL\":8,\"NCE\":true,\"DT\":\"Roblox\",\"NWD\":\"false\",\"DA\":null,\"DR\":null,\"DMT\":20,\"DO\":null,\"DOT\":20}"}]

        let time = new Date().getTime() / 1000;
        let key = USERAGENT + Math.round(time - time % 21600)
        let encrypted = await crypto.encrypt(JSON.stringify(bda), key)
        a(Buffer.from(encrypted).toString("base64"))
    })
}

module.exports = { apiBreakers, tileToLoc, get_bda, USERAGENT }
