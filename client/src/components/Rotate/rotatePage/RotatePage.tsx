import { Fragment } from "react";
import { TextInput } from "../../textInput/TextInput";

import { Checkbox } from "../../checkbox/Checkbox";
import { ColorInput } from "../../colorInput/ColorInput";
import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";
import rotateStore from "../../../store/rotateStore";

const RotatePage = observer(() => {
  const enumTags = {
    TextInput,
    Checkbox,
    ColorInput,
  };

  return (
    <Layout>
      {rotateStore.controls.map(({ name, props }) => {
        const Control = enumTags[name];

        return (
          <Fragment key={name}>
            {Reflect.apply(Control, null, [props])}
          </Fragment>
        );
      })}
    </Layout>
  );
});
export { RotatePage };
