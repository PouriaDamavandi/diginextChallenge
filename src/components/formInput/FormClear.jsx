import { useMemo } from "react";
import { Chips } from "../chips";

export function FormClear({ formData, filterState, onClear, onClearAll }) {
  const FORM_TITLES = useMemo(() => {
    return formData.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: cur.label }),
      {}
    );
  }, [formData]);
  return Object.values(filterState).filter((v) => v).length ? (
    <section>
      <div className="input-title">فیلترهای اعمال شده:</div>
      <div className="chips-container">
        {Object.entries(filterState)
          ?.filter(([k, v]) => v)
          ?.map(([key, value]) => {
            return (
              <Chips
                data-testid={`chips-${key}`}
                title={
                  FORM_TITLES[key] === value
                    ? `${FORM_TITLES[key]}`
                    : `${FORM_TITLES[key]}: ${value}`
                }
                key={key}
                onClick={() => onClear(key)}
              />
            );
          })}
      </div>
      <Chips
        data-testid={`chips-all`}
        title="پاک کردن همه"
        onClick={() => onClearAll()}
      />
    </section>
  ) : null;
}
