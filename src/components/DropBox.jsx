import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { useBlock } from "../BlocklyContext";
import Block from "./Block";
import { useEffect, useState } from "react";

const DropBox = ({ dis, curr, i, accept }) => {
  const { setRenderCurrent, render, removeFromActive } =
    useBlock();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      if (accept !== item.form && accept !== "all") {
        alert("Неправильный тип блока");
        return;
      }

      if (item.pos === "toolbox") {
      } else {
        removeFromActive(item.blockId);
        setRenderCurrent(item.blockId, curr, i);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: !!monitor.isOver({ shallow: true }),
    }),
  }));

  const [res, setRes] = useState(null);

  useEffect(() => {
    const tmp = render.find((item) => item.id === curr);

    if (tmp && tmp.children[i].current !== 0) {
      const data = {
        ...render.find((item) => item.id === tmp.children[i].current),
      };
      setRes(<Block data={data} dis={false} />);
    }
  }, [render, setRes, curr, i]);

  return (
    <div
      ref={dis ? undefined : drop}
      className="min-w-[40%] min-h-[20px] ml-2 bg-white clear-both border-2 border-black"
    >
      {res ? res : <p className="opacity-20">{accept}</p>}
    </div>
  );
};

export default DropBox;
