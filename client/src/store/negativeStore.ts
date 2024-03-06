import { makeAutoObservable } from "mobx";
import { Checkbox, ICheckboxProps } from "../components/controls";

type Checkbox = {
  name: "Checkbox";
  props: ICheckboxProps;
};

class NegativeStore {
  controls: [Checkbox];
  isAlpha: boolean | undefined;

  constructor() {
    this.isAlpha;

    this.controls = [
      {
        name: "Checkbox",
        props: {
          label: "Использовать a канал?",
          checked: this.isAlpha,
          onChange: () => this.toggleAlpha(),
        },
      },
    ];

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  toggleAlpha() {
    this.controls[0].props.checked = !this.controls[0].props.checked;
  }
}

export const ControlsStore = new NegativeStore();
