let fs = require("fs")
let fun = require("./main")
let readline = require("readline")
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

fun.getToken("476068BF-9607-4799-B53D-966BE98E2B81").then(async token => { 
    let captcha = await fun.getFuncaptcha(token)
    console.log(captcha.gameVariant)
    console.log(captcha.breaker)
    
    for(let x = 0; x < captcha.waves; x++) {
        fs.writeFileSync(`${x}.gif`, await captcha.getImage())
        console.log(await captcha.answer(parseInt(await ask("Answer: "))))
    }
    console.log("Done!")
})