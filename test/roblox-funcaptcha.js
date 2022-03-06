let fun = require("../main")

function isValidImage(image) {
    return image.toString().startsWith("GIF8")
}

async function test(publicKey, name) {
    console.log("Testing key for " + name)
    let token = await fun.getToken(publicKey)
    if(!token) {
        throw new Error("Invalid token")
    }

    if(token.token.includes("sup=1")) {
        console.log("Supressed captcha!")
        return
    }

    let captcha = await fun.getFuncaptcha(token)

    if(captcha.info.game_data.gameType == 1) {
        throw new Error("Received the ball game! This library only supports the tile game.")
    } else if(captcha.info.game_data.gameType != 3) {
        throw new Error("Received unknown game type: gametype " + captcha.info.game_data.gameType)
    }
    
    if(captcha.gameVariant.startsWith("dice_") || captcha.gameVariant.startsWith("dart") || captcha.gameVariant.startsWith("context-") || ["shadow-icons", "penguins", "shadows", "mismatched-jigsaw", "stairs_walking", "reflection", "card", undefined].includes(captcha.gameVariant)) {
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
    console.log("Test passed for " + name + "!")
}

setImmediate(async () => {
    await test("476068BF-9607-4799-B53D-966BE98E2B81", "Login")
    await test("A2A14B1D-1AF3-C791-9BBC-EE33CC7A0A6F", "Signup")
    await test("63E4117F-E727-42B4-6DAA-C8448E9B137F", "Group Join")
    await test("1B154715-ACB4-2706-19ED-0DC7E3F7D855", "Promocode Redeem")
})
