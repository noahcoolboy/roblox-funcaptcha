const baseFingerprint = [
    "DNT:1", // Do not track On/Off
    "L:en-US", // Browser language
    "D:24", // Screen color depth (in bits)
    "PR:1", // Pixel ratio
    "S:1920,1200", // Screen resolution
    "AS:1920,1160", // Available screen resolution
    "TO:9999", // Timezone offset
    "SS:true", // Screen orientation (landscape/portrait)
    "LS:true", // Local storage available
    "IDB:true", // IndexedDB available
    "B:false", // addBehaviour support
    "ODB:true", // OpenDatabase support
    "CPUC:unknown", // CPU Class
    "PK:Win32", // Platform
    "CFP:-1481757067", // Canvas fingerprint (if canvas is supported)
    "FR:false", // Fake screen resolution?
    "FOS:false", // Fake OS?
    "FB:false", // Fake Browser?
    "JSF:Arial,Arial Black,Lucida Sans Typewriter,Lucida Sans Unicode,Microsoft Sans Serif,Monotype Corsiva,MS Gothic,MS PGothic,MS Reference Sans Serif,MS Sans Serif,MS Serif,Palatino Linotype,Segoe Print,Segoe Script,Segoe UI,Segoe UI Light,Segoe UI Semibold,Segoe UI Symbol,Tahoma,Times,Times New Roman,Trebuchet MS,Verdana,Wingdings,Wingdings 2,Wingdings 3", // Available fonts
    "P:Chrome PDF Plugin,Chrome PDF Viewer,Native Client", // Plugins
    "T:0,false,false", // Touch screen (maxTouchPoints, TouchEvent event listener support, ontouchstart support)
    "H:24", // Cpu threads
    "SWF:false" // Flash support
]

const languages = ["af","af-ZA","ar","ar-AE","ar-BH","ar-DZ","ar-EG","ar-IQ","ar-JO","ar-KW","ar-LB","ar-LY","ar-MA","ar-OM","ar-QA","ar-SA","ar-SY","ar-TN","ar-YE","az","az-AZ","az-AZ","be","be-BY","bg","bg-BG","bs-BA","ca","ca-ES","cs","cs-CZ","cy","cy-GB","da","da-DK","de","de-AT","de-CH","de-DE","de-LI","de-LU","dv","dv-MV","el","el-GR","en","en-AU","en-BZ","en-CA","en-CB","en-GB","en-IE","en-JM","en-NZ","en-PH","en-TT","en-US","en-ZA","en-ZW","eo","es","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-ES","es-ES","es-GT","es-HN","es-MX","es-NI","es-PA","es-PE","es-PR","es-PY","es-SV","es-UY","es-VE","et","et-EE","eu","eu-ES","fa","fa-IR","fi","fi-FI","fo","fo-FO","fr","fr-BE","fr-CA","fr-CH","fr-FR","fr-LU","fr-MC","gl","gl-ES","gu","gu-IN","he","he-IL","hi","hi-IN","hr","hr-BA","hr-HR","hu","hu-HU","hy","hy-AM","id","id-ID","is","is-IS","it","it-CH","it-IT","ja","ja-JP","ka","ka-GE","kk","kk-KZ","kn","kn-IN","ko","ko-KR","kok","kok-IN","ky","ky-KG","lt","lt-LT","lv","lv-LV","mi","mi-NZ","mk","mk-MK","mn","mn-MN","mr","mr-IN","ms","ms-BN","ms-MY","mt","mt-MT","nb","nb-NO","nl","nl-BE","nl-NL","nn-NO","ns","ns-ZA","pa","pa-IN","pl","pl-PL","ps","ps-AR","pt","pt-BR","pt-PT","qu","qu-BO","qu-EC","qu-PE","ro","ro-RO","ru","ru-RU","sa","sa-IN","se","se-FI","se-FI","se-FI","se-NO","se-NO","se-NO","se-SE","se-SE","se-SE","sk","sk-SK","sl","sl-SI","sq","sq-AL","sr-BA","sr-BA","sr-SP","sr-SP","sv","sv-FI","sv-SE","sw","sw-KE","syr","syr-SY","ta","ta-IN","te","te-IN","th","th-TH","tl","tl-PH","tn","tn-ZA","tr","tr-TR","tt","tt-RU","ts","uk","uk-UA","ur","ur-PK","uz","uz-UZ","uz-UZ","vi","vi-VN","xh","xh-ZA","zh","zh-CN","zh-HK","zh-MO","zh-SG","zh-TW","zu","zu-ZA"];

// Get fingerprint
module.exports = function() {
    let fingerprint = [...baseFingerprint] // Create a copy of the base fingerprint

    // Randomization time!
    fingerprint[0] = `DNT:${Math.round(Math.random())}`
    fingerprint[1] = `L:${languages[Math.floor(Math.random() * languages.length)]}`
    fingerprint[2] = `D:${[1, 4, 8, 15, 16, 24, 32, 48][Math.floor(Math.random() * 8)]}`
    fingerprint[3] = `PR:${Math.random() * 2 + 0.5}`
    fingerprint[4] = `S:${Math.floor(Math.random() * 1920)}x${Math.floor(Math.random() * 1200)}`
    fingerprint[5] = `AS:${Math.floor(Math.random() * 1920)}x${Math.floor(Math.random() * 1200)}`
    fingerprint[6] = `TO:${Math.floor(Math.random() * 1440)}`
    fingerprint[7] = `SS:${Math.random() > 0.5}`
    fingerprint[8] = `LS:${Math.random() > 0.5}`
    fingerprint[9] = `IDB:${Math.random() > 0.5}`
    fingerprint[10] = `B:${Math.random() > 0.5}`
    fingerprint[11] = `ODB:${Math.random() > 0.5}`
    fingerprint[12] = `CPUC:${["68K", "Alpha", "PPC", "x86", "Other", "unknown"][Math.floor(Math.random() * 5)]}`
    fingerprint[13] = `PK:${["HP-UX", "Mac68K", "MacPPC", "SunOS", "Win16", "Win32", "WinCE"][Math.floor(Math.random() * 7)]}`
    fingerprint[14] = fingerprint[14] // We can't really randomise this
    fingerprint[15] = `FR:${Math.random() > 0.5}`
    fingerprint[16] = `FOS:${Math.random() > 0.5}`
    fingerprint[17] = `FB:${Math.random() > 0.5}`
    fingerprint[19] = `JSF:${fingerprint[19].slice(4).split(",").filter(x => Math.random() > 0.5).join(",")}`
    fingerprint[20] = `P:${fingerprint[20].slice(4).split(",").filter(x => Math.random() > 0.5).join(",")}`
    fingerprint[21] = `T:${Math.floor(Math.random() * 8)},${Math.random() > 0.5},${Math.random() > 0.5}`
    fingerprint[22] = `H:${2**Math.floor(Math.random() * 6)}`
    fingerprint[23] = fingerprint[23] // RIP Flash

    return fingerprint
}