/**
 *  Functions for W01 localStorage exercise
 *  @author Rolando Rodriguez
 */


 /**
  *  Function readStory
  * 
  *  Reads the story from localStorage and puts it 
  *  into the storyEntry textarea using the story title as key
  */
function readStory() {
  const title = document.getElementById("title");
  const storyEntry = document.getElementById("storyEntry");
  var storedEntry = localStorage.getItem(title.value);
  storyEntry.value= storedEntry;
  
}

/**
  *  Function saveStory
  * 
  *  Save the story from the storyEntry textarea
  *  into localStorage using the story title as 
  *  the key
  */
function saveStory() {
  const title = document.getElementById("title");
  const storyEntry = document.getElementById("storyEntry");
  localStorage.setItem(title.value, storyEntry.value);
}

/**
  *  Function displayStory
  * 
  *  Puts the text from the storyEntry textarea into the
  *  entries section of the website
  */
function displayStory() {
  const storyEntry = document.getElementById("storyEntry");
  document.getElementById("entries").innerHTML = storyEntry.value;
}