import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";
import rotateStore from "../../../store/rotateStore";
import { Checkbox, TextInput, ColorInput } from "../../controls";

export const RotatePage = observer(() => {
	return (
		<Layout>
			{rotateStore.controls.map(({ name, props }) => {
				switch (name) {
					case "TextInput":
						return <TextInput key={name + Math.random()} {...props} />;
					case "Checkbox":
						return <Checkbox key={name + Math.random()} {...props} />;
					case "ColorInput":
						return <ColorInput key={name + Math.random()} {...props} />;
				}
			})}
		</Layout>
	);
});
