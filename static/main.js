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
        for(var j = 0; j < idiom.length; j++) {
            // add a event listener to all the td elements
            var tdId = "chars_guess" + i + "_" + j
            var td = document.getElementById(tdId)
            td.addEventListener('click', function (event) {
                // check if it's a double click
                // if (event.detail === 2) {
                //     createInput()
                // }
                createInput()
            })
        }
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
function evalGuess(inputId="guess") {
    if (currGuess < maxGuess) {
        currGuess += 1
        var guess = document.getElementById(inputId).value;
        var guessId = "chars_guess" + currGuess
        renderMatchedStrokes(guess, clickedStrokes, guessId, highColor, defaultColor)
        if (guess === idiom) {
            window.alert("猜对了!!!! 猜测次数:" + currGuess)
        }
    } else {
        window.alert("已达到最大猜测次数！正确答案:" + idiom)
    }
}

function createInput(inputId="guessInput") {
    var parentTrId = "chars_guess" + (currGuess + 1)
    var parentTr = document.getElementById(parentTrId);
    // clean the tr element
    while (parentTr.firstChild) {
        parentTr.removeChild(parentTr.firstChild)
    }
    
    var input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.style.width = '340px';
    input.style.height = '75px';
    input.style.fontSize = '75px';
    input.style.textAlign = 'center';
    input.style.border = '1px solid #EEE'
    // put the input into a td
    var td = document.createElement('td');
    td.appendChild(input);
    // let the td take whole row
    td.setAttribute("colspan", "4");

    // add an event listener when the user press enter
    input.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            evalGuess(inputId);
        }
    });
    
    // put the input into the tr
    parentTr.appendChild(td);
    return input;
}

// initial
getWordFromUrl()
