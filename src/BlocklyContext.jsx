import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import blocks from "./data/toolbar";
import { v4 as uuid } from "uuid";
import { isEmpty } from "./utils/utils";

//создание пустого контекста
const BlockContext = createContext();
//экспорт кастомного хука для доступа к контексту
export const useBlock = () => useContext(BlockContext);

//заполнение контекста данными
const BlockProvider = ({ children }) => {
  //преобразование статичных данных в данные для отображения в Левом меню блоков
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
      after: {
        name: "Далее",
        shortcut: "CONNECT",
        type: "all",
        current: 0,
      },
    };
  });
  //состояние render отвечает за динамическое хранение данных отображаемых на канвасе. setRender() - функция для изменения состояния имеет перегрузку в виде serRender(*предыдущее состояние* => ())
  const [render, setRender] = useState([]);
  const [activeRender, setActiveRender] = useState([]);
  //здесь хранятся переменные для блока "Переменная"
  const [variables, setVariables] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  //функция добавления новой переменной
  const addVar = (variable) => {
    if (!variables.includes(variable)) {
      setVariables((prev) => [...prev, variable]);
    } else alert("Данная переменная уже создана");
  };

  //добавляет блок в канвас с заданной позицией
  const addToRender = (id, left, top) => {
    const data = toolBox.find((elem) => elem.id === id);

    const newElem = {
      ...data,
      id: data.id + "-" + uuid().slice(0, 8),
      left: left,
      top: top,
      pos: "canvas",
    };

    setActiveRender((prev) => [...prev, newElem.id]);

    setRender((prev) => [...prev, newElem]);
  };

  const removeFromActive = (id) => {
    setRender((prev) =>
      prev.map((item) => (item.id === id ? { ...item, left: 0, top: 0 } : item))
    );
    setActiveRender((prev) => prev.filter((elem) => elem !== id));
  };

  const addAfter = (id, after) => {
    setRender((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, after: { ...item.after, current: after } }
          : item
      )
    );
  };

  const getScroll = useRef(null);
  getScroll.current = scrollY;

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

  //ищет объект в канвасе
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

  //удаляет объект из канваса
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

  const removeFromChildren = (id) => {
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
  };

  //* Работает нормально
  //Добавляет блок внутрь дргугого блока
  const setRenderCurrent = useCallback(
    (newCurr, id, i) => {
      setRender((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              children: item.children.map((child, index) => {
                if (index === i) {
                  return { ...child, current: newCurr };
                }

                return child;
              }),
            };
          }
          return item;
        })
      );
    },
    [setRender]
  );

  //Обновляет позицию блока в канвасе
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
    toolBox,
    variables,
    addVar,
    addToRender,
    moveRenderedBlock,
    setRenderCurrent,
    removeFromRender,
    findId,
    removeFromChildren,
    scrollY,
    setScrollY,
    getScroll,
    activeRender,
    removeFromActive,
    addAfter,
  };

  //? раскомментировать для поиска ошибок
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
