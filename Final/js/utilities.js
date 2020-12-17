

let utilities = {
  
  async getJSON(url,options={}){
    try {
      let response = await fetch(url,options);
      if (response.ok){
        let data = await response.json()
        return data;
      }
    } catch (error) {
      console.error(error);
      tata.error("Error", "Cannot connect to the API. Please check your connection");
    }
  },
  fillformSelect(selectID, entriesArray, excludeKey=null) {
    let select = document.querySelector(selectID)
    if (select != null) {
      select.innerHTML = '<option></option>';

      for (const [key, value] of Object.entries(entriesArray)) {
        let opt = document.createElement('option');
        if (key != excludeKey) {
          opt.text = `${key} - ${value}`;
          opt.value = key;
          select.add(opt);
        }
        else {
          continue;
        }
      }
    }
  },
  sortByKey(unsortedObject) {
    let sortedArray = [];
    for (let i in unsortedObject) {
      for (let j in unsortedObject[i]) {
        sortedArray.push([i, unsortedObject[i][j]]);
      }
    }
    sortedArray.sort();
    let sortedObject = {};
    sortedArray.forEach((value) => {
      sortedObject[value[0]] = value[1];
    });
    return sortedObject;
  },
  toCurrency(rawNumber) {
    return rawNumber.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}

export default utilities;


