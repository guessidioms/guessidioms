var clickedStrokes = []
var idiom = ""
var placeholder = "chars_placeholder"
var currGuess = 0
const maxGuess = 5
getWordFromUrl().then(renderGuess(4, maxGuess))

function codeToWord(code) {
    var bytes = []
    var n = code.length
    for(var i = 0; i < n; i += 2) {
        var x = code.substr(i, 2)
        bytes.push(parseInt(x, 16))
    }
    return new TextDecoder().decode(Uint8Array.from(bytes))
}

async function getWordFromUrl() {
    var searchStr = window.location.search
    var params = new URLSearchParams(searchStr)
    if(params.get("code")) {
        idiom = codeToWord(params.get("code"))
    } else {
        var idiomsResponse = await fetch('static/idioms_reviewed.txt')
        if (idiomsResponse.status !== 200) {
            console.log('Fail to fetch idioms, Status Code: ' + idiomsResponse.status);
        }
        var idiomsData = await idiomsResponse.text()
        var idiomsArray = idiomsData.split("\n")
        var index = Math.floor(Math.random() * idiomsArray.length)
        idiom = idiomsArray[index]
    }
    renderMatchedStrokes(idiom, clickedStrokes, placeholder)
}

async function renderGuess(charNum, guessNum) {
    for (var guess = 1; guess <= guessNum; guess++) {
        var id = "chars_guess" + guess
        var target = document.getElementById(id)
        for (var i = 0; i < charNum; i++) {
            var cell = document.createElement("td")
            var cellId = id + "_" + i
            cell.setAttribute("id", cellId)
            fillInCellWithSvg(cell)
            target.appendChild(cell)
        }    
    }
}

function fillInCellWithSvg(cell) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '75px';
    svg.style.height = '75px';
    svg.style.border = '1px solid #EEE'
    svg.style.marginRight = '3px'
    cell.appendChild(svg);
    return svg
}

function renderFanningStrokes(target, strokes) {
    var svg = fillInCellWithSvg(target)
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(group);

    // set the transform property on the g element so the character renders at 75x75
    var transformData = HanziWriter.getScalingTransform(75, 75);
    group.setAttributeNS(null, 'transform', transformData.transform);

    strokes.forEach(function(strokePath) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', strokePath);
        // style the character paths
        path.style.fill = '#555';
        group.appendChild(path);
    });
}

function renderStrokes(chars, strokes, id) {
    var target = document.getElementById(id);
    function renderChar (i, cellId) {
        var thisStrokes = strokes[i]
        var thisChar = chars[i]
        var strokeName = cnchar.stroke(thisChar, 'order')[0];
        HanziWriter.loadCharacterData(thisChar).then(function(charData) {
            if(strokeName.length != charData.strokes.length) {
                alert("inner data mismatch, stroke name length != char data length")
                return
            }
            var target = document.getElementById(cellId);
            var toRender = []
            for (var i = 0; i < charData.strokes.length; i++) {
                if(thisStrokes.includes(strokeName[i])) {
                    toRender.push(charData.strokes[i])
                }
            }
            renderFanningStrokes(target, toRender);
        });            
    }
    while(target.firstChild) {
        target.removeChild(target.firstChild)
    }
    for (var i = 0; i < chars.length; i++) {
        var cell = document.createElement("td")
        var cellId = id + "_" + i
        cell.setAttribute("id", cellId)
        target.appendChild(cell)
        renderChar(i, cellId)
    }
}

function renderMatchedStrokes(chars, strokes, id) {
    var strokesEachChar = []
    for(var i = 0; i < chars.length; i++) {
        strokesEachChar.push(strokes)
    }
    renderStrokes(chars, strokesEachChar, id)
}

function addStrokeAndRefresh(stroke) {
    clickedStrokes.push(stroke)
    renderMatchedStrokes(idiom, clickedStrokes, placeholder)
}

function evalGuess() {
    var guess=document.getElementById("guess").value;
    if (guess === idiom) {
        window.alert("Bingo!!!! Guess NUM:"+clickedStrokes.length)
    } else {
        currGuess++
        if (currGuess > maxGuess) {
            window.alert("已达到最大猜测次数！")
        } else {
            var guessId = "chars_guess" + currGuess
            renderMatchedStrokes(guess, clickedStrokes, guessId)
        }
    }
}
