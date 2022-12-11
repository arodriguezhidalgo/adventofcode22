
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

const mappingPlayer2 = {X: 0, Y: 1, Z: 2};
const mappingPlayer1 = {A: 0, B: 1, C: 2};
const mappingPlayer2GeneralScore = {X: 1, Y: 2, Z: 3};


// Encode each solution (victory vs loss) + chosen play
const fixedScores = [[0, 3, 6], [0, 3, 6], [0, 3, 6]];
const scores = [[3, 1, 2], [1, 2, 3], [2, 3, 1]];
// Second column can be used to store part of the score
let i = 0;

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
