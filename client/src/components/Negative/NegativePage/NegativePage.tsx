import { Layout } from "../../layout/Layout";
import { Checkbox } from "../../controls";
import negativeStore from "../../../store/negativeStore";

export const NegativePage = () => {
  const { controls } = negativeStore;

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
