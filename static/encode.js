export function wordToCode(word) {
    var codes = []
    var bytes = new TextEncoder().encode(word)
    for(const x of bytes) {
        codes.push(("0" + x.toString(16)).slice(-2))
    }
    return codes.join("")
}
