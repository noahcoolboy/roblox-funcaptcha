let fun = require("../main")

function isValidImage(image) {
    return image.toString().startsWith("GIF8")
}

fun.getToken("476068BF-9607-4799-B53D-966BE98E2B81").then(async token => {
    if(!token) {
        throw new Error("Invalid token")
    }

    let captcha = await fun.getFuncaptcha(token)

    if(captcha.info.game_data.gameType == 1) {
        throw new Error("Received the ball game! This library only supports the tile game.")
    } else if(captcha.info.game_data.gameType != 3) {
        throw new Error("Received unknown game type: gametype " + captcha.info.game_data.gameType)
    }
    
    if(captcha.gameVariant.startsWith("dice_") || captcha.gameVariant.startsWith("dart") || captcha.gameVariant.startsWith("context-") || ["shadow-icons", "penguins", "shadows", "mismatched-jigsaw", "stairs_walking", "reflection", undefined].includes(captcha.gameVariant)) {
        throw new Error("Detected by Arkose Labs, got gameVariant: " + captcha.gameVariant)
    }

    for(let x = 0; x < captcha.waves; x++) {
        let image = await captcha.getImage()
        if(isValidImage(image)) {
            let answer = await captcha.answer(Math.floor(Math.random() * 6))
            console.log(answer)
            if(!answer || (answer.response == "answered" && captcha.wave < captcha.waves) || (answer.response == "not answered" && captcha.wave >= captcha.waves) || answer.error) {
                throw new Error("Invalid answer API response")
            }
        } else {
            throw new Error("Invalid image")
        }
    }
    console.log("Test passed!")
})
