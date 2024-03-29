const maxGuess = 5
const highColor = "#0A0"
const defaultColor = "#555"
const buttonClickedColor = "#D0FFD0"

const totalGameCountKey = "total-game-count"
const successGameCountKey = "success-game-count"
const totalGuessCountKey = "total-guess-count"

var clickedStrokes = []
var idiom = ""
var currGuess = 0

// hander for the stroke buttons click event
function addStroke(id, stroke) {
    if (currGuess < maxGuess - 1) {
        currGuess += 1
        var btn = document.getElementById(id)
        btn.style.backgroundColor = buttonClickedColor
        // disable the button
        btn.disabled = true
        clickedStrokes.push(stroke)
        var guessId = "chars_guess" + currGuess
        renderMatchedStrokes(idiom, clickedStrokes, guessId, matchedColor = defaultColor)
    } else {
        window.alert("已达到笔画最大次数！")
    }
}

// handler for the guess input event
function evalGuess(inputId = "guess") {
    if (currGuess < maxGuess) {
        currGuess += 1
        var guess = document.getElementById(inputId).value;
        var guessId = "chars_guess" + currGuess
        renderMatchedStrokes(guess, clickedStrokes, guessId, highColor, defaultColor)
        if (guess === idiom) {
            window.alert("猜对了!!!! 猜测次数:" + currGuess)
            updateCountStorage(successGameCountKey, 1)
            updateCountStorage(totalGuessCountKey, currGuess)
            updateAllStatCountElement()
        } else if (currGuess == maxGuess) {
            window.alert("已达到最大猜测次数！正确答案:" + idiom)
        }
    } else {
        window.alert("已达到最大猜测次数！正确答案:" + idiom)
    }
}

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

function updateCountStorage(key, delta) {
    var count = localStorage.getItem(key)
    if (count) {
        count = parseInt(count) + delta
    } else {
        count = delta
    }
    localStorage.setItem(key, count)
}

function updateCountElement(key) {
    var count = localStorage.getItem(key)
    if (count) {
        document.getElementById(key).innerHTML = count
    } else {
        document.getElementById(key).innerHTML = "0"
    }
}

function updateAverageGuessElement() {
    var totalGuessCount = localStorage.getItem(totalGuessCountKey)
    var successGameCount = localStorage.getItem(successGameCountKey)
    if (totalGuessCount && successGameCount) {
        var averageGuess = totalGuessCount / successGameCount
        document.getElementById("average-guess").innerHTML = averageGuess.toFixed(2)
    } else {
        document.getElementById("average-guess").innerHTML = "0"
    }
}

function updateAllStatCountElement() {
    updateCountElement(totalGameCountKey)
    updateCountElement(successGameCountKey)
    updateAverageGuessElement()
}

// initialization
(async function () {
    // get word from the url or randomly generate a word if the url donot contains "code"
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

    // create the block grid
    for (var i = 1; i <= maxGuess; i++) {
        renderMatchedStrokes(idiom, clickedStrokes, "chars_guess" + i)
        for (var j = 0; j < idiom.length; j++) {
            // add a event listener to all the td elements
            var tdId = "chars_guess" + i + "_" + j
            var td = document.getElementById(tdId)
            td.addEventListener('click', createInput)
        }
    }

    updateCountStorage(totalGameCountKey, 1)
    updateAllStatCountElement()
})()
