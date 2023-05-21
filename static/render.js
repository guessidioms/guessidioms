function createInput(inputId = "guessInput") {
    var parentTrId = "chars_guess" + (currGuess + 1)
    var parentTr = document.getElementById(parentTrId);
    // clean the tr element
    while (parentTr.firstChild) {
        parentTr.removeChild(parentTr.firstChild)
    }

    var input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.style.width = '318px';
    input.style.height = '79px';
    input.style.fontSize = '75px';
    input.style.textAlign = 'center';
    input.style.border = '1px solid #EEE'
    input.style.margin = '0px';
    input.style.padding = '0px';
    input.style.fontFamily = 'fangzheng-kaiti';
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


// render the strokes of a character with colors for each stroke
function renderFanningStrokes(svgGroup, strokes, colors) {
    // set the transform property on the g element so the character renders at 75x75
    var transformData = HanziWriter.getScalingTransform(75, 75);
    svgGroup.setAttributeNS(null, 'transform', transformData.transform);

    for (var i = 0; i < strokes.length; i++) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', strokes[i]);
        // style the character paths
        path.style.fill = colors[i];
        svgGroup.appendChild(path);
    }
}

// render a word with different colors for matched strokes and unmatched strokes
function renderMatchedStrokes(chars, matchedStrokes, rowId, matchedColor = null, unmatchedColor = null) {
    function renderChar(i, svgGroup) {
        var thisChar = chars[i]
        var strokeName = cnchar.stroke(thisChar, 'order')[0];
        HanziWriter.loadCharacterData(thisChar).then(function (charData) {
            if (strokeName.length != charData.strokes.length) {
                alert("inner data mismatch, stroke name length != char data length")
                return
            }
            var strokes = []
            var colors = []
            for (var i = 0; i < charData.strokes.length; i++) {
                var thisStroke = charData.strokes[i]
                var strokeMatched = matchedStrokes.includes(strokeName[i])
                if (strokeMatched && matchedColor) {
                    strokes.push(thisStroke)
                    colors.push(matchedColor)
                }
                if (!strokeMatched && unmatchedColor) {
                    strokes.push(thisStroke)
                    colors.push(unmatchedColor)
                }
            }
            renderFanningStrokes(svgGroup, strokes, colors);
        });
    }
    var row = document.getElementById(rowId);
    // if the row contains only one cell, clean it's all children
    // this should be the input textbox
    if (row.childElementCount == 1) {
        while (row.firstChild) {
            row.removeChild(row.firstChild)
        }
    }
    for (var i = 0; i < chars.length; i++) {
        var svgGroup = document.getElementById(rowId + "_" + i + "_g")
        // if svgGroup is not created, create it
        if (!svgGroup) {
            var cell = document.createElement("td")
            var cellId = rowId + "_" + i
            cell.setAttribute("id", cellId)
            row.appendChild(cell)

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.width = '75px';
            svg.style.height = '75px';
            svg.style.border = '1px solid #EEE'
            svg.setAttribute("id", cellId + "_svg")
            cell.appendChild(svg);
        
            svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.setAttribute("id", cellId + "_g")
            svg.appendChild(svgGroup);
        } else {
            // clean the svg group
            while (svgGroup.firstChild) {
                svgGroup.removeChild(svgGroup.firstChild)
            }
        }
        renderChar(i, svgGroup)
    }
}
