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
    name: "Если иначе",
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
    name: "Сравнить",
    shortcut: "EQUAL",
    attributes: [
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "",
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
    name: "И/ИЛИ",
    form: PIECE,
    shortcut: "AND",
    attributes: [
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "",
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
    name: "Отрицание",
    shortcut: "NOT",
    attributes: [{ name: "Не", shortcut: "CONNECT", type: PIECE }],
  },
  {
    id: 5,
    type: "logic",
    form: PIECE,
    name: "Логическое значение",
    shortcut: "BOOL",
    attributes: [
      {
        name: "",
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
    name: "Повторить N раз",
    shortcut: "APPLYN",
    attributes: [
      {
        name: "N",
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
    name: "Выполнять пока",
    shortcut: "WHILE",
    attributes: [
      {
        name: "Пока",
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
    id: 8,
    type: "cycle",
    form: BLOCK,
    name: "Цикл от А до Б с шагом",
    shortcut: "FOR",
    attributes: [
      {
        name: "Переменная",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Б",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Шаг",
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
    name: "Прервать цикл или перейти к следующей итерации",
    shortcut: "CONTROLL",
    attributes: [
      {
        name: "",
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
    name: "Число",
    shortcut: "NUMBER",
    attributes: [
      {
        name: "",
        shortcut: "INUMBER",
        type: NUMBER,
      },
    ],
  },
  {
    id: 12,
    type: "math",
    form: PIECE,
    name: "Выполнить операцию",
    shortcut: "CALC",
    attributes: [
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "",
        shortcut: "OP",
        type: DROPLIST,
        options: ["+", "-", "*", "/"],
      },
      {
        name: "Б",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 13,
    type: "math",
    form: PIECE,
    name: "Дополнительные математические операции",
    shortcut: "MATHOPS",
    attributes: [
      {
        name: "",
        shortcut: "OP",
        type: DROPLIST,
        options: ["кроень", "модуль", "-", "ln", "log10", "exp"],
      },
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 43,
    type: "math",
    form: PIECE,
    name: "Возвести в степень",
    shortcut: "POWER",
    attributes: [
      {
        name: "Число",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Степень",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 15,
    type: "math",
    form: PIECE,
    name: "Пи",
    shortcut: "PI",
    attributes: [
      {
        shortcut: "PI",
        name: "",
      },
    ],
  },
  {
    id: 16,
    type: "math",
    form: PIECE,
    name: "Четное/Нечетное",
    shortcut: "ODDEVEN",
    attributes: [
      {
        name: "Число",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "",
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
    name: "Увеличить значение на ",
    shortcut: "INCREASE",
    attributes: [
      {
        name: "Переменная",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "Увеличить на",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 18,
    type: "math",
    form: PIECE,
    name: "Округлить до большего или до меньшего",
    shortcut: "ROUND",
    attributes: [
      {
        name: "",
        shortcut: "OP",
        type: DROPLIST,
        options: ["Вверх", "Вниз"],
      },
      {
        name: "Число",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 21,
    type: "math",
    form: PIECE,
    name: "Случайное число",
    shortcut: "RANDOM",
    attributes: [
      {
        name: "Минимальная граница",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Максимальная граница",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 22,
    type: "text",
    form: PIECE,
    name: "Создать строку",
    shortcut: "TEXT",
    attributes: [
      {
        name: "Текст",
        shortcut: "TEXT",
        type: TEXT,
      },
    ],
  },
  {
    id: 23,
    type: "text",
    form: PIECE,
    name: "Сложить строки",
    shortcut: "CONCAT",
    attributes: [
      {
        name: "Строка 1",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Строка 2",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 25,
    type: "text",
    form: PIECE,
    name: "Длинна строки",
    shortcut: "TEXTLENGTH",
    attributes: [
      {
        name: "Строка",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 26,
    type: "text",
    form: PIECE,
    name: "Проверить строку на пустоту",
    shortcut: "ISTEXTEMPTY",
    attributes: [
      {
        name: "Строка",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 27,
    type: "text",
    form: PIECE,
    name: "Найти первое вхождение подстроки в строке",
    shortcut: "TEXTENTRY",
    attributes: [
      {
        name: "Переменная",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "Подстрока",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 28,
    type: "text",
    form: PIECE,
    name: "Найти значение символа в строке на позиции N",
    shortcut: "TAKELETTERN",
    attributes: [
      {
        name: "Переменная",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "N",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 29,
    type: "text",
    form: PIECE,
    name: "Вернуть подстроку в строке от А до Б",
    shortcut: "TEXTSUBSTRING",
    attributes: [
      {
        name: "Строка",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "А",
        shortcut: "CONNECT",
        type: PIECE,
      },
      {
        name: "Б",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 31,
    type: "text",
    form: BLOCK,
    name: "Вывести",
    shortcut: "PRINT",
    attributes: [
      {
        name: "Значение",
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
    name: "Создать переменную",
    shortcut: "CREATEVARIABLE",
    attributes: [
      {
        name: "Название переменной",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
      {
        name: "Значение переменной",
        shortcut: "CONNECT",
        type: PIECE,
      },
    ],
  },
  {
    id: 42,
    type: "variable",
    form: PIECE,
    name: "Получить значение переменной",
    shortcut: "GETVARIABLE",
    attributes: [
      {
        name: "Название переменной",
        shortcut: "VARIABLE",
        type: VARIABLE,
      },
    ],
  },
];

export default blocks;
