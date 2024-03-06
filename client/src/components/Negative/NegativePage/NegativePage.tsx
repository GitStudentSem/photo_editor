import { Layout } from "../../layout/Layout";
import { Checkbox } from "../../controls";
import { ControlsStore } from "../../../store/negativeStore";

export const NegativePage = () => {
  const { controls } = ControlsStore;

  return (
    <Layout>
      {controls.map(({ name, props }, index) => {
        switch (name) {
          case "Checkbox":
            return <Checkbox key={name + index} {...props} />;
        }
      })}
    </Layout>
  );
};
