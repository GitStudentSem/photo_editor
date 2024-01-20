import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react-lite";

type Images = File[];

class ImagesStore {
  selectedImage: File | null;
  originalImages: Images;
  processedImages: Images;

  constructor() {
    this.selectedImage = null;
    this.originalImages = [];
    this.processedImages = [];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedImage(image: File) {
    this.selectedImage = image;
  }

  setOriginalImages(images: Images) {
    this.originalImages = images;
  }

  setProcessedImages(images: Images) {
    this.processedImages = images;
  }
}

export default new ImagesStore();
