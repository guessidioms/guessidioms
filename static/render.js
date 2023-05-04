// fill the cell with an empty svg cell
function fillInCellWithSvg(cell) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '75px';
    svg.style.height = '75px';
    svg.style.border = '1px solid #EEE'
    svg.style.marginRight = '3px'
    cell.appendChild(svg);
    return svg
}

// render the strokes of a character with colors for each stroke
function renderFanningStrokes(target, strokes, colors) {
    var svg = fillInCellWithSvg(target)
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(group);

    // set the transform property on the g element so the character renders at 75x75
    var transformData = HanziWriter.getScalingTransform(75, 75);
    group.setAttributeNS(null, 'transform', transformData.transform);

    for (var i = 0; i < strokes.length; i++) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', strokes[i]);
        // style the character paths
        path.style.fill = colors[i];
        group.appendChild(path);

    }
}

// render a word with different colors for matched strokes and unmatched strokes
// similiar with renderMatchedStrokes, but this function can render different strokes for each character
function renderEachMatchedStrokes(chars, strokes, id, matchedColor = null, unmatchedColor = null) {
    var target = document.getElementById(id);
    function renderChar(i, cellId) {
        var thisStrokes = strokes[i]
        var thisChar = chars[i]
        var strokeName = cnchar.stroke(thisChar, 'order')[0];
        HanziWriter.loadCharacterData(thisChar).then(function (charData) {
            if (strokeName.length != charData.strokes.length) {
                alert("inner data mismatch, stroke name length != char data length")
                return
            }
            var target = document.getElementById(cellId);
            var strokes = []
            var colors = []
            for (var i = 0; i < charData.strokes.length; i++) {
                var thisStroke = charData.strokes[i]
                var strokeMatched = thisStrokes.includes(strokeName[i])
                if (strokeMatched && matchedColor) {
                    strokes.push(thisStroke)
                    colors.push(matchedColor)
                }
                if (!strokeMatched && unmatchedColor) {
                    strokes.push(thisStroke)
                    colors.push(unmatchedColor)
                }
            }
            renderFanningStrokes(target, strokes, colors);
        });
    }
    while (target.firstChild) {
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

// render a word with different colors for matched strokes and unmatched strokes
// id: the id of the target element to put the word
// stockes: the mathced strokes for all characters
function renderMatchedStrokes(chars, strokes, id, matchedColor = null, unmatchedColor = null) {
    var strokesEachChar = []
    for (var i = 0; i < chars.length; i++) {
        strokesEachChar.push(strokes)
    }
    renderEachMatchedStrokes(chars, strokesEachChar, id, matchedColor, unmatchedColor)
}
