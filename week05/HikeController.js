import HikeModel from './HikeModel.js';
import HikeView from './HikeView.js';

export default class HikeController{
  constructor(containerID) {
    this.containerElement = document.getElementById(containerID);
    this.model = new HikeModel();
    this.view = new HikeView(this.containerElement);
    self = this;
  }

  getAllHikes() {
    self.view.renderHikeList(self.model.getAllHikes());
    self.addListeners("h2");
  }

  getSingleHike(hikeName) {
    self.view.renderDetailedHike(self.model.getHikeByName(hikeName));
    let backButton = document.getElementById("backToMain");

    backButton.addEventListener('click', this.getAllHikes);
  }

  addListeners(elementTag) {
    let elements = document.getElementsByTagName(elementTag);
    
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', function () { self.getSingleHike(elements[i].innerText); });
    }
  }
}