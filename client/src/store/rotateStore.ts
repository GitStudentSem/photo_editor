import { makeAutoObservable } from "mobx";
import { IPropsCheckbox } from "../components/checkbox/Checkbox";
import { IPropsTextInput } from "../components/textInput/TextInput";
import { IPropsColorInput } from "../components/colorInput/ColorInput";
// import { observer } from "mobx-react-lite";

type TextInput = {
  name: "TextInput";
  props: IPropsTextInput;
};

type Checkbox = {
  name: "Checkbox";
  props: IPropsCheckbox;
};

type ColorInput = {
  name: "ColorInput";
  props: IPropsColorInput;
};

class RotateStore {
  usedBackground: boolean;
  controls: [TextInput, Checkbox, ColorInput];

  constructor() {
    this.usedBackground = false;

    this.controls = [
      {
        name: "TextInput",
        props: {
          placeholder: "Угол поворота",
          label: "На какой угол нужно повернуть изображение?",
          type: "number",
          name: "angle",
          required: true,
        },
      },
      {
        name: "Checkbox",
        props: {
          text: "Использоавать задний фон?",
          checked: this.usedBackground,
          onChange: () => this.toggleUsedBackground,
        },
      },
      {
        name: "ColorInput",
        props: {
          label: "Какого цвета установить задний фон?",
          name: "background",
          disabled: !this.usedBackground,
        },
      },
    ];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleUsedBackground() {
    this.usedBackground = !this.usedBackground;
  }
}

export default new RotateStore();
