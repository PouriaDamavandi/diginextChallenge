import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter, Link } from "react-router-dom";
import App from "../App";
import FormType from "../constants/FormType";
import { formData } from "../data/formData";
import { AND_SIGN, EQUAL_SIGN } from "../hooks/useFilter";

const INPUT_VALUE = "1234";

const anotherFormData = [
  {
    type: "text",
    name: "text",
  },
  {
    type: "dropdown",
    name: "category2",
    options: [{ value: 1, title: "1" }],
  },
  {
    type: "dropdown",
    name: "category",
    options: [{ value: 1, title: "1" }],
    children: ["brand"],
  },
  {
    type: "dropdown",
    name: "brand",
    options: {
      1: [{ value: 1, title: "1" }],
    },
    parent: "category",
    children: ["priceRange"],
  },
  {
    type: "dropdown",
    name: "priceRange",
    options: {
      1: [{ value: 1, title: "1" }],
    },
    parent: "brand",
  },
];

function childHasManyRelation(data) {
  if (data.options && !Array.isArray(data.options)) {
    return true;
  }
}

function expectOr(...tests) {
  try {
    tests.shift()();
  } catch (e) {
    if (tests.length) expectOr(...tests);
    else throw e;
  }
}
function testUrlContent(d, url, toHave = true) {
  if (toHave) {
    expectOr(
      () => expect(url).toHaveTextContent(`${d.name}${EQUAL_SIGN}`),
      () => expect(url).toHaveTextContent(`${d.name}=`)
    );
  } else {
    expectOr(
      () => expect(url).not.toHaveTextContent(`${d.name}${EQUAL_SIGN}`),
      () => expect(url).not.toHaveTextContent(`${d.name}=`)
    );
  }
}

const inputTestId = (name) => screen.getByTestId(`input-${name}`);
const textareaTestId = (name) => screen.getByTestId(`textarea-${name}`);
const selectTestId = (name) => screen.getByTestId(`select-${name}`);
const checkboxTestId = (name) => screen.getByTestId(`checkbox-${name}`);
const groupCheckboxTestId = (name) =>
  screen.getByTestId(`checkbox-group-${name}`);
const rangeMaxTestId = (name) => screen.getByTestId(`range-max-${name}`);
const rangeMinTestId = (name) => screen.getByTestId(`range-min-${name}`);
const chipsButton = (name) => screen.getByTestId(`chips-${name}`);

const getFormItem = (type, name) => {
  switch (type) {
    case FormType.CHECKBOX:
      return checkboxTestId(name);
    case FormType.CHECKBOX_GROUP:
      return checkboxTestId(name);
    case FormType.RANGE:
      return rangeMaxTestId(name);
    case FormType.DROPDOWN:
      return selectTestId(name);
    case FormType.TEXT:
      return inputTestId(name);
    case FormType.TEXTAREA:
      return textareaTestId(name);

    default:
      return undefined;
  }
};

function getValueOnType(d) {
  if (childHasManyRelation(d)) {
  } else {
    if (d.type === FormType.CHECKBOX) {
      return encodeURIComponent(d.value);
    } else if (d.type === FormType.DROPDOWN) {
      return encodeURIComponent(`${d.options[0].value}`);
    } else if (d.type === FormType.TEXT || d.type === FormType.TEXTAREA) {
      return encodeURIComponent(INPUT_VALUE);
    } else if (d.type === FormType.CHECKBOX_GROUP) {
      return encodeURIComponent(d.options[0].value);
    }
  }
}

function getItemOnType(d, parent) {
  if (d.type === FormType.CHECKBOX_GROUP) {
    if (childHasManyRelation(d)) {
      return getFormItem(d.type, d.options[getValueOnType(parent)][0].value);
    }
    return getFormItem(d.type, d.options[0].value);
  }
  return getFormItem(d.type, d.name);
}

function checkValueOnType(d, invert = false) {
  let value;
  if (childHasManyRelation(d)) {
  } else {
    value = getValueOnType(d);
    const item = getItemOnType(d);
    if (d.type === FormType.CHECKBOX) {
      expect(item.checked).toBe(true);
    } else if (d.type === FormType.DROPDOWN) {
      expect(`${encodeURIComponent(item.value)}`).toBe(value);
    } else if (d.type === FormType.TEXT) {
      expect(`${encodeURIComponent(item.value)}`).toBe(value);
    } else if (d.type === FormType.CHECKBOX_GROUP) {
      expect(`${encodeURIComponent(item.value)}`).toBe(value);
    }
    expect(`${encodeURIComponent(item.value)}`).toBe(value);
  }
  return value;
}

