import { FC } from "react";
import s from "./tabs.module.css";
import { observer } from "mobx-react-lite";

export interface ITabsProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const _Tabs: FC<ITabsProps> = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <div className={s.wrapper}>
      {tabs.map((text, i) => {
        return (
          <div key={text}>
            <input
              type='radio'
              id={text}
              name='tabs'
              checked={activeTab === i}
              className={s.input}
              onChange={() => setActiveTab(i)}
            />
            <label
              className={s.label}
              htmlFor={text}
              onClick={() => setActiveTab(i)}
            >
              {text}
            </label>
          </div>
        );
      })}

      <div className={s.border_bottom}>
        <div
          className={s.active_border}
          style={{
            width: `${100 / tabs.length}%`,
            left: `${activeTab * (100 / tabs.length)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
export const Tabs = observer(_Tabs);
