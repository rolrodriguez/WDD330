import utilities from './utilities.js';


const epLatestBase = 'https://api.exchangeratesapi.io/latest';
const epHistoryBase = 'https://api.exchangeratesapi.io/history';
const currencies = {
    "AUD": "Australian Dollar",
    "BRL": "Brazilian Real",
    "GBP": "British Pound",
    "BGN": "Bulgarian Lev",
    "CAD": "Canadian Dollar",
    "CNY": "Chinese Yuan",
    "HRK": "Croatian Kuna",
    "CZK": "Czech Koruna",
    "DKK": "Danish Krone",
    "EUR": "Euro",
    "HKD": "Hong Kong Dollar",
    "HUF": "Hungarian Forint",
    "ISK": "Icelandic Krona",
    "INR": "Indian Rupee",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli Shekel",
    "JPY": "Japanese Yen",
    "MYR": "Malaysian Ringgit",
    "MXN": "Mexican Peso",
    "NZD": "New Zealand Dollar",
    "NOK": "Norwegian Krone",
    "PHP": "Philippine Peso",
    "PLN": "Polish Zloty",
    "RON": "Romanian Leu",
    "RUB": "Russian Ruble",
    "SGD": "Singapore Dollar",
    "ZAR": "South African Rand",
    "KRW": "South Korean Won",
    "SEK": "Swedish Krona",
    "CHF": "Swiss Franc",
    "THB": "Thai Baht",
    "TRY": "Turkish Lira",
    "USD": "US Dollar"
}

// Load select fields
let amount = document.querySelector("#amount");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let submit = document.querySelector("#submit");
let range = document.querySelector("#monthRange");
let results = document.querySelector('#results');

// Populate to and from selects from currencies array
utilities.fillformSelect("#from", currencies);
from.addEventListener('change', (event) => {
  utilities.fillformSelect("#to", currencies, event.target.value);
});

amount.addEventListener('blur', () => {
  let value = parseFloat(amount.value);
  if (!isNaN(value)) {
    amount.value = utilities.toCurrency(value);
    amount.dataset.number = parseFloat(value).toFixed(2);
  }
  else {
    amount.value = '';
    amount.removeAttribute('data-number');
  }

});

amount.addEventListener('focus', () => {
  if (amount.dataset.number) {
    amount.value = amount.dataset.number;
  }
});

submit.addEventListener("click", async (event)=>{
  event.preventDefault();
  // TODO check if amount is a number
  if (amount.value != "" && /^\d+$/g.test(parseFloat(amount.dataset.number))){
    if (from.value != "" && to.value != ""){
      let response = await utilities.getJSON(`${epLatestBase}?base=${from.value}`);
      if (response) {
        let rate = response.rates[to.value];
        // From
        results.children[0].innerText = `${utilities.toCurrency(parseFloat(amount.dataset.number))} ${from.value}=`;
        // To
        results.children[1].innerText = `${utilities.toCurrency(rate * parseFloat(amount.dataset.number))} ${to.value}`;
        // Rate
        results.children[2].innerText = `1 ${from.value} = ${ (rate).toFixed(2) } ${to.value}`;
        // Reverse Rate
        results.children[3].innerText = `1 ${to.value} = ${ (1/rate).toFixed(2) } ${from.value}`;
        // Last update
        results.children[4].innerText = `Last updated: ${new Date().toString().slice(0, 24)}`;
        results.style.display = 'block';

        setTimeout(() => {
          let items = [...document.getElementsByClassName('hidden')];
          items.forEach((item) => {
            item.classList.replace('hidden', 'visible');
          });
        }, 50);
          
        
      }
      getChart(epHistoryBase, from, to, range, 'canvas');
    }
    else{
      console.warn("The from and to fields need to have currencies to perform the conversion")
      tata.warn("Warning", "The from and to fields need to have currencies to perform the conversion") 
    }
  }
  else{
    console.warn("The amount field cannot be empty or include characters that are not numbers")
    tata.warn("Warning","The amount field cannot be empty or include characters that are not numbers");
  }
});

range.addEventListener('change', () => {
  getChart(epHistoryBase, from, to, range, 'canvas');
});

let getChart = async (epHistoryBase, from, to, range, canvasID) => {
  let dataStore = await getHistory(epHistoryBase, from, to, range);
  if (dataStore) {
    let container = document.getElementById(canvasID).parentNode.parentNode;
    container.style.display = 'block';
    let ctx = document.getElementById(canvasID).getContext('2d');
    printChart(ctx, dataStore, range);
  }
}

let getHistory = async (epHistoryBase, from, to, range) => {
  let today = new Date();
  let begin = new Date();
  begin.setMonth(today.getMonth() - range.value);
  const todayFormat = today.toISOString().slice(0,10);
  const beginFormat = begin.toISOString().slice(0,10);

  try {
    let history = await utilities.getJSON(`${epHistoryBase}?base=${from.value}&start_at=${beginFormat}&end_at=${todayFormat}&symbols=${to.value}`);
    let dataStore = utilities.sortByKey(history.rates);
    return dataStore;
  } catch (error) {
    console.error(error.description);
  }
}

let printChart = (ctx, dataStore, slider) => {
  // If chart exists then update it, otherwise create new chart
      if (window.myChart) {
        window.myChart.data.labels = Object.keys(dataStore)
        window.myChart.data.datasets[0].data = Object.values(dataStore);
        window.myChart.update();
      }
      else {
        window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(dataStore),
            datasets: [{
                label: 'Rate',
                data: Object.values(dataStore),
                borderWidth: 1,
                backgroundColor: "#3e95cd"
          }],
            
          },
          options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                display: true,
                text: 'Exchange rate history'
                },
            legend: { display: false },
            scales: {
              yAxes: [{
                scaleLabel: {
                                display: true,
                            labelString: 'Rate',
                                align: 'center' 
                        }   
              }],
              xAxes: [{
                ticks: {
                  fontSize: 10,
                  maxRotation: 90
                }
              }]
                    }
              }
        });
        slider.parentNode.style.display = 'block';

        }
}



