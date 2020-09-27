/**
 * Calculate random from a range
 */


function randomFromRange(min=0, max=1){
let x = Math.round(min+Math.random()*(max-min));
return x;
}

function calculateRandom() {
  let min = parseInt(document.getElementById("min").value);
  let max = parseInt(document.getElementById("max").value);
  let result = document.getElementById("random");

  if (!isNaN(min) && !isNaN(max)) {
    let output = "Random number is: ";
    if (min < max) {
      output += randomFromRange(min, max);
    }
    else if (min > max) {
      output += randomFromRange(max, min);
    } else {
      output += min;
    }
    result.innerHTML = output;
  }
  else {
    alert("Value cannot compute, the inputs are not valid");
  }
}

function replaceInString() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let replacestring = document.getElementById("replacestring").value;
  let result = document.getElementById("result");

  if (from != "" && replacestring != "") {

    while (replacestring.search(from) != -1) {
      replacestring = replacestring.replace(from, to);
    }

    result.innerHTML = "Replaced string: "+replacestring;
  }
}