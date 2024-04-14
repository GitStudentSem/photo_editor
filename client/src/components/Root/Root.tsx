import { Layout } from "../layout/Layout";
import rotateStore from "../../store/rotateStore";
import negativeStore from "../../store/negativeStore.ts";
import { Checkbox, ColorInput, TextInput } from "../controls/index.tsx";
import { Fragment } from "react";
import { observer } from "mobx-react-lite";

type TEffect = {
  name: "rotate" | "negative";
  store: typeof rotateStore | typeof negativeStore;
};

const effects: TEffect[] = [
  { name: "rotate", store: rotateStore },
  { name: "negative", store: negativeStore },
];

function getComponentByName(componentName: string, props: any) {
  switch (componentName) {
    case "TextInput":
      return <TextInput {...props} />;
    case "Checkbox":
      return <Checkbox {...props} />;
    case "ColorInput":
      return <ColorInput {...props} />;
    default:
      console.error(`Unsupported component name: ${componentName}`);
  }
}

const RootComponent = observer(() => {
  return (
    <Layout>
      {effects.map((effect, index) => {
        return (
          <div key={effect.name + index}>
            <h1>{effect.name}</h1>
            {effect.store.controls.map(({ name, props }, index) => {
              return (
                <Fragment key={index + name}>
                  {getComponentByName(name, props)}
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </Layout>
  );
});

export default RootComponent;
