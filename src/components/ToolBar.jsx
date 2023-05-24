import { useBlock } from "../BlocklyContext";
import { v4 as uuid } from "uuid";
import Block from "./Block";
import { useCallback, useEffect } from "react";

// Компонент в левой части сайта, отображающий блоки, которые можно впоследствии использовать
// useBlock() - кастомный хук, для быстрого доступа к данным из контекста
const ToolBar = () => {
  const { toolBox, setScrollY } = useBlock();

  const handleScroll = useCallback(() => {
    const toolbar = document.getElementById("toolbar");
    setScrollY(toolbar.scrollTop);
  }, [setScrollY]);

  useEffect(() => {
    const toolbar = document.getElementById("toolbar");
    toolbar.addEventListener("scroll", handleScroll, { passive: true });

    return () => toolbar.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const res = toolBox.map((item) => (
    <Block data={item} key={uuid()} dis={true} />
  ));

  return (
    <div id="toolbar" className="min-w-[120px] bg-slate-600 overflow-y-scroll">
      {res}
    </div>
  );
};

export default ToolBar;
