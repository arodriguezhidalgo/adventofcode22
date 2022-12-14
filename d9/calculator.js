
// We need to wait for the result of the fetch call, otherwise we cannot store the content in a variable (loading time is slower, so we get to textContent too quickly).
// Consequently, wrap everything in an async function and then wait for the promises to finish. Then, return the variable.

async function getTextContent(fileName){
    // See https://fetch.spec.whatwg.org/
    /* Fetch (specifically, request) the document. 
    Then, get the response text.
    Then, split using \n.
    THen, assign the output to `textContent.*/
    await fetch(fileName)
    .then(response => response.text())
    .then((text) => text.split("\n"))        
    .then((text) => textContent = text);    
}

let textContent;

// Retrieve the text content
await getTextContent('initialCrate');

// Puzzle definition is in 
let crateModel = Array(9).fill(Array(9).fill(""));
textContent = textContent.map(x => x.split(" "));

for (let j = 0; j < textContent.length; j++){
    const vector = textContent[j];
    for (let i = 0; i < vector.length; i++){
        crateModel[i][j] = vector[i];
        console.log(crateModel)
    }
}



debugger