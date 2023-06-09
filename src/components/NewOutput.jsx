import React, { useState } from "react";
import { useBlock } from "../BlocklyContext";

const stringlify = (obj) => {
  const res = [];

  if (obj.children) {
    res.push({
      [obj.shortcut]: obj.children.map((item) => ({
        [item.shortcut]: stringlify(item.current),
        current: item.current,
      })),
    });
  }

  if (obj.after) {
    res[0][obj.shortcut].push({
      CONNECT: stringlify(obj.after.current),
      current: obj.after.current,
    });
  }

  return res;
};

const makeJsChild = (child, mode = "js") => {
  const key = Object.keys(child)[0];

  switch (key) {
    case "CONNECT":
      if (child[key].length !== 0) {
        if (mode === "js") return makeJs(child[key][0]);
        return makePie(child[key][0]);
      }

      return 0;
    case "OP":
      if (child.current !== 0) {
        switch (child.current) {
          case "sqrt":
            return `Math.sqrt`;
          case "mod":
            return `Math.abs`;
          case "log10":
            return `Math.log10`;
          case "exp":
            return `Math.exp`;

          default:
            break;
        }
        return child.current;
      }
      return <div></div>;
    case "VARIABLE":
      if (child.current !== 0) {
        return `${child.current}`;
      }
      return <div>i</div>;
    case "INUMBER":
      if (child.current !== 0) {
        return `${" "}${child.current}${" "}`;
      }
      return "0";
    default:
      break;
  }
};

