
// We need to wait for the result of the fetch call, otherwise we cannot store the content in a variable (loading time is slower, so we get to textContent too quickly).
// Consequently, wrap everything in an async function and then wait for the promises to finish. Then, return the variable.

// For the second half, group in triplets and then repeat all the xor logic
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

let triplets = [];
for (let i=0; i < textContent.length; i += 3){
    const contatenatedStrings = [textContent[i], textContent[i+1],textContent[i+2]];
    triplets.push(contatenatedStrings);    
}


let decodedText = triplets.map(x => {
        let duplicateItems;
        const len = x.length;
        
        // Slice the vector in two halves. Then, use split("") to convert the string in an Array of chars
        const firstHalf = x[0].split("");
        const secondHalf = x[1].split("");
        const thirdHalf = x[2].split("");

        let firstEncodedVector = oneHotEncodeCharacter(firstHalf);
        let secondEncodedVector = oneHotEncodeCharacter(secondHalf);
        let thirdEncodedVector = oneHotEncodeCharacter(thirdHalf);

        for (let i=0; i<firstEncodedVector.length; i++){
            if ((firstEncodedVector[i] == secondEncodedVector[i]) && (secondEncodedVector[i] == 1) && (firstEncodedVector[i] == thirdEncodedVector[i]) && (thirdEncodedVector[i] == 1) && (secondEncodedVector[i] == thirdEncodedVector[i]) && (thirdEncodedVector[i] == 1)){
                // Find items that are the same in the two vectors.
                duplicateItems = i;
                }
            }
            return duplicateItems;
        })
        .map(x => decode(x))
        .reduce((x,y) => x+y);



function oneHotEncodeCharacter(inputHalf){
    // Create an empty vector with zeros. 26 characters for the abc..., twice.
    let encodedHalf = new Array(26*2).fill(0);
    // 65 is the unicode value of "A"
    inputHalf.map(character => character.charCodeAt(0) - 65)
                            .map(encodedCharacter => encodedHalf[encodedCharacter] = 1);

    return encodedHalf;
}
        
function decode(x){
    // "z" has code 122
    // "a" has code 97
    // "A" has code 65

    // First, add 65 to recover the char code
    x = x + 65;    
    // Then, check if its capital letter or not
    if (x >= 97){
        // Lower case
        return x-97+1;
    }
    else{
        return x-65+27;
    }    
}



document.getElementById("Total").innerText = decodedText;
