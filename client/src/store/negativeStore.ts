import { makeAutoObservable } from "mobx";
import { Checkbox, ICheckboxProps } from "../components/controls";

type Checkbox = {
  name: "Checkbox";
  props: ICheckboxProps;
};

class NegativeStore {
  controls: [Checkbox];
  isAlpha?: boolean;

  constructor() {
    this.isAlpha;

    this.controls = [
      {
        name: "Checkbox",
        props: {
          label: "Использовать a канал?",
          checked: !!this.isAlpha,
          onChange: () => this.toggleAlpha(),
          name: "alpha"
        },
      },
    ];

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  toggleAlpha() {
    this.controls[0].props.checked = !this.controls[0].props.checked;
  }
}

export default new NegativeStore();
