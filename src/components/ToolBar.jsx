import { useBlock } from "../BlocklyContext";
import { v4 as uuid } from "uuid";
import Block from "./Block";

// Компонент в левой части сайта, отображающий блоки, которые можно впоследствии использовать
// useBlock() - кастомный хук, для быстрого доступа к данным из контекста 
const ToolBar = () => {
  const { toolBox } = useBlock();
  const res = toolBox.map((item) => (
    <Block data={item} key={uuid()} dis={true} />
  ));

  return <div className="min-w-[120px] bg-slate-600 overflow-y-scroll">{res}</div>;
};

export default ToolBar;
