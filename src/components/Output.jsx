import { useState } from "react";
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

  return res;
};

const makeJsChild = (child, mode = "js") => {
  const key = Object.keys(child)[0];

  console.log(child[key][0]);

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
        return `${" "}${child.current}${" "}`;
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

  switch (key) {
    case "EQUAL":
      let [_a, _op, _b] = obj[key];

      return (
        <div className="flex flex-row">
          (<div>{makeJsChild(_a)}</div>
          <div>{makeJsChild(_op)}</div>
          <div>{makeJsChild(_b)}</div>)
        </div>
      );
    case "IFELSE":
      let [_if, _to, _else] = obj[key];

      return (
        <div className="whitespace-nowrap">
          if (<div className="inline-block">{makeJsChild(_if)}</div>){`{`}
          <br />
          &nbsp;<div className="inline-block">{makeJsChild(_to)}</div>
          <br />
          {`}`} else {`{`} <br></br>
          &nbsp;<div className="inline-block">{makeJsChild(_else)}</div>{" "}
          <br></br>
          {`}`}
        </div>
      );
    case "AND":
      return (
        <div className="flex flex-row">
          (<div>{makeJsChild({ ...obj[key][0] })}</div>
          <div>{makeJsChild({ ...obj[key][1] })}</div>
          <div>{makeJsChild({ ...obj[key][2] })}</div>)
        </div>
      );

    case "NOT":
      return (
        <div className="flex flex-row">!{makeJsChild({ ...obj[key][0] })}</div>
      );
    case "BOOL":
      return (
        <div className="flex flex-row">{makeJsChild({ ...obj[key][0] })}</div>
      );

    case "APPLYN":
      return (
        <div className="whitespace-nowrap">
          for (let count = 0; count {`<`}=&nbsp;
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>;
          count++){`{`}
          <br />
          &nbsp;
          <div className="inline-block">{makeJsChild({ ...obj[key][1] })}</div>
          <br />
          {`}`}
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
          <div className="inline-block">{makeJsChild({ ...obj[key][1] })}</div>
          <br />
          {`}`}
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
          <div className="inline-block">{makeJsChild({ ...obj[key][4] })}</div>
          <br />
          {`}`}
        </div>
      );

    case "CONTROLL":
      return (
        <div className="whitespace-nowrap">
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>
        </div>
      );

    case "NUMBER":
      return (
        <div className="whitespace-nowrap">
          <div className="inline-block">{makeJsChild({ ...obj[key][0] })}</div>
        </div>
      );

    case "CALC":
      return (
        <div className="flex flex-row">
          (<div>{makeJsChild({ ...obj[key][0] })}</div>
          <div>{makeJsChild({ ...obj[key][1] })}</div>
          <div>{makeJsChild({ ...obj[key][2] })}</div>)
        </div>
      );
    case "MATHOPS":
      return (
        <div className="flex flex-row">
          <div className="flex flex-row">
            {makeJsChild({ ...obj[key][0] })}(
            <div className="flex flex-row">
              {makeJsChild({ ...obj[key][1] })}
            </div>
            )
          </div>
        </div>
      );
    case "POWER":
      return (
        <div className="flex flex-row">
          Math.pow(<div>{makeJsChild({ ...obj[key][0] })}</div>,{" "}
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "TRIG":
      return (
        <div className="flex flex-row">
          Math.<div>{makeJsChild({ ...obj[key][0] })}</div>(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "PI":
      return <div>Math.PI()</div>;
    case "ODDEVEN":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild({ ...obj[key][0] })}</div> % 2 =={" "}
          {obj[key][1].current === "isEven" ? 0 : 1}
        </div>
      );

    case "INCREASE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            (<div>{makeJsChild({ ...obj[key][0] })}</div> +=
            <div>{makeJsChild({ ...obj[key][1] })}</div>)
          </div>
        </div>
      );
    case "ROUND":
      return (
        <div className="flex flex-row">
          Math.{obj[key][0].current === "roof" ? "ceil" : "floor"}(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "REMAINDIVISON":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild({ ...obj[key][0] })}</div> &nbsp;%&nbsp;{" "}
          <div>{makeJsChild({ ...obj[key][1] })}</div>
        </div>
      );
    case "RANDOM":
      return (
        <div className="flex flex-row">
          Math.random() * (<div>{makeJsChild({ ...obj[key][1] })}</div> &nbsp;-
          &nbsp; <div>{makeJsChild({ ...obj[key][1] })}</div>) +&nbsp;{" "}
          <div>{makeJsChild({ ...obj[key][0] })}</div>
        </div>
      );
    case "TEXT":
      return <div>"{obj[key][0].current}"</div>;
    case "CONCAT":
      return (
        <div className="flex flex-row">
          <div>{obj[key][0].current === 0 ? '" "' : obj[key][0].current}</div>
          .concat(
          <div>{obj[key][1].current === 0 ? '" "' : obj[key][1].current}</div>)
        </div>
      );
    case "TEXTLENGTH":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length
        </div>
      );
    case "ISTEXTEMPTY":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length === 0
        </div>
      );
    case "TEXTENTRY":
      return (
        <div className="flex flex-row">
          {makeJsChild({ ...obj[key][0] })}.indexOf(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "TAKELETTERN":
      return (
        <div className="flex flex-row">
          {makeJsChild({ ...obj[key][0] })}.charAt(
          {makeJsChild({ ...obj[key][1] })})
        </div>
      );
    case "TEXTSUBSTRING":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.slice(
          {makeJsChild({ ...obj[key][1] })} , {makeJsChild({ ...obj[key][2] })})
        </div>
      );
    case "PRINT":
      return (
        <div className="flex flex-row">
          alert({makeJsChild({ ...obj[key][0] })})
        </div>
      );
    case "CREATEVARIABLE":
      return (
        <div className="flex flex-row">
          var{makeJsChild({ ...obj[key][0] })} ={" "}
          {makeJsChild({ ...obj[key][1] })}
        </div>
      );
    case "GETVARIABLE":
      return (
        <div className="flex flex-row">{makeJsChild({ ...obj[key][0] })}</div>
      );
    default:
      break;
  }

  return <div></div>;
};

