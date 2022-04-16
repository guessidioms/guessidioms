function wordToCode(word) {
    var codes = []
    var bytes = new TextEncoder().encode(word)
    for(const x of bytes) {
        codes.push(("0" + x.toString(16)).slice(-2))
    }
    return codes.join("")
}

function generateUrl() {
    var input = document.getElementById("input_word")
    var word = input.value
    var code = wordToCode(word)
    var urlBase = location.protocol + '//' + location.host + location.pathname
    var url = urlBase + "?code=" + code
    input.value = url
}