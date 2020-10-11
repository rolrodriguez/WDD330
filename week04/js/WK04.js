var app = new Vue({
  el: '#app',
  data: {
    message: "Your message will appear here!"
  }
})

class Car{
  constructor(make, model) {
    this._make = make;
    this._model = model;
    this.getMake = () => this._make
    this.setMake = make => {
      return this._make = make;
    }
    this.getModel = () => this._model;
    
    this.setModel = model => {
      return this._model = model;
    }
  
    this.toString = () => {
      return `Make: ${this._make}, Model: ${this._model}`;
    }

  }


}

function loadList() {
  let listString = localStorage.getItem("CAR_LIST");
  console.log(listString);
  return listString;
}

function getListItems() {
  let listString = loadList();
  let result = document.querySelector("#result"); 
  if (listString != null) {
    let carList = JSON.parse(listString);
    result.innerHTML = "";
    for (const car of carList) {
      result.innerHTML += `<div class="car">Make: ${car._make}<br />Model: ${car._model}</div>`;
    }
  }
}

function saveToList() {
  let make = document.querySelector("#make");
  let model = document.querySelector("#model");
  let article = new Car(make.value, model.value);
  console.log(article);
  let articleString = JSON.stringify(article);
  console.log(articleString);
  let listString = loadList();
  
  if (listString == null) {
    listString = "[]";
  }
  let list = JSON.parse(listString);
  list.push(article);
  localStorage.setItem("CAR_LIST", JSON.stringify(list));
  getListItems();
}

// Event listeners
getListItems();
document.querySelector("#make").addEventListener("focus", loadList);
document.querySelector("#add").addEventListener("click", saveToList);
