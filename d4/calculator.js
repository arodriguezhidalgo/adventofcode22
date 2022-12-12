
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

const output = textContent.map(x => x.split(","))
.map(x => extractVectors(x))
.map(x => verifySubset(x))
.reduce((x,y) => x+y)

debugger

function extractVectors(sequences){
    // Sequences contains two sequences. E.g. ["2-4","5-6"]
    // Split sequences 2-4 into [2,4]
    let seq1 = sequences[0].split("-").map(x => parseInt(x));
    let seq2 = sequences[1].split("-").map(x => parseInt(x));
    
    // Generate a vector from the sequence to have a specific length using Array. Then, use map to return its indices (see i inside of the map call). Finally, add the value of the origin of seq1    
    let array1 = [... new Array(seq1[1] - seq1[0]+1)].map((x,i) => i).map(x => x+seq1[0]);
    let array2 = [... new Array(seq2[1] - seq2[0]+1)].map((x,i) => i).map(x => x+seq2[0]);
    
    return {array1: array1, array2: array2, str: sequences};
}



function verifySubset(x){
    
    // Check whether all the items in array1 are contained in array2. Sum the trues, and if the number is the same as the length of array2, then we accept that it contains array1.
    // The first map is multiplied by 1 so we accumulate 1s instead of logical trues. Otherwise, cases like "2-2, 2-2" fail.
    const array2ContainsArray1 = x.array1.map(v => x.array2.includes(v)*1)
    .reduce((a,b) => a+b) === Math.min(x.array2.length, x.array1.length);
    
    const array1ContainsArray2 = x.array2.map(v => x.array1.includes(v)*1)
    .reduce((a,b) => a+b) === Math.min(x.array2.length, x.array1.length);

    console.log(x.str, array1ContainsArray2 || array2ContainsArray1)

    return array1ContainsArray2 || array2ContainsArray1;
}



document.getElementById("Total").innerText = output;
// 539 is too low.
//