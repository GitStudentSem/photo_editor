import { makeAutoObservable } from "mobx";

class Store {
  photo: { name: string; size: number; src: string; file: File }[];
  processedPhoto: { src: string; blob: Blob }[];
  currentPhoto: string | null;

  constructor() {
    this.photo = [];
    this.processedPhoto = [];
    this.currentPhoto = null;

    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  setPhoto(value: { name: string; size: number; src: string; file: File }[]) {
    this.photo = value;
    this.currentPhoto = value[0].src;
    this.processedPhoto = [];
  }

  setProcessedPhoto(value: { src: string; blob: Blob }[]) {
    this.processedPhoto = value;
    this.currentPhoto = value[0].src;
  }

  setCurrentPhoto(value: string) {
    this.currentPhoto = value;
  }
}

export const PhotoStore = new Store();
