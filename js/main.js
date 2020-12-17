(
  /**
   *  Function mainContentLinks
   *  
   *  Prints as <li> elements an array of objects including
   *  the label and url of other sites. This function is
   *  intended to be used to display all links of the main
   *  site content
   */
  function mainContentLinks() {
  
  // list of objects for the menu
  const links = [
    {"label": "Week 01 notes", "url": "./week01/" },
    {"label": "Week 02 notes", "url": "./week02/" },
    {"label": "Week 03 notes", "url": "./week03/" },
    {"label": "Week 04 notes", "url": "./week04/" },
    {"label": "Week 05 notes", "url": "./week05/" },
    {"label": "Week 06 todo app", "url": "./week06/"},
    {"label": "Week 07 notes", "url": "./week07/" },
    {"label": "Week 08 notes", "url": "./week08/" },
    {"label": "Week 09 notes", "url": "./week09/" },
    {"label": "Week 10 notes", "url": "./week10/" },
    { "label": "Week 11 notes", "url": "./week11/" },
    {"label": "Final Project", "url": "./Final/" }
  ];

  // Get content list
  var contentList = document.getElementById("contentList");
  for (const i in links) {
    // Create an li
    var li = document.createElement("li");

    // Add label and link to the item of the list
    li.innerHTML = `<a href="${links[i]["url"]}">${links[i]["label"]}`;
    
    // Add the li to the ol
    contentList.appendChild(li);
  }
  }
)();




