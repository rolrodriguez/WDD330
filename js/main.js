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
  
  const links = [
    { "label": "Week 01 notes", "url": "./week01/" }
  ];

  //
  var contentList = document.getElementById("contentList");
  for (const i in links) {
    
    var li = document.createElement("li");
    li.innerHTML = `<a href="${links[i]["url"]}">${links[i]["label"]}`;
    contentList.appendChild(li);
  }
  }
)();




