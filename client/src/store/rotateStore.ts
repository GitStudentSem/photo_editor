import { makeAutoObservable } from "mobx";
import {
  ICheckboxProps,
  ITextInputProps,
  IColorInputProps,
} from "../components/controls";

type TextInput = {
  name: "TextInput";
  props: ITextInputProps;
};

type Checkbox = {
  name: "Checkbox";
  props: ICheckboxProps;
};

type ColorInput = {
  name: "ColorInput";
  props: IColorInputProps;
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
          label: "Использоавать задний фон?",
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

    const [_, checkbox, colorInput] = this.controls;

    checkbox.props.checked = this.usedBackground;
    colorInput.props.disabled = !this.usedBackground;
  }

  setColor(e: React.ChangeEvent<HTMLInputElement>) {
    this.backgroundColor = e.target.value;

    const [_, __, colorInput] = this.controls;

    colorInput.props.value = this.backgroundColor;
  }
  setAngle(e: React.ChangeEvent<HTMLInputElement>) {
    this.angle = +e.target.value;

    const [textInput, _, __] = this.controls;

    textInput.props.value = this.angle;
  }
}

export default new RotateStore();
