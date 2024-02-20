import { makeAutoObservable } from "mobx";
import { IPropsCheckbox } from "../components/checkbox/Checkbox";
import { IPropsTextInput } from "../components/textInput/TextInput";
import { IPropsColorInput } from "../components/colorInput/ColorInput";

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
  angle: number;
  backgroundColor: string;
  usedBackground: boolean;
  controls: [TextInput, Checkbox, ColorInput];

  constructor() {
    this.angle = 0;
    this.usedBackground = false;
    this.backgroundColor = "#000000";

    this.controls = [
      {
        name: "TextInput",
        props: {
          placeholder: "Угол поворота",
          label: "На какой угол нужно повернуть изображение?",
          type: "number",
          name: "angle",
          value: this.angle,
          onChange: (e) => this.setAngle(e),
          required: true,
        },
      },
      {
        name: "Checkbox",
        props: {
          text: "Использоавать задний фон?",
          checked: this.usedBackground,
          onChange: () => this.toggleUsedBackground(),
        },
      },
      {
        name: "ColorInput",
        props: {
          label: "Какого цвета установить задний фон?",
          name: "background",
          disabled: !this.usedBackground,
          value: this.backgroundColor,
          onChange: (e) => this.setColor(e),
        },
      },
    ];

    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleUsedBackground() {
    this.usedBackground = !this.usedBackground;

    this.controls[1].props.checked = this.usedBackground;
    this.controls[2].props.disabled = !this.usedBackground;
  }

  setColor(e: React.ChangeEvent<HTMLInputElement>) {
    this.backgroundColor = e.target.value;

    this.controls[2].props.value = this.backgroundColor;
  }
  setAngle(e: React.ChangeEvent<HTMLInputElement>) {
    this.angle = +e.target.value;

    this.controls[0].props.value = this.angle;
  }
}

export default new RotateStore();
