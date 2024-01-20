import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react-lite";

type Images = File[] | undefined;

class ImagesStore {
  originalImages: Images;
  processedImages: Images;

  constructor() {
    this.originalImages = [];
    this.processedImages = [];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setOriginalImages(images: Images) {
    this.originalImages = images;
  }

  setProcessedImages(images: Images) {
    this.processedImages = images;
  }
}

export default new ImagesStore();
