import { useCallback, useEffect, useRef, useState } from "react";

import "./RangeInput.css";

export function RangeInput({ value, options, onChange,name }) {
  function parseValues() {
    const [initialMinValue, initialMaxValue] = value?.includes(",")
      ? value.split(",")
      : [0, options?.end||0];
    return {
      minValue: +initialMinValue,
      maxValue: +initialMaxValue,
    };
  }
  const [inputValues, setInputValues] = useState(parseValues());
  const rangeEl = useRef(null);

  useEffect(() => {
    setInputValues(parseValues());
  }, [value,options]);

  const getPercent = useCallback(
    (value) => Math.round(((value - options.beginning) / (options.end - options.beginning)) * 100),
    [options.beginning, options.end]
  );

  useEffect(() => {
    const minPercent = getPercent(inputValues.minValue);
    const maxPercent = getPercent(inputValues.maxValue);

    if (rangeEl.current) {
      rangeEl.current.style.right = `${minPercent}%`;
      rangeEl.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [inputValues.minValue, inputValues.maxValue, getPercent]);

  const minValueOnChange = (e) => {
    const value = Math.min(Number(e.target.value), inputValues.maxValue - 1);
    setInputValues({ ...inputValues, minValue: value });
    onChange({ target: { value: `${value},${inputValues.maxValue}` } });
  };

  const maxValueOnChange = (e) => {
    const value = Math.max(Number(e.target.value), inputValues.minValue + 1);
    setInputValues({ ...inputValues, maxValue: value });
    onChange({ target: { value: `${inputValues.minValue},${value}` } });
  };

  return (
    <div className="RangeInput">
      <input
        type="range"
        min={options.beginning}
        max={options.end}
        value={inputValues.maxValue}
        onChange={maxValueOnChange.bind(null)}
        className="RangeInput__thumb RangeInput__thumb-start"
        data-testid={`range-max-${name}`}
      />
      <input
        type="range"
        min={options.beginning}
        max={options.end}
        value={inputValues.minValue}
        onChange={minValueOnChange.bind(null)}
        className="RangeInput__thumb RangeInput__thumb-end"
        data-testid={`range-min-${name}`}
      />

      <div className="rail-container">
        <div className=" RangeInput__track " />
        <div ref={rangeEl} className="RangeInput__range " />

        <div className="bottom-container">
          <p>حداکثر:{inputValues.maxValue}</p>
          <p>حداقل:{inputValues.minValue}</p>
        </div>
      </div>
    </div>
  );
}
