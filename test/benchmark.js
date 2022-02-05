let fun = require("../main")

console.time("Full captcha")
console.time("Get token")
fun.getToken("476068BF-9607-4799-B53D-966BE98E2B81").then(async token => {
    console.timeEnd("Get token")
    console.time("Get captcha")
    let captcha = await fun.getFuncaptcha(token)
    console.timeEnd("Get captcha")

    for (let x = 0; x < captcha.waves; x++) {
        console.time(`Wave ${x}`)
        console.time("Get image")
        let image = await captcha.getImage()
        console.timeEnd("Get image")
        console.time("Answer")
        let answer = await captcha.answer(Math.floor(Math.random() * 6))
        console.timeEnd("Answer")
        console.timeEnd(`Wave ${x}`)
    }
    console.timeEnd("Full captcha")
})
