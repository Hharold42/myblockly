import { ItemTypes } from "../utils/constants";
import { useDrop } from "react-dnd";
import { useBlock } from "../BlocklyContext";
import Block from "./Block";
import Dropbin from "./Dropbin";

const Canvas = () => {
  const {
    addToRender,
    render,
    moveRenderedBlock,
    removeFromChildren,
    getScroll
  } = useBlock();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      const delta = monitor.getDifferenceFromInitialOffset();
      const addY =
        item.pos === "toolbox"
          ? Number(document.getElementById(`tmpId${item.blockId}`).offsetTop) -
            getScroll.current
          : 0;
      console.log("addY - ", addY, getScroll.current);
      const left = Math.round(
        item.pos === "toolbox"
          ? item.left + delta.x - 308.33
          : item.left + delta.x
      );
      const top = Math.round(item.top + delta.y + addY);
      console.log(delta);
      if (item.pos === "toolbox") addToRender(item.blockId, left, top);
      else if (item.pos === "canvas")
        moveRenderedBlock(item.blockId, left, top);
      else if (item.pos === "content") removeFromChildren(item.blockId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const canvasRender = render.map((data) => {
    return (
      <div key={data.id}>
        <Block data={data} dis={false} />
      </div>
    );
  });

  return (
    <div ref={drop} className="bg-white w-[100%] h-[100vh] relative">
      {canvasRender}
      <Dropbin />
    </div>
  );
};

export default Canvas;
