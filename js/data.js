const products = [
  {
    id: 1,
    title: "Гитара: пробное занятие",
    category: "guitar",
    price: 1500,
    isAvailable: true,
    image: "images/guitar-720.webp",
    description:
      "Индивидуальная программа «Гитара». 1 занятие на 60 минут. Расписание согласуется с преподавателем.",
    lessons: 1,
  },
  {
    id: 2,
    title: "Гитара: 4 занятия",
    category: "guitar",
    price: 6000,
    isAvailable: true,
    image: "images/guitar-720.webp",
    description:
      "Индивидуальная программа «Гитара». 4 занятия по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 4,
  },
  {
    id: 3,
    title: "Гитара: 8 занятий",
    category: "guitar",
    price: 12000,
    isAvailable: true,
    image: "images/guitar-720.webp",
    description:
      "Индивидуальная программа «Гитара». 8 занятий по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 8,
  },
  {
    id: 4,
    title: "Фортепиано: пробное занятие",
    category: "piano",
    price: 1700,
    isAvailable: true,
    image: "images/piano-720.webp",
    description:
      "Индивидуальная программа «Фортепиано». 1 занятие на 60 минут. Расписание согласуется с преподавателем.",
    lessons: 1,
  },
  {
    id: 5,
    title: "Фортепиано: 4 занятия",
    category: "piano",
    price: 6800,
    isAvailable: true,
    image: "images/piano-720.webp",
    description:
      "Индивидуальная программа «Фортепиано». 4 занятия по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 4,
  },
  {
    id: 6,
    title: "Фортепиано: 8 занятий",
    category: "piano",
    price: 13600,
    isAvailable: true,
    image: "images/piano-720.webp",
    description:
      "Индивидуальная программа «Фортепиано». 8 занятий по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 8,
  },
  {
    id: 7,
    title: "Вокал: пробное занятие",
    category: "vocal",
    price: 1600,
    isAvailable: true,
    image: "images/vocal-720.webp",
    description:
      "Индивидуальная программа «Вокал». 1 занятие на 60 минут. Расписание согласуется с преподавателем.",
    lessons: 1,
  },
  {
    id: 8,
    title: "Вокал: 4 занятия",
    category: "vocal",
    price: 6400,
    isAvailable: true,
    image: "images/vocal-720.webp",
    description:
      "Индивидуальная программа «Вокал». 4 занятия по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 4,
  },
  {
    id: 9,
    title: "Вокал: 8 занятий",
    category: "vocal",
    price: 12800,
    isAvailable: false,
    image: "images/vocal-720.webp",
    description:
      "Индивидуальная программа «Вокал». 8 занятий по 60 минут. Расписание согласуется с преподавателем.",
    lessons: 8,
  },
];
const formatPrice = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
// Общий помощник: текст всегда добавляется безопасно, без innerHTML.
function element(tag, text = "", className = "") {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.classList.add(...className.split(" "));
  return node;
}
function notify(text) {
  document.querySelector("#notice").textContent = text;
}
