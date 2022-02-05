let crypto = require("crypto")
let http = require("./http")
let md5 = crypto.createHash("md5")

function encrypt(data, key) {
    return new Promise(a => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"

        let salt = ""
        let salted = ""
        let dx = ""

        salt = Array(8).fill(0).map(v => alphabet[Math.floor(Math.random() * alphabet.length)]).join("")  // 8 random letters
        data = data + Array(17 - data.length % 16).join(String.fromCharCode(16 - data.length % 16)) // Padding (pkcs7?)
        
        for (let x = 0; x < 3; x++) {
            dx = md5.update(Buffer.concat([
                Buffer.from(dx),
                Buffer.from(key),
                Buffer.from(salt)
            ])).digest()

            salted += dx.toString("hex")
            md5 = crypto.createHash("md5")
        }

        salted = Buffer.from(salted, "hex")
        key = salted.slice(0, 32)
        iv = salted.slice(32, 32 + 16)

        let aes = crypto.createCipheriv("aes-256-cbc", key, iv)
        aes.setAutoPadding(false)
        aes.write(Buffer.from(data))
        aes.end()

        let final = Buffer.alloc(0)

        aes.on("data", (buf)=>{
            final = Buffer.concat([final, buf])
        })
        aes.on("end", () => {
            a(JSON.stringify({
                "ct": final.toString("base64"),
                "iv": iv.toString("hex"),
                "s": Buffer.from(salt).toString("hex")
            }))
        })
    })
}

function decrypt(data, key) {
    return new Promise(a => {
        data = JSON.parse(data)

        let dk = Buffer.concat([
            Buffer.from(key),
            Buffer.from(data.s, "hex")
        ])
        
        let md5 = crypto.createHash("md5")
        let arr = [Buffer.from(md5.update(dk).digest()).toString("hex")]
        let result = arr[0]

        for (let x = 1; x < 3; x++) {
            md5 = crypto.createHash("md5")
            arr.push(Buffer.from(md5.update(Buffer.concat([Buffer.from(arr[x - 1], "hex"), dk])).digest()).toString("hex"))
            result += arr[x]
        }
        
        //console.log("Key:", Buffer.from(result,"hex").slice(0, 32).toString("hex"))
        //console.log("IV:", Buffer.from(data.iv,"hex").toString("hex"))
        //console.log("Data:", Buffer.from(data.ct,"base64").toString("hex"))
        
        
        let aes = crypto.createDecipheriv("aes-256-cbc", Buffer.from(result,"hex").slice(0, 32), Buffer.from(data.iv,"hex"))
        aes.write(Buffer.from(data.ct, "base64"))
        aes.end()
        let finalData = Buffer.alloc(0)
        aes.on("data",(buf)=>{
            //console.log(aes.read().toString("ascii"))
            finalData = Buffer.concat([finalData, buf])
        })
        aes.on("end", ()=>{
            a(finalData)
        })
    })
}
module.exports = { encrypt, decrypt }