function fireEventOnType(d) {
  if (childHasManyRelation(d)) {
  } else {
    const item = getItemOnType(d);
    if (d.type === FormType.CHECKBOX) {
      fireEvent.click(item);
    } else if (d.type === FormType.DROPDOWN) {
      fireEvent.change(item, { target: { value: d.options[0].value } });
    } else if (d.type === FormType.TEXT) {
      fireEvent.change(item, { target: { value: INPUT_VALUE } });
    } else if (d.type === FormType.CHECKBOX_GROUP) {
      fireEvent.click(item);
    }
  }
}

function clickOnClearButton(name) {
  const button = chipsButton(name);
  fireEvent.click(button);
}

function renderDOM(props) {
  cleanup();

  render(
    <BrowserRouter>
      <Link
        to={{
          pathname: "/",
          search: props?.search || "",
          hash: "",
        }}
        data-testid="temp-link"
      ></Link>
      <App formData={props?.formData || formData} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByTestId("temp-link"));
}

test("filter states should be correct #1", async () => {
  renderDOM();
  formData.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    checkValueOnType(d);

    if (d.children) {
      const childIdx = formData.findIndex((f) => f.name === d.children);

      if (formData[childIdx]) {
        getItemOnType(formData[childIdx], d);
      }
    }
  });
});

test("filter states should be correct #2", async () => {
  renderDOM({ formData: anotherFormData });
  const category = anotherFormData[0];
  fireEventOnType(category);
  checkValueOnType(category);
  const brand = anotherFormData[1];
  const brandItem = selectTestId(brand.name);
  fireEvent.change(brandItem, { target: { value: 1 } });
  const price = anotherFormData[2];
  const priceItem = selectTestId(price.name);
  getItemOnType(price);
  fireEvent.change(priceItem, { target: { value: 1 } });
  expect(`${encodeURIComponent(brandItem.value)}`).toBe(`1`);
  expect(`${encodeURIComponent(priceItem.value)}`).toBe(`1`);
});

test("states should be synced correctly", async () => {
  renderDOM();
  const nonDependantFields = formData.filter((f) => !f.parent);
  nonDependantFields.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    const value = checkValueOnType(d);

    const url = screen.getByTestId("location-display");
    testUrlContent(d, url);
    expect(url).toHaveTextContent(`${value}`);
  });
});

test("initialize url to state should be correct", async () => {
  const searchParam = formData.reduce((acc, cur) => {
    if (childHasManyRelation(cur)) {
      return acc;
    }
    return `${acc}${acc ? AND_SIGN : ""}${
      cur.name
    }${EQUAL_SIGN}${getValueOnType(cur)}`;
  }, "");

  renderDOM({
    search: searchParam,
  });

  formData.forEach((d) => {
    if (childHasManyRelation(d)) {
      return;
    }
    checkValueOnType(d);
  });
});

test("parse url should be correct", async () => {
  renderDOM();
  const nonDependantFields = formData.filter((f) => !f.parent);
  nonDependantFields.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    
    const value = checkValueOnType(d);

    const url = screen.getByTestId("location-display");
    expect(url).toHaveTextContent(`${d.name}${EQUAL_SIGN}`);
    expect(url).toHaveTextContent(`${value}`);
  });
});

test("clear dependant fields should be correct", async () => {
  renderDOM();
  formData.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    const value = checkValueOnType(d);
    const url = screen.getByTestId("location-display");
    testUrlContent(d, url);

    expect(url).toHaveTextContent(`${value}`);
  });
  const dependantFields = formData.filter((f) => f.parent);

  dependantFields.forEach((d) => {
    if (childHasManyRelation(d)) return;
    clickOnClearButton(d.name);
    const url = screen.getByTestId("location-display");
    testUrlContent(d, url, false);
  });

  dependantFields.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    const value = checkValueOnType(d);
    const url = screen.getByTestId("location-display");
    testUrlContent(d, url);
    expect(url).toHaveTextContent(`${value}`);
  });
  clickOnClearButton("all");
  formData.forEach((d) => {
    if (childHasManyRelation(d)) return;
    const url = screen.getByTestId("location-display");
    testUrlContent(d, url, false);
  });
});

test("clear child fields on parent should be correct", async () => {
  renderDOM();
  formData.forEach((d) => {
    if (childHasManyRelation(d)) return;
    fireEventOnType(d);
    const value = checkValueOnType(d);
    const url = screen.getByTestId("location-display");
    testUrlContent(d, url);

    expect(url).toHaveTextContent(`${value}`);
  });
  const nonDependantFields = formData.filter((f) => !f.parent);

  nonDependantFields.forEach((d) => {
    // if (childHasManyRelation(d)) return;
    clickOnClearButton(d.name);
    const url = screen.getByTestId("location-display");

    if (d?.children) {
      d?.children.forEach((c) => {
        testUrlContent({ name: c }, url, false);
      });
    }
    testUrlContent(d, url, false);
  });
});
