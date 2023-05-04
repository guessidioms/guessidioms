const maxGuess = 5
const highColor = "#FF4500"
const defaultColor = "#555"

var clickedStrokes = []
var idiom = ""
var placeholder = "chars_placeholder"
var currGuess = 0
var isClick = 0

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
    renderMatchedStrokes(idiom, clickedStrokes, placeholder)
}

// hander for the stroke buttons click event
function addStrokeAndRefresh(id, stroke) {
    if (currGuess < maxGuess) {
        if (isClick == 1) {
            document.getElementById("remain_cnt").innerHTML = "剩余竞猜次数:" + Math.max(0, (5 - currGuess));
        }
        isClick = 1
        currGuess += 1
        var btn = document.getElementById(id)
        btn.style.backgroundColor = "#7FFFD4"
        clickedStrokes.push(stroke)
        renderMatchedStrokes(idiom, clickedStrokes, placeholder, matchedColor = defaultColor)
    } else {
        window.alert("已达到笔画最大次数！")
    }
}

// handler for the guess input event
function evalGuess() {
    document.getElementById("remain_cnt").innerHTML = "剩余竞猜次数:" + Math.max(0, (5 - currGuess));
    if (isClick == 0) {
        currGuess += 1
    }
    if (currGuess > maxGuess) {
        window.alert("已达到最大猜测次数！正确答案:" + idiom)
    } else {
        var guess = document.getElementById("guess").value;
        var guessId = "chars_guess" + currGuess
        isClick = 0
        renderMatchedStrokes(guess, clickedStrokes, guessId, highColor, defaultColor)
        if (guess === idiom) {
            window.alert("猜对了!!!! 猜测次数:" + currGuess)
        }
    }
}

// initial
getWordFromUrl()
