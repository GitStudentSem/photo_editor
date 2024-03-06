import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";
import rotateStore from "../../../store/rotateStore";
import { Checkbox, TextInput, ColorInput } from "../../controls";

export const RotatePage = observer(() => {
  return (
    <Layout>
      {rotateStore.controls.map(({ name, props }, index) => {
        switch (name) {
          case "TextInput":
            return <TextInput key={name + index} {...props} />;
          case "Checkbox":
            return <Checkbox key={name + index} {...props} />;
          case "ColorInput":
            return <ColorInput key={name + index} {...props} />;
        }
      })}
    </Layout>
  );
});
