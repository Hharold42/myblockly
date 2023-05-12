import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import blocks from "./data/toolbar";
import Block from "./components/Block";
import { v4 as uuid } from "uuid";
import { isEmpty } from "./utils/utils";

const BlockContext = createContext();
export const useBlock = () => useContext(BlockContext);

const BlockProvider = ({ children }) => {
  const toolBox = blocks.map((item) => {
    return {
      id: item.id,
      children: item.attributes.map((item) => ({
        ...item,
        current: 0,
      })),
      type: item.type,
      shortcut: item.shortcut,
      form: item.form,
      left: 0,
      top: 0,
      pos: "toolbox",
      name: item.name,
    };
  });
  const [render, setRender] = useState([]);
  const [variables, setVariables] = useState([]);

  const addVar = (variable) => {
    if (!variables.includes(variable)) {
      setVariables((prev) => [...prev, variable]);
    } else alert("Данная переменная уже создана");
  };

  const createBlock = (toolbox, id) => {
    if (toolbox) {
      const data = blocks[id];
      return <Block key={uuid()} data={data} toolbox={toolbox} />;
    }
  };

  const addToRender = (id, left, top) => {
    const data = toolBox.find((elem) => elem.id === id);

    setRender((prev) => [
      ...prev,
      {
        ...data,
        id: data.id + "-" + uuid().slice(0, 8),
        children: data.children,
        type: data.type,
        form: data.form,
        shortcut: data.shortcut,
        left: left,
        top: top,
        pos: "canvas",
      },
    ]);
  };

  const findIdInObj = (id, obj) => {
    let res = {};
    if (obj.id === id) {
      res = { ...obj };
    } else {
      obj.children.map((elem) => {
        if (typeof elem.current === "object" && elem.current !== null) {
          if (!isEmpty(findIdInObj(id, elem.current))) {
            res = findIdInObj(id, elem.current);
          }
        }
        return elem;
      });
    }

    return res;
  };

  const findId = (id, arr) => {
    let res = {};

    arr.map((item) => {
      if (!isEmpty(findIdInObj(id, item))) {
        res = findIdInObj(id, item);
      }

      return item;
    });

    return res;
  };

  const removeFromRender = (id) => {
    let res = {};

    setRender((prev) =>
      prev.filter((item) => {
        if (item.id !== id) {
          return true;
        }
        res = { ...item };
        return false;
      })
    );

    return res;
  };

  const removeFromChildren = useCallback(
    (id) => {
      let res = {};

      setRender((prev) =>
        prev.map((item) => {
          return {
            ...item,
            children: item.children.map((elem) => {
              if (elem.current.id === id) {
                res = { ...elem.current };
                return { ...elem, current: 0 };
              }
              return elem;
            }),
          };
        })
      );

      setRender((prev) => [...prev, res]);

      return res;
    },
    [setRender]
  );

  const setRenderCurrent = useCallback(
    (newCurr, id, i) => {
      if (i === -1) {
        setRender((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, after: newCurr } : item
          )
        );
      } else {
        setRender((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  children: item.children.map((elem, index) =>
                    index === i ? { ...elem, current: newCurr } : elem
                  ),
                }
              : item
          )
        );
      }
    },
    [setRender]
  );

  const moveRenderedBlock = useCallback(
    (id, left, top) => {
      setRender((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, left: left, top: top } : item
        )
      );
    },
    [setRender]
  );

  const providerValue = {
    render,
    setRender,
    createBlock,
    toolBox,
    variables,
    addVar,
    addToRender,
    moveRenderedBlock,
    setRenderCurrent,
    removeFromRender,
    findId,
    removeFromChildren,
  };

  useEffect(() => {
    console.log(render);
  }, [render]);

  return (
    <BlockContext.Provider value={providerValue}>
      {children}
    </BlockContext.Provider>
  );
};

export default BlockProvider;
