const VARIABLE = "variable";
const PIECE = "piece";
const BLOCK = "block";
const DROPLIST = "droplist";
const NUMBER = "number";
const TEXT = "string";

const blocks = [
  {
    id: 1,
    type: "logic",
    form: BLOCK,
    shortcut: "IFELSE",
    attributes: [
      {
        name: "Если",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Выполнить",
        shortcut: "CONNECT",
        type: BLOCK,
      },
      {
        name: "Иначе",
        shortcut: "CONNECT",
        type: BLOCK,
      },
    ],
  },
  {
    id: 2,
    type: "logic",
    form: PIECE,
    shortcut: "EQUAL",
    attributes: [
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Операция",
        shortcut: "OP",
        type: DROPLIST,
        options: ["==", "!=", ">", "<", ">=", "<="],
      },
      {
        name: "Б",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 3,
    type: "logic",
    form: PIECE,
    shortcut: "AND",
    attributes: [
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "и/или",
        shortcut: "OP",
        type: DROPLIST,
        options: ["И", "ИЛИ"],
      },
      {
        name: "Б",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 4,
    type: "logic",
    form: PIECE,
    shortcut: "NOT",
    attributes: [{ name: "Не", shortcut: "CONNECT", type: PIECE }],
  },
  {
    id: 5,
    type: "logic",
    form: PIECE,
    shortcut: "BOOL",
    attributes: [
      {
        name: "Истина/ложь",
        type: DROPLIST,
        shortcut: "OP",
        options: ["Истина", "Ложь"],
      },
    ],
  },
  {
    id: 6,
    type: "cycle",
    form: BLOCK,
    shortcut: "APPLYN",
    attributes: [
      {
        name: "Количество",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Выполнить",
        shortcut: "CONNECT",
        type: BLOCK,
      },
    ],
  },
  {
    id: 7,
    type: "cycle",
    form: BLOCK,
    shortcut: "WHILE",
    attributes: [
      {
        name: "Выполнить пока",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "todo",
        shortcut: "CONNECT",
        type: BLOCK,
      },
    ],
  },
  {
    id: 8,
    type: "cycle",
    form: BLOCK,
    shortcut: "FOR",
    attributes: [
      {
        name: "var",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "from",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "to",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "step",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "todo",
        shortcut: "CONNECT",
        type: BLOCK,
      },
    ],
  },
  // {
  //   id: 9,
  //   type: "cycle",
  //   form: BLOCK,
  //   shortcut: "FOREACH",
  //   attributes: [
  //     {
  //       name: "var",
  //       shortcut: "VARIABLE",
  //       type: VARIABLE,
  //     },
  //     {
  //       name: "list",
  //       shortcut: "LIST",
  //       type: PIECE,
  //     },
  //     {
  //       name: "todo",
  //       shortcut: "CONNECT",
  //       type: BLOCK,
  //     },
  //   ],
  // },
  {
    id: 10,
    type: "cycle",
    form: BLOCK,
    shortcut: "CONTROLL",
    attributes: [
      {
        name: "controll",
        shortcut: "OP",
        type: DROPLIST,
        options: ["Остановить", "Перейти к следующему"],
      },
    ],
  },
  {
    id: 11,
    type: "math",
    form: PIECE,
    shortcut: "NUMBER",
    attributes: [
      {
        name: NUMBER,
        shortcut: "INUMBER",
        type: NUMBER,
      },
    ],
  },
  {
    id: 12,
    type: "math",
    form: PIECE,
    shortcut: "CALC",
    attributes: [
      {
        name: "a",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "operator",
        shortcut: "OP",
        type: DROPLIST,
        options: ["+", "-", "*", "/"],
      },
      {
        name: "b",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 13,
    type: "math",
    form: PIECE,
    shortcut: "MATHOPS",
    attributes: [
      {
        name: "operator",
        shortcut: "OP",
        type: DROPLIST,
        options: ["кроень", "модуль", "-", "ln", "log10", "exp"],
      },
      {
        name: "a",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 43,
    type: "math",
    form: PIECE,
    shortcut: "POWER",
    attributes: [
      {
        name: "number",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "power",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 15,
    type: "math",
    form: PIECE,
    shortcut: "PI",
    attributes: [
      {
        shortcut: "PI",
        name: "pi",
      },
    ],
  },
  {
    id: 16,
    type: "math",
    form: PIECE,
    shortcut: "ODDEVEN",
    attributes: [
      {
        name: "a",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "operator",
        type: DROPLIST,
        shortcut: "OP",
        options: ["Нечетное?", "Четное?"],
      },
    ],
  },
  {
    id: 17,
    type: "math",
    form: BLOCK,
    shortcut: "INCREASE",
    attributes: [
      {
        name: "var",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "increaseBy",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 18,
    type: "math",
    form: PIECE,
    shortcut: "ROUND",
    attributes: [
      {
        name: "floor or roof",
        shortcut: "OP",
        type: DROPLIST,
        options: ["Вверх", "Вниз"],
      },
      {
        name: "a",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 21,
    type: "math",
    form: PIECE,
    shortcut: "RANDOM",
    attributes: [
      {
        name: "min",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "max",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 22,
    type: "text",
    form: PIECE,
    shortcut: "TEXT",
    attributes: [
      {
        name: "text",
        shortcut: "TEXT",
        type: TEXT,
      },
    ],
  },
  {
    id: 23,
    type: "text",
    form: PIECE,
    shortcut: "CONCAT",
    attributes: [
      {
        name: "Строка",
        shortcut: "CONNECT" ,
        type: PIECE,
      },
      {
        name: "Строка",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 25,
    type: "text",
    form: PIECE,
    shortcut: "TEXTLENGTH",
    attributes: [
      {
        name: "a",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 26,
    type: "text",
    form: PIECE,
    shortcut: "ISTEXTEMPTY",
    attributes: [
      {
        name: "empty",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 27,
    type: "text",
    form: PIECE,
    shortcut: "TEXTENTRY",
    attributes: [
      {
        name: "var",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "find",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 28,
    type: "text",
    form: PIECE,
    shortcut: "TAKELETTERN",
    attributes: [
      {
        name: "var",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "n",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 29,
    type: "text",
    form: PIECE,
    shortcut: "TEXTSUBSTRING",
    attributes: [
      {
        name: "var",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "start",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "end",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 31,
    type: "text",
    form: BLOCK,
    shortcut: "PRINT",
    attributes: [
      {
        name: "toPrint",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  // {
  //   id: 33,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "CREATECLEANLIST",
  //   attributes: [
  //     {
  //       name: "create clean list",
  //       shortcut: "CREATELIST",
  //       type: "create_c-list",
  //     },
  //   ],
  // },
  // {
  //   id: 34,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "CREATELISTFROM",
  //   attributes: [
  //     {
  //       name: "number of elements",
  //       shortcut: "NUMBER",
  //       type: NUMBER,
  //     },
  //   ],
  // },
  // {
  //   id: 35,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "CREATELIST",
  //   attributes: [
  //     {
  //       name: "element",
  //       shortcut: "CONNECT",
  //       type: PIECE,
  //     },
  //     {
  //       name: "number of elements",
  //       shortcut: "CONNECT",
  //       type: PIECE,
  //     },
  //   ],
  // },
  // {
  //   id: 36,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "LISTLENGTH",
  //   attributes: [
  //     {
  //       name: "list",
  //       shortcut: "LIST",
  //       type: PIECE,
  //     },
  //   ],
  // },
  // {
  //   id: 37,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "LISTENTRY",
  //   attributes: [
  //     {
  //       name: "list",
  //       shortcut: "VARIABLE",
  //       type: VARIABLE,
  //     },
  //     {
  //       name: "pos",
  //       type: DROPLIST,
  //       shortcut: "OP",
  //       options: ["first", "last"],
  //     },
  //     {
  //       name: "element",
  //       shortcut: "CONNECT",
  //       type: PIECE,
  //     },
  //   ],
  // },
  // {
  //   id: 38,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "LISTOFN",
  //   attributes: [
  //     {
  //       name: "list",
  //       shortcut: "LIST",
  //       type: VARIABLE,
  //     },
  //     {
  //       name: "action",
  //       type: DROPLIST,
  //       shortcut: "OP",
  //       options: ["take", "pop", "remove", "put", "push"],
  //     },
  //     {
  //       name: "n",
  //       shortcut: "NUMBER",
  //       type: NUMBER,
  //     },
  //   ],
  // },
  // {
  //   id: 39,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "SUBLISTAB",
  //   attributes: [
  //     {
  //       name: "list",
  //       shortcut: "VARIABLE",
  //       type: VARIABLE,
  //     },
  //     {
  //       name: "A",
  //       shortcut: "NUMBER",
  //       type: NUMBER,
  //     },
  //     {
  //       name: "B",
  //       shortcut: "NUMBER",
  //       type: NUMBER,
  //     },
  //   ],
  // },
  // {
  //   id: 40,
  //   type: "list",
  //   form: PIECE,
  //   shortcut: "SPLITJOIN",
  //   attributes: [
  //     {
  //       name: "action",
  //       type: DROPLIST,
  //       shortcut: "OP",
  //       options: ["split", "join"],
  //     },
  //     {
  //       name: "list",
  //       shortcut: "VARIABLE",
  //       type: VARIABLE,
  //     },
  //     {
  //       name: "delimiter",
  //       shortcut: "CONNECT",
  //       type: PIECE,
  //     },
  //   ],
  // },
  {
    id: 41,
    type: "variable",
    form: BLOCK,
    shortcut: "CREATEVARIABLE",
    attributes: [
      {
        name: "name",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "value",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 42,
    type: "variable",
    form: PIECE,
    shortcut: "GETVARIABLE",
    attributes: [
      {
        name: "variable",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
    ],
  },
];

export default blocks;
