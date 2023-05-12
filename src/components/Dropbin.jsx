import { useDrop } from "react-dnd";
import { useBlock } from "../BlocklyContext";
import { ItemTypes } from "../utils/constants";

const Dropbin = () => {
  const { removeFromRender } = useBlock();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      console.log("did");
      removeFromRender(item.blockId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: !!monitor.isOver({ shallow: true }),
    }),
  }));

  return (
    <div
      ref={drop}
      className="bg-black w-[50px] h-[50px] absolute bottom-0 right-0 text-red-700 text-4xl text-center"
    >
      X
    </div>
  );
};

export default Dropbin;
