import { Form } from "react-bootstrap";
import DropBox from "./DropBox";
import { v4 as uuid } from "uuid";
import { useBlock } from "../BlocklyContext";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";

const Block = ({ data, dis }) => {
  const { left, top, children, form, id, pos, type } = data;
  const { variables, setRenderCurrent, addVar } = useBlock();

  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.BLOCK,
      item: () => {
        return { blockId: id, left: left, top: top, pos: pos };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  var bg = "black";

  switch (data.type) {
    case "logic":
      bg = "bg-blue-400";
      break;
    case "cycle":
      bg = "bg-green-400";
      break;
    case "math":
      bg = "bg-red-400";
      break;
    case "text":
      bg = "bg-yellow-400";
      break;
    case "list":
      bg = "bg-purple-400";
      break;
    case "variable":
      bg = "bg-white text-black";
      break;

    default:
      break;
  }

  const lines = children.map((elem, i) => {
    const handleCurrent = (e) => {
      e.stopPropagation();

      const value = e.target.value;
      setRenderCurrent(value, id, i);
    };

    var add = <></>;
    switch (elem.type) {
      case "piece":
        add = <DropBox dis={dis} curr={id} i={i} />;
        break;
      case "block":
        add = <DropBox dis={dis} curr={id} i={i} />;
        break;
      case "droplist":
        const options = elem.options;

        add = (
          <Form.Select
            disabled={dis}
            onChange={handleCurrent}
            value={elem.current}
          >
            {options.map((item) => (
              <option key={uuid()} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        );
        break;
      case "variable":
        add = (
          <Form.Select
            disabled={dis}
            value={elem.current}
            onChange={(e) => {
              if (e.target.value === "add") {
                const newVarName = prompt("Введите имя новой переменной");
                addVar(newVarName);
              }
              handleCurrent(e);
            }}
          >
            <option value="" key={uuid()}>
              Выбрать
            </option>
            <option value="add" key={uuid()}>
              Новая переменная
            </option>
            {variables.map((item) => (
              <option value={item} key={uuid()}>
                {item}
              </option>
            ))}
          </Form.Select>
        );
        break;
      case "number":
        add = (
          <input
            type="number"
            placeholder="number"
            disabled={dis}
            value={elem.current}
            onChange={handleCurrent}
          ></input>
        );
        break;
      case "string":
        add = (
          <input
            type="text"
            placeholder="text"
            disabled={dis}
            value={elem.current}
            onChange={handleCurrent}
          ></input>
        );
        break;
      default:
        break;
    }

    return (
      <div key={i} className="ml-2">
        {elem.name}
        {add}
      </div>
    );
  });

  const blockType = (
    <div>{form === "piece" ? <div>Piece</div> : <div>Block</div>}</div>
  );

  return (
    <div
      ref={drag}
      className={`border-2 border-black min-w-[50px] min-h-[50px] m-5 p-2 cursor-move ${bg} ${
        left + top === 0 ? "" : "absolute"
      } flex ${form === "block" ? "flex-col" : "flex-row"}`}
      style={{ left, top }}
      key={id}
    >
      {blockType}
      {lines}
    </div>
  );
};

export default Block;
