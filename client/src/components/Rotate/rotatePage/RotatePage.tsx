import { useState } from "react";
import { TextInput } from "../../textInput/TextInput";

import { Checkbox } from "../../checkbox/Checkbox";
import { ColorInput } from "../../colorInput/ColorInput";
import { observer } from "mobx-react-lite";
import { Layout } from "../../layout/Layout";

const RotatePage = observer(() => {
  const [usedBackground, setUsedBackground] = useState(false);

  return (
    <Layout>
      <TextInput
        placeholder='Угол поворота'
        label='На какой угол нужно повернуть изображение?'
        type='number'
        name='angle'
        required
      />

      <Checkbox
        text='Использоавать задний фон?'
        checked={usedBackground}
        onChange={() => setUsedBackground(!usedBackground)}
      />

      <ColorInput
        label='Какого цвета установить задний фон?'
        name='background'
        disabled={!usedBackground}
      />
    </Layout>
  );
});
export { RotatePage };
