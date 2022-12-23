const az = 'abcdefghijklmnopqrstuvwxyz'.split('')
const charVals = Object.fromEntries(az.map((c, i) => [c, (i % 9) + 1]))
const vowels = 'aeiou'.split('')

const cleanWord = word => word.toLowerCase().split('').filter(char => az.includes(char)).join('')

const reduceVal = val => {
    if (val == 0) return 0
    const v = `${val}`.split('').map(c => parseInt(c)).reduce((a, b) => a + b)
    return `${v}`.length == 1 ? v : reduceVal(v)
}

const getWordCode = word => {
    const w = cleanWord(word)
    let a = 0
    let b = 0
    for (let i = 0; i < w.length; i++) {
        const char = w[i]
        const v = charVals[char]
        if (vowels.includes(char)) a += v
        else b += v
    }
    a = reduceVal(a)
    b = reduceVal(b)
    let c = reduceVal(a + b)
    return a == 0 || b == 0 ? undefined : [a, b, c].join('')
}

window.addEventListener('DOMContentLoaded', (event) => {
    const wordinput = document.getElementById('wordinput')
    const codeOutput = document.getElementById('codeoutput')
    wordinput.addEventListener('keyup', e => {
        const str = e.target.value
        if (str == '') codeOutput.innerText = 'Code will appear here 👋🏼'
        const code = getWordCode(str)
        if (code != undefined) codeOutput.innerText = `Code for this word is: ${code} 🚀`
    })
});