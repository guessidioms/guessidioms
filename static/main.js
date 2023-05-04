const maxGuess = 5
const highColor = "#FF4500"
const defaultColor = "#555"
const buttonClickedColor = "#7FFFD4"

var clickedStrokes = []
var idiom = ""
var currGuess = 0

// convert a hex string to a word
function codeToWord(code) {
    var bytes = []
    var n = code.length
    for (var i = 0; i < n; i += 2) {
        var x = code.substr(i, 2)
        bytes.push(parseInt(x, 16))
    }
    return new TextDecoder().decode(Uint8Array.from(bytes))
}

// get word from the url or randomly generate a word if the url donot contains "code"
async function getWordFromUrl() {
    var searchStr = window.location.search
    var params = new URLSearchParams(searchStr)
    if (params.get("code")) {
        idiom = codeToWord(params.get("code"))
    } else {
        var idiomsResponse = await fetch('static/idioms_reviewed.html')
        if (idiomsResponse.status !== 200) {
            console.log('Fail to fetch idioms, Status Code: ' + idiomsResponse.status);
        }
        var idiomsData = await idiomsResponse.text()
        var idiomsArray = idiomsData.split("\n")
        var index = Math.floor(Math.random() * idiomsArray.length)
        idiom = codeToWord(idiomsArray[index])
    }
    for(var i = 1; i <= maxGuess; i++) {
        renderMatchedStrokes(idiom, clickedStrokes, "chars_guess" + i)
    }
}

// hander for the stroke buttons click event
function addStrokeAndRefresh(id, stroke) {
    if (currGuess < maxGuess) {
        currGuess += 1
        var btn = document.getElementById(id)
        btn.style.backgroundColor = buttonClickedColor
        clickedStrokes.push(stroke)
        var guessId = "chars_guess" + currGuess
        renderMatchedStrokes(idiom, clickedStrokes, guessId, matchedColor = defaultColor)
    } else {
        window.alert("已达到笔画最大次数！")
    }
}

// handler for the guess input event
function evalGuess() {
    if (currGuess < maxGuess) {
        currGuess += 1
        var guess = document.getElementById("guess").value;
        var guessId = "chars_guess" + currGuess
        renderMatchedStrokes(guess, clickedStrokes, guessId, highColor, defaultColor)
        if (guess === idiom) {
            window.alert("猜对了!!!! 猜测次数:" + currGuess)
        }
    } else {
        window.alert("已达到最大猜测次数！正确答案:" + idiom)
    }
}

// initial
getWordFromUrl()