const makeJs = (obj) => {
  const key = Object.keys(obj)[0];
  const data = { ...obj[key] };
  const last = data[Object.keys(data).length - 1];

  switch (key) {
    case "EQUAL":
      return (
        <div className="flex flex-row">
          {makeJsChild(data[0])}
          <div className="ml-1 mr-1">
            {data[1].current === 0 ? "==" : makeJsChild(data[1])}
          </div>
          {makeJsChild(data[2])}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "IFELSE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            if ({data[0].current === 0 ? "" : makeJsChild(data[0])}){`{`}
          </div>
          <div className="ml-3">
            {data[1].current === 0 ? "" : makeJsChild(data[1])}
          </div>
          <div>
            {`}`} else {"{"}
          </div>
          <div className="ml-3">
            {data[2].current === 0 ? "" : makeJsChild(data[2])}
          </div>
          <div>{`}`}</div>
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "AND":
      return (
        <div className="flex flex-row">
          (<div>{makeJsChild(data[0])}</div>
          <div>
            {data[1].current === 0 || data[1].current === "И" ? "&&" : "||"}
          </div>
          <div>{makeJsChild(data[2])}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "NOT":
      return (
        <div className="flex flex-row">
          !{makeJsChild({ ...obj[key][0] })}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "BOOL":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 || data[0].current === "Истина"
            ? "true"
            : "false"}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "APPLYN":
      return (
        <div className="whitespace-nowrap">
          for (let count = 0; count {`<`}=&nbsp;
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>;
          count++){`{`}
          <br />
          &nbsp;
          <div className="inline-block">
            {data[1].current === 0 ? "" : makeJsChild({ ...obj[key][1] })}
          </div>
          <br />
          {`}`}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "WHILE":
      return (
        <div className="whitespace-nowrap">
          while (
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>)
          {`{`}
          <br />
          &nbsp;{" "}
          <div className="inline-block">
            {data[1].current === 0 ? "" : makeJsChild({ ...obj[key][1] })}
          </div>
          <br />
          {`}`}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "FOR":
      return (
        <div className="whitespace-nowrap">
          for (let{" "}
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>{" "}
          ={" "}
          <div className="inline-block">{makeJsChild({ ...obj[key][1] })}</div>;{" "}
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>{" "}
          {`<`}=&nbsp;
          <div className="inline-block">{makeJsChild({ ...obj[key][2] })}</div>;
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>{" "}
          +={" "}
          <div className="inline-block">{makeJsChild({ ...obj[key][3] })}</div>)
          {`{`}
          <br />
          &nbsp;
          <div className="inline-block">
            {data[4].current === 0 ? "" : makeJsChild({ ...obj[key][4] })}
          </div>
          <br />
          {`}`}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "CONTROLL":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 || data[0].current === "Остановить"
            ? "break"
            : "continue"}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "NUMBER":
      return (
        <div className="whitespace-nowrap">
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "CALC":
      return (
        <div className="flex flex-row">
          ({makeJsChild({ ...obj[key][0] })}
          <div className="pl-1 pr-1">
            {data[1].current === 0 ? "+" : makeJsChild(data[1])}
          </div>
          {makeJsChild({ ...obj[key][2] })})
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "MATHOPS":
      let op = data[0].current;
      let res = "Math.sqrt";

      switch (op) {
        case "корень":
          res = "Math.sqrt";
          break;
        case "модуль":
          res = "Math.abs";
          break;
        case "-":
          res = "-";
          break;
        case "ln":
          res = "Math.log";
          break;
        case "log10":
          res = "Math.log10";
          break;
        case "exp":
          res = "Math.exp";
          break;
        default:
          break;
      }

      return (
        <div className="flex flex-row">
          <div>
            {res}({makeJsChild(data[1])})
            {last.current !== 0 ? makeJsChild(last) : ""}
          </div>
        </div>
      );
    case "POWER":
      return (
        <div className="flex flex-row">
          Math.pow(<div>{makeJsChild({ ...obj[key][0] })}</div>,{" "}
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TRIG":
      return (
        <div className="flex flex-row">
          Math.<div>{makeJsChild({ ...obj[key][0] })}</div>(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "PI":
      return <div>Math.PI</div>;
    case "ODDEVEN":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild(data[0])}</div>&nbsp;% 2 =={" "}
          {obj[key][1].current === "Четное?" ? 0 : 1}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );

    case "INCREASE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            (<div>{makeJsChild({ ...obj[key][0] })}</div> +=
            <div>{makeJsChild({ ...obj[key][1] })}</div>)
          </div>
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "ROUND":
      return (
        <div className="flex flex-row">
          Math.{obj[key][0].current === "Вниз" ? "floor" : "ceil"}(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "RANDOM":
      return (
        <div className="flex flex-row">
          Math.random() * (<div>{makeJsChild({ ...obj[key][1] })}</div> &nbsp;-
          &nbsp; <div>{makeJsChild({ ...obj[key][1] })}</div>) +&nbsp;{" "}
          <div>{makeJsChild({ ...obj[key][0] })}</div>
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TEXT":
      return (
        <div>
          "{obj[key][0].current}"{last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "CONCAT":
      return (
        <div className="flex flex-row">
          <div>{obj[key][0].current === 0 ? '" "' : makeJsChild(data[0])}</div>
          .concat(
          <div>{obj[key][1].current === 0 ? '" "' : makeJsChild(data[1])}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TEXTLENGTH":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "ISTEXTEMPTY":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length === 0
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TEXTENTRY":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 ? "''" : makeJsChild(data[0])}.indexOf(
          <div>{data[1].current === 0 ? "''" : makeJsChild(data[1])}</div>)
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TAKELETTERN":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 ? "''" : makeJsChild(data[0])}.charAt(
          {makeJsChild({ ...obj[key][1] })})
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "TEXTSUBSTRING":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.slice(
          {makeJsChild({ ...obj[key][1] })} , {makeJsChild({ ...obj[key][2] })})
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "PRINT":
      return (
        <div className="flex flex-row">
          alert({data[0].current === 0 ? "''" : makeJsChild(data[0])})
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "CREATEVARIABLE":
      return (
        <div className="flex flex-row">
          var&nbsp;{makeJsChild({ ...obj[key][0] })} ={" "}
          {makeJsChild({ ...obj[key][1] })}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    case "GETVARIABLE":
      return (
        <div className="flex flex-row">
          {makeJsChild({ ...obj[key][0] })}
          {last.current !== 0 ? makeJsChild(last) : ""}
        </div>
      );
    default:
      break;
  }

  return <div></div>;
};

const makePie = (obj) => {
  const key = Object.keys(obj)[0];
  const data = { ...obj[key] };
  const last = data[Object.keys(data).length - 1];

  switch (key) {
    case "EQUAL":
      return (
        <div className="flex flex-row">
          {makeJsChild(data[0], "py")}
          <div className="ml-1 mr-1">
            {data[1].current === 0 ? "==" : makeJsChild(data[1], "py")}
          </div>
          {makeJsChild(data[2], "py")}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "IFELSE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            if&nbsp;
            {data[0].current !== 0 ? makeJsChild(data[0], "py") : "False"}:
          </div>
          <div className="flex flex-row ml-3">
            {makeJsChild(data[1]) !== 0 ? makeJsChild(data[1], "py") : "pass"}
          </div>
          <div className="flex flex-row">else:</div>
          <div className="flex flex-row ml-3">
            {makeJsChild(data[2]) !== 0 ? makeJsChild(data[2], "py") : "pass"}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "AND":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild(data[0], "py")}</div>
          <div className="ml-1 mr-1">
            {data[1].current === "ИЛИ" ? "or" : "and"}
          </div>
          <div>{makeJsChild(data[2], "py")}</div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "NOT":
      return (
        <div className="flex flex-row">
          not {data[0].current === 0 ? "True" : makeJsChild(data[0], "py")}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "BOOL":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 || data[0].current === "Истина"
            ? "True"
            : "False"}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "APPLYN":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            for count in range&nbsp;{makeJsChild(data[0], "py")}:
          </div>
          <div className="flex flex-row ml-3">
            {makeJsChild(data[1]) !== 0 ? makeJsChild(data[1], "py") : "pass"}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "WHILE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            while&nbsp;
            {data[0].current !== 0 ? makeJsChild(data[0], "py") : "False"}:
          </div>
          <div className="flex flex-row ml-3">
            {makeJsChild(data[1]) !== 0 ? makeJsChild(data[1], "py") : "pass"}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "FOR":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            for&nbsp;{makeJsChild(data[0], "py")}&nbsp;in range(
            {data[1].currnt !== 0 ? data[1].current : 0},{" "}
            {data[2].currnt !== 0 ? data[2].current : 0},{" "}
            {data[3].current !== 0 ? data[3].current : 1}):
          </div>
          <div className="flex flex-row ml-3">
            {makeJsChild(data[4]) !== 0 ? makeJsChild(data[4], "py") : "pass"}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "CONTROLL":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            {data[0].current === 0 || data[0].current === "Остановить"
              ? "break"
              : "continue"}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "NUMBER":
      return (
        <div className="whitespace-nowrap">
          <div className="inline-block">{makeJsChild(data[0], "py")}</div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "CALC":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild(data[0], "py")}</div>
          <div className="ml-1 mr-1">
            {data[1].current === 0 ? "+" : makeJsChild(data[1], "py")}
          </div>
          <div>{makeJsChild(data[2], "py")}</div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "MATHOPS":
      let op = data[0].current;
      let res = "math.sqrt";

      switch (op) {
        case "корень":
          res = "math.sqrt";
          break;
        case "модуль":
          res = "abs";
          break;
        case "-":
          res = "-";
          break;
        case "ln":
          res = "math.log";
          break;
        case "log10":
          res = "math.log10";
          break;
        case "exp":
          res = "math.exp";
          break;
        default:
          break;
      }

      return (
        <div className="flex flex-row">
          <div>
            {res}({makeJsChild(data[1], "py")})
            {last.current !== 0 ? makeJsChild(last, "py") : ""}
          </div>
        </div>
      );
    case "POWER":
      return (
        <div className="flex flex-row">
          pow({makeJsChild(data[0], "py")}, {makeJsChild(data[1], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "PI":
      return <div>math.pi</div>;
    case "ODDEVEN":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild(data[0], "py")}</div>&nbsp;% 2 =={" "}
          {obj[key][1].current === "Четное?" ? 0 : 1}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );

    case "INCREASE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            {makeJsChild(data[0], "py")}&nbsp;=&nbsp;
            {makeJsChild(data[0], "py")} &nbsp;+&nbsp;
            {makeJsChild(data[1], "py")}
          </div>
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "ROUND":
      return (
        <div className="flex flex-row">
          math.{obj[key][0].current === "Вниз" ? "round" : "ceil"}(
          <div>{makeJsChild(data[1])}</div>)
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "RANDOM":
      return (
        <div className="flex flex-row">
          random.randint({makeJsChild(data[0], "py")},{" "}
          {makeJsChild(data[1], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "TEXT":
      return (
        <div>
          '{data[0].current}'{last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "CONCAT":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 ? "''" : makeJsChild(data[0], "py")}
          &nbsp;+&nbsp;
          {data[1].current === 0 ? "''" : makeJsChild(data[1], "py")}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "TEXTLENGTH":
      return (
        <div className="flex flex-row">
          len({data[0].current === 0 ? "''" : makeJsChild(data[0], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "ISTEXTEMPTY":
      return (
        <div className="flex flex-row">
          bool({data[0].current === 0 ? "''" : makeJsChild(data[0], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "TEXTENTRY":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 ? "''" : makeJsChild(data[0], "py")}.find(
          {data[1].current === 0 ? "''" : makeJsChild(data[1], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "TAKELETTERN":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 ? "''" : makeJsChild(data[0], "py")}[
          {makeJsChild(data[1], "py")}]
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "TEXTSUBSTRING":
      return (
        <div className="flex flex-row">
          {makeJsChild(data[0], "py")}[{makeJsChild(data[1], "py")},{" "}
          {makeJsChild(data[2], "py")}]
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "PRINT":
      return (
        <div className="flex flex-row">
          print({data[0].current === 0 ? "''" : makeJsChild(data[0], "py")})
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "CREATEVARIABLE":
      return (
        <div className="flex flex-row">
          {makeJsChild(data[0], "py")} = {makeJsChild(data[1], "py")}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    case "GETVARIABLE":
      return (
        <div className="flex flex-row">
          {makeJsChild(data[0], "py")}
          {last.current !== 0 ? makeJsChild(last, "py") : ""}
        </div>
      );
    default:
      break;
  }

  return <div></div>;
};

const convert2v3 = (obj, source) => {
  let newChildren = obj.children.map((child) => {
    if (child.current !== 0 && child.shortcut === "CONNECT") {
      return {
        ...child,
        current: convert2v3(
          source.find((elem) => elem.id === child.current),
          source
        ),
      };
    }
    return child;
  });

  let after = source.find((elem) => elem.id === obj.after.current)
    ? convert2v3(
        source.find((elem) => elem.id === obj.after.current),
        source
      )
    : 0;

  return {
    ...obj,
    children: newChildren,
    after: { ...obj.after, current: after },
  };
};

const NewOutput = () => {
  const { render, activeRender } = useBlock();
  const [res, setRes] = useState("");

  // const formattedRender = render.map((item) => {
  //   let newChildren = item.children.map((child) => {
  //     if (child.current !== 0 && child.shortcut === "CONNECT") {
  //       return {
  //         ...child,
  //         current: render.find((elem) => elem.id === child.current),
  //       };
  //     }

  //     return child;
  //   });

  //   let newAfter = render.find((elem) => elem.id === item.after.current)
  //     ? render.find((elem) => elem.id === item.after.current)
  //     : 0;

  //   return {
  //     ...item,
  //     children: newChildren,
  //     after: { ...item.after, current: newAfter },
  //   };
  // });

  const handleClick = (e) => (mode) => {
    e.preventDefault();
    setRes("");

    const formattedRender = render.map((item) => convert2v3(item, render));

    const formattedActive = activeRender.map((item) =>
      formattedRender.find((elem) => elem.id === item)
    );

    const data = formattedActive.map((item) => stringlify(item));

    console.log(data);
    if (mode === "js") {
      data.map((elem) => {
        setRes((prev) => (
          <div>
            {prev}
            {makeJs(elem[0])}
          </div>
        ));

        return elem;
      });
    } else if (mode === "py") {
      data.map((elem) => {
        setRes((prev) => (
          <div>
            {prev}
            {makePie(elem[0])}
          </div>
        ));

        return elem;
      });
    }
  };

  return (
    <div className="h-[100vh] min-w-[300px] sticky bg-slate-300">
      <button
        onClick={(e) => handleClick(e)("js")}
        className="ml-2 mt-2 p-2 text-white bg-slate-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      >
        Js
      </button>
      <button
        onClick={(e) => handleClick(e)("py")}
        className="ml-2 mt-2 p-2 text-white bg-slate-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      >
        Python
      </button>
      <p id="res" className="m-2 bg-white h-[90%]">
        {res}
      </p>
    </div>
  );
};

export default NewOutput;
