import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react-lite";

export type Image = { name: string; src: string; size: number };

class ImagesStore {
  selectedImage: Image | null;
  originalImages: Image[];
  processedImages: Image[];

  constructor() {
    this.selectedImage = null;
    this.originalImages = [];
    this.processedImages = [];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedImage(image: Image) {
    this.selectedImage = image;
  }

  setOriginalImages(images: Image[]) {
    this.originalImages = images;
    this.selectedImage = images[0];
  }

  setProcessedImages(images: Image[]) {
    this.processedImages = images;
  }
  deleteAllImages() {
    this.selectedImage = null;
    this.originalImages = [];
    this.processedImages = [];
  }
}

export default new ImagesStore();
