function readStory() {
  const title = document.getElementById("title");
  const storyEntry = document.getElementById("storyEntry");
  var storedEntry = localStorage.getItem(title.value);
  storyEntry.value= storedEntry;
  
}

function saveStory() {
  const title = document.getElementById("title");
  const storyEntry = document.getElementById("storyEntry");
  localStorage.setItem(title.value, storyEntry.value);
}

function displayStory() {
  const storyEntry = document.getElementById("storyEntry");
  document.getElementById("entries").innerHTML = storyEntry.value;
}