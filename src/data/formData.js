const CATEGORIES = [
  { value: 1, title: "کالای دیجیتال" },
  { value: 2, title: "کتاب و لوازم التحریر" },
  { value: 3, title: "خانه و آشپزخانه" },
  { value: 4, title: "زیبایی و سلامت" },
];
const BRANDS = {
  1: [
    { value: 10, label: "اپل" },
    { value: 11, label: "سامسونگ" },
    { value: 12, label: "هواوی" },
    { value: 13, label: "شیائومی" },
  ],
  2: [
    { value: 14, label: "فابر کاستل" },
    { value: 15, label: "پاپکو" },
    { value: 16, label: "استدلر" },
    { value: 17, label: "پنتر" },
  ],
  3: [
    { value: 18, label: "ایکیا" },
    { value: 19, label: "دوو" },
    { value: 20, label: "بوش" },
    { value: 21, label: "ال جی" },
  ],
  4: [
    { value: 22, label: "اورال-بی" },
    { value: 23, label: "سینره" },
    { value: 24, label: "مای" },
    { value: 25, label: "نیوآ" },
  ],
};

const MAX = {
  1: { beginning: 0, end: 10000 },
  2: { beginning: 0, end: 1000 },
  3: { beginning: 0, end: 100000 },
  4: { beginning: 0, end: 100 },
};

export const formData = [
  {
    type: "text",
    name: "productName",
    label: "نام کالا",
  },

  {
    type: "checkbox-group",
    name: "seller-type",
    label: "نوع فروشنده",
    options: [
      { value: 100, label: "فروشنده رسمی" },
      { value: 101, label: "فروشنده برگزیده" },
      { value: 102, label: "دیجی‌کالا" },
      { value: 103, label: "کسب و کارهای بومی" },
    ],
  },
  {
    type: "checkbox",
    name: "exist",
    value: 1000,
    label: "فقط کالاهای موجود",
    children: ["provider"],
  },
  {
    type: "dropdown",
    name: "provider",
    label: "انبار",
    parent: "exist",
    options: [
      { value: 1, title: "دیجی کالا" },
      { value: 2, title: "سایر" },
    ],
  },
  {
    type: "dropdown",
    name: "category",
    label: "دسته بندی",
    options: CATEGORIES,
    children: ["brand", "priceRange"],
  },
  {
    type: "checkbox-group",
    name: "brand",
    label: "برند",
    options: BRANDS,
    parent: "category",
  },

  {
    type: "range",
    name: "priceRange",
    options: MAX,
    label: "محدوده قیمت",
    parent: "category",
  },
];
