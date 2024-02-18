import { createElement } from "react";

import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";
import rotateStore from "../../../store/rotateStore";

const RotatePage = observer(() => {
  return (
    <Layout>
      {rotateStore.controls.map(({ name, props }) => {
        return createElement(name, { ...props, key: name });
      })}
    </Layout>
  );
});
export { RotatePage };
