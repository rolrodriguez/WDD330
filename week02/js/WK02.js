//Id, studentName, Course, term, score
/** 
 *  initDB function
 * 
 *  initializes indexedDB to be used
 */

const DB_NAME = "AkatsukiSchoolGrades";
const DB_VERSION = 1;
const DB_STORE = "SchoolGrades";

window.indexedDB = window.indexedDB || 
                window.mozIndexedDB ||
                window.webkitIndexedDB ||
                    window.msIndexedDB;


let request = window.indexedDB.open(DB_NAME, DB_VERSION);
let db, tx, store, index;

request.onupgradeneeded = (e)=>{
  let db = request.result;
  store = db.createObjectStore(DB_STORE, {autoIncrement: true});
  let index = store.createIndex("studentName","studentName", {unique: false});

}

request.onerror = (e)=>{
  console.log("There was an error: " + e.target.errorCode);
}

request.onsuccess = function (e) {
  readData();
}

insertValues = () =>{
  let request = window.indexedDB.open(DB_NAME, DB_VERSION);

  request.onsuccess = ()=>{
    let name = document.getElementById("student").value;
    let cs = document.getElementById("course").value;
    let tm = document.getElementById("term").value;
    let sc = document.getElementById("score").value;
    
    if (name != "" && cs != "" && tm != "" && sc != ""){
      let db = request.result;
      let tx = db.transaction(DB_STORE, "readwrite");
      let store = tx.objectStore(DB_STORE);
      let index = store.index("studentName");

      db.onerror = (e)=>{
        console.log("ERROR:" + e.target.errorCode);
      }
      
      store.put({studentName:name, course: cs, term: tm, score: sc});
    }
    
    
  }
  readData();
}
  
readData = () => {
  let request = window.indexedDB.open(DB_NAME, DB_VERSION);

  request.onsuccess = () => {
    let db = request.result;
    let tx = db.transaction(DB_STORE, "readwrite");
    let store = tx.objectStore(DB_STORE);
    let index = store.index("studentName");
  
    let res = store.getAll();

  res.onsuccess = ()=>{
      // let headers = [];
      let output = "<table><tr>";
      for(let idx in res.result){
        if (idx == 0) {
          output += "<th>ID</th>"
          for(let field in res.result[idx]){
            // headers.push(field);
            output+= `<th>${field}</th>`;
          }
        }
        else break;
        
      }
      output += "</tr>"
      for(let idx in res.result){
        output += `<tr><td>${idx}</td>`;
        for(let field in res.result[idx]){
          output += `<td class="${field}">${res.result[idx][field]}</td>`;
        }
        output +="</tr>"
      }
      document.getElementById("entries").innerHTML = output;
    }

    tx.oncomplete = ()=>{
      db.close();
    }
  }
  request.onerror = (e) => {
    console.log("Had an error: " + e.target.errorCode);
  }
  
}

