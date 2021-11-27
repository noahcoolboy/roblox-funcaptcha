let fun = require("../main")

function isValidImage(image) {
    return image.toString().startsWith("GIF8")
}

fun.getToken("476068BF-9607-4799-B53D-966BE98E2B81").then(async token => {
    if(!token) {
        throw new Error("Invalid token")
    }

    let captcha = await fun.getFuncaptcha(token)
    for(let x = 0; x < captcha.waves; x++) {
        let image = await captcha.getImage()
        if(isValidImage(image)) {
            let answer = await captcha.answer(Math.floor(Math.random() * 6))
            if(!answer || (answer.response == "answered" && captcha.wave < captcha.waves) || (answer.response == "not answered" && captcha.wave >= captcha.waves)) {
                throw new Error("Invalid answer API response")
            }
        } else {
            throw new Error("Invalid image")
        }
    }
    console.log("Test passed!")
})