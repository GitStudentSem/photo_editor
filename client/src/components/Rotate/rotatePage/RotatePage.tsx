import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";
import rotateStore from "../../../store/rotateStore";
import { Checkbox, TextInput, ColorInput } from "../../controls";

export const RotatePage = observer(() => {
  const enumTags = {
    TextInput,
    Checkbox,
    ColorInput,
  };

  return (
    <Layout>
      {rotateStore.controls.map(({ name, props }, i) => {
        const Control = enumTags[name];

        //@ts-ignore
        return <Control key={name + i} {...props} />;
        // return (
        //   <Fragment key={name + i}>
        //     {Reflect.apply(Control, null, [props])}
        //   </Fragment>
        // );
      })}
    </Layout>
  );
});
