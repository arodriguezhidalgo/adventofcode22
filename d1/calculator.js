
let resultObj = document.getElementById("result");
resultObj.innerText = "aaa";

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


let outputs = [];
let acum = 0;

for (const i of textContent){
    let number = parseInt(i);
    
    if (isNaN(number) === false){
        acum += number;
    }
    else{
        outputs.push(acum);
        acum = 0;
    }
    
}

resultObj.innerText = outputs.reduce((x,y) => Math.max(x,y));
