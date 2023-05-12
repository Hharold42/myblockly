import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { useBlock } from "../BlocklyContext";
import Block from "./Block";
import { useEffect, useState } from "react";
import { isEmpty } from "../utils/utils";

const DropBox = ({ dis, curr, i }) => {
  const { removeFromRender, setRenderCurrent, render, findId } = useBlock();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      const res = removeFromRender(item.blockId);

      setRenderCurrent(res, curr, i);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: !!monitor.isOver({ shallow: true }),
    }),
  }));

  const [res, setRes] = useState(<></>);

  useEffect(() => {
    const found = findId(curr, render);
    if (!isEmpty(found)) {
      if (found.children[i].current !== 0) {
        setRes(
          <div>
            <Block
              data={{
                ...found.children[i].current,
                left: 0,
                top: 0,
                pos: "content",
              }}
              dis={false}
            />
          </div>
        );
      }
    } else {
      setRes(<></>);
    }
  }, [render, curr, i, findId]);

  return (
    <div
      ref={dis ? undefined : drop}
      className="min-w-[40%] min-h-[20px] ml-2 bg-white clear-both border-2 border-black"
    >
      {res}
    </div>
  );
};

export default DropBox;
