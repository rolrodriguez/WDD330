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
    {"label": "Week 02 notes", "url": "./week02/"}
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




