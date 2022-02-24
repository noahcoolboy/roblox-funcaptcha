class Session {
    api = require("./api") // Horrible way of doing this
    crypto = require("./crypto")
    http = require("./http")
    util = require("./util")
    constructor(captchaInfo, originalToken) {
        this.info = captchaInfo
        this.token = captchaInfo.session_token
        this.challengeId = captchaInfo.challengeID
        this.gameVariant = captchaInfo.game_data.game_variant
        this.gameType = captchaInfo.game_data.gameType
        this.encrypted = captchaInfo.game_data.customGUI.encrypted_mode
        this.imgs = captchaInfo.game_data.customGUI._challenge_imgs
        this.breaker = captchaInfo.game_data.customGUI.api_breaker || "default"
        this.waves = captchaInfo.game_data.waves
        this.key = ""
        this.wave = 0
        this.answer_history = []
        this.originalToken = originalToken

        // Preload images
        this.imgs = this.imgs.map(i => this.http({url: i}))
    }

    getImage() {
        return new Promise(async a => {
            let img = await this.imgs[this.wave]
            try {
                JSON.parse(img) // Image is encrypted
                if (this.key == "") {
                    this.key = await this.api.getDecryptionKey(this.info)
                    this.key = JSON.parse(this.key).decryption_key
                }
                img = await this.crypto.decrypt(img, this.key)
                img = Buffer.from(img.toString(), "base64")
            } catch (err) {
                // Image is not encrypted
                // All good!
            }
            a(img)
        })
    }

    answer(answer) {
        return new Promise(async a => {
            let pos = this.util.tileToLoc(answer)
            this.answer_history.push(this.util.apiBreakers[this.breaker](pos))
            let encrypted = await this.crypto.encrypt(JSON.stringify(this.answer_history), this.token)
            let resp = await this.http({
                url: "https://roblox-api.arkoselabs.com/fc/ca/", 
                body: this.util.constructFormData({
                    session_token: this.token,
                    game_token: this.challengeId,
                    guess: encrypted
                }),
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            resp = JSON.parse(resp)
            this.key = resp.decryption_key || ""
            this.wave++
            a(resp)
        })
    }

}

module.exports = Session