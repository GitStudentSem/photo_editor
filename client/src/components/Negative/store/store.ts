import { makeAutoObservable, spy } from "mobx";

spy((ev) => {
  console.log(ev);
});

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  photo: FileList;
  processedPhoto: Blob[];

  setPhoto(value) {
    this.photo = value;
  }

  setProcessedPhoto(value) {
    this.processedPhoto = value;
  }
}

export const PhotoStore = new Store();