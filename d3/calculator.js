
// We need to wait for the result of the fetch call, otherwise we cannot store the content in a variable (loading time is slower, so we get to textContent too quickly).
// Consequently, wrap everything in an async function and then wait for the promises to finish. Then, return the variable.

async function getTextContent(){
    // See https://fetch.spec.whatwg.org/
    /* Fetch (specifically, request) the document. 
    Then, get the response text.
    Then, split using \n.
    THen, assign the output to `textContent.*/
    await fetch('input')
        .then(response => response.text())
        .then((text) => text.split("\n"))        
        .then((text) => textContent = text);    
}

let textContent;

// Retrieve the text content
await getTextContent();

//let splitText = textContent.map(text => text.split(" "));



function oneHotEncodeCharacter(inputHalf){
    // Create an empty vector with zeros. 26 characters for the abc..., twice.
    let encodedHalf = new Array(26*2).fill(0);
    // 65 is the unicode value of "A"
    inputHalf.map(character => character.charCodeAt(0) - 65)
                           .map(encodedCharacter => encodedHalf[encodedCharacter] = 1);

    return encodedHalf;
}

let decodedText = textContent.map(x => {
        let duplicateItems;
        const len = x.length;
        // Slice the vector in two halves. Then, use split("") to convert the string in an Array of chars
        const firstHalf = x.slice(0, len/2).split("");
        const secondHalf = x.slice(len/2, len).split("");

        let firstEncodedVector = oneHotEncodeCharacter(firstHalf);
        let secondEncodedVector = oneHotEncodeCharacter(secondHalf);

        for (let i=0; i<firstEncodedVector.length; i++){
            if ((firstEncodedVector[i] == secondEncodedVector[i]) && (secondEncodedVector[i] == 1)){
                // Find items that are the same in the two vectors.
                duplicateItems = i;
                }
            }
            return duplicateItems;
        })
        .map(x => decode(x))
        .reduce((x,y) => x+y);


function decode(x){
    // "z" has code 122
    // "a" has code 97
    // "A" has code 65

    // First, add 65 to recover the char code
    x = x + 65;
    console.log(String.fromCharCode(x));
    // Then, check if its capital letter or not
    if (x >= 97){
        // Lower case
        return x-97+1;
    }
    else{
        return x-65+27;
    }
    
}

debugger

function compareOptions(player1, player2){
    const mappedPlayer1 = mappingPlayer1[player1];
    const mappedPlayer2 = mappingPlayer2[player2];
    
    return (scores[mappedPlayer1][mappedPlayer2] + fixedScores[mappedPlayer1][mappedPlayer2]);    
}

let output = textContent.map(text => 
    {
        const playerChoices = text.split(" ");
        const player1 = playerChoices[0];
        const player2 = playerChoices[1];
        return compareOptions(player1, player2);
    })
    .reduce((a,b) => a+b);

document.getElementById("Total").innerText = output;
