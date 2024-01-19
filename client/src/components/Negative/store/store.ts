import { makeAutoObservable } from "mobx";

class Store {
  photo: File[];
  processedPhoto: Blob[];

  constructor() {
    this.photo = [];
    this.processedPhoto = [];
    makeAutoObservable(this);
  }

  setPhoto(value: File[]) {
    this.photo = value;
  }

  setProcessedPhoto(value: Blob[]) {
    this.processedPhoto = value;
  }
}

export const PhotoStore = new Store();