const makePie = (obj) => {
  const key = Object.keys(obj)[0];
  const data = { ...obj[key] };

  switch (key) {
    case "EQUAL":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild(data[0], "py")}</div>
          <div className="ml-1 mr-1">
            {data[1].current === 0 ? "==" : makeJsChild(data[1], "py")}
          </div>
          <div>{makeJsChild(data[2], "py")}</div>
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
        </div>
      );

    case "NOT":
      return (
        <div className="flex flex-row">
          not {data[0].current === 0 ? "True" : makeJsChild(data[0], "py")}
        </div>
      );
    case "BOOL":
      return (
        <div className="flex flex-row">
          {data[0].current === 0 || data[0].current === "Истина"
            ? "True"
            : "False"}
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
        </div>
      );

    case "NUMBER":
      return (
        <div className="whitespace-nowrap">
          <div className="inline-block">{makeJsChild(data[0], "py")}</div>
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
            {res}
            {makeJsChild(data[1], "py")}
          </div>
        </div>
      );
    case "POWER":
      return (
        <div className="flex flex-row">
          pow({makeJsChild(data[0], "py")}, {makeJsChild(data[1], "py")})
        </div>
      );
    case "PI":
      return <div>math.pi</div>;
    case "ODDEVEN":
      return (
        <div className="flex flex-row">
          <div>{makeJsChild({ ...obj[key][0] })}</div>&nbsp;% 2 =={" "}
          {obj[key][1].current === "Четное" ? 0 : 1}
        </div>
      );

    case "INCREASE":
      return (
        <div className="whitespace-nowrap">
          <div className="flex flex-row">
            {makeJsChild({ ...obj[key][0] })}&nbsp;=&nbsp;
            {makeJsChild({ ...obj[key][0] })} &nbsp;+&nbsp;
            {makeJsChild({ ...obj[key][1] })}
          </div>
        </div>
      );
    case "ROUND":
      return (
        <div className="flex flex-row">
          math.{obj[key][0].current === "Вниз" ? "round" : "ceil"}(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "RANDOM":
      return (
        <div className="flex flex-row">
          random.randint({makeJsChild(data[0], "py")},{" "}
          {makeJsChild(data[1], "py")})
        </div>
      );
    case "TEXT":
      return <div>"{obj[key][0].current}"</div>;
    case "CONCAT":
      return (
        <div className="flex flex-row">
          <div>{obj[key][0].current === 0 ? '" "' : obj[key][0].current}</div>
          .concat(
          <div>{obj[key][1].current === 0 ? '" "' : obj[key][1].current}</div>)
        </div>
      );
    case "TEXTLENGTH":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length
        </div>
      );
    case "ISTEXTEMPTY":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.length === 0
        </div>
      );
    case "TEXTENTRY":
      return (
        <div className="flex flex-row">
          {makeJsChild({ ...obj[key][0] })}.indexOf(
          <div>{makeJsChild({ ...obj[key][1] })}</div>)
        </div>
      );
    case "TAKELETTERN":
      return (
        <div className="flex flex-row">
          {makeJsChild({ ...obj[key][0] })}.charAt(
          {makeJsChild({ ...obj[key][1] })})
        </div>
      );
    case "TEXTSUBSTRING":
      return (
        <div className="flex flex-row">
          {obj[key][0].current === 0 ? '" "' : obj[key][0].current}.slice(
          {makeJsChild({ ...obj[key][1] })} , {makeJsChild({ ...obj[key][2] })})
        </div>
      );
    case "PRINT":
      return (
        <div className="flex flex-row">
          alert({makeJsChild({ ...obj[key][0] })})
        </div>
      );
    case "CREATEVARIABLE":
      return (
        <div className="flex flex-row">
          var{makeJsChild({ ...obj[key][0] })} ={" "}
          {makeJsChild({ ...obj[key][1] })}
        </div>
      );
    case "GETVARIABLE":
      return (
        <div className="flex flex-row">{makeJsChild({ ...obj[key][0] })}</div>
      );
    default:
      break;
  }

  return <div></div>;
};

const Output = () => {
  const { render } = useBlock();
  const [res, setRes] = useState("");

  const handleClick = (e) => (mode) => {
    e.preventDefault();
    setRes("");

    const data = render.map((item) => stringlify(item));
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
    <div className="h-[100vh] min-w-[300px] sticky">
      <button
        className="ml-2 mt-2 p-2 text-white bg-slate-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        onClick={(e) => handleClick(e)("js")}
      >
        Js
      </button>
      <button
        className="ml-2 mt-2 p-2 text-white bg-slate-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        onClick={(e) => handleClick(e)("py")}
      >
        Python
      </button>
      <div id="res">{res}</div>
    </div>
  );
};

export default Output;
