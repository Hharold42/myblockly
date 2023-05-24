import { Form } from "react-bootstrap";
import DropBox from "./DropBox";
import { v4 as uuid } from "uuid";
import { useBlock } from "../BlocklyContext";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { useEffect, useState } from "react";

const Block = ({ data, dis }) => {
  const { left, top, children, form, id, pos, name } = data;
  const {
    variables,
    setRenderCurrent,
    addVar,
    removeFromActive,
    addAfter,
    render,
  } = useBlock();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      if (item.pos === "toolbox") {
      } else {
        removeFromActive(item.blockId);
        addAfter(id, item.blockId);
      }
    },
  }));

  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.BLOCK,
      item: () => {
        return { blockId: id, left: left, top: top, pos: pos, form: form };
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
        add = <DropBox dis={dis} curr={id} i={i} accept={"piece"} />;
        break;
      case "block":
        add = <DropBox dis={dis} curr={id} i={i} accept={"block"} />;
        break;
      case "droplist":
        const options = elem.options;

        add = (
          <Form.Select
            disabled={dis}
            onChange={handleCurrent}
            value={elem.current}
            className="w-[50%]"
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
            className="w-[50%]"
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
      <div key={i} className="ml-2 flex flex-row justify-between">
        {elem.name}
        {add}
      </div>
    );
  });

  const [after, setAfter] = useState(null);

  useEffect(() => {
    const found = render.find((item) => item.id === id);

    if (found && found.after.current !== 0) {
      const data = {
        ...render.find((item) => item.id === found.after.current),
      };
      setAfter(<Block data={data} dis={false} />);
    }
  }, [render, setAfter, id]);

  return (
    <div
      ref={drag}
      id={`tmpId${id}`}
      className={`border-2 border-black min-w-[200px] min-h-[50px] p-2 cursor-move ${bg} ${
        left + top === 0 ? "" : "absolute"
      } flex ${form === "block" ? "flex-col" : "flex-col"}`}
      style={{ left, top }}
      key={id}
    >
      <p className="text-sm text-gray-500">{form}</p>
      {name}
      <br />
      {lines}
      <div
        ref={dis ? undefined : drop}
        className="min-w-full min-h-[20px] bg-white clear-both border-2 border-black"
      >
        {after ? after : <p className="opacity-20">Далее</p>}
      </div>
    </div>
  );
};

export default Block;
