/* eslint-disable array-callback-return */
import FormItem from "./FormItem";

export function FilterForm({ formData, filterState, onChange }) {
  const prepareChildrenData = (data) => {
    if (data.options && filterState[data?.parent] && !Array.isArray(data.options)) {
      return { options: data.options[filterState[data.parent]] };
    }
  };

  const showInput = (data) => {
    return !data.parent || (data.parent && filterState[data.parent]);
  };
  return formData.map((d) => {
    if (showInput(d)) {
      return (
        <details open key={d.name} style={{ marginRight: d.parent ? 64 : 0 }}>
          <summary>
            <span className="section-title">{d.label}</span>
          </summary>
          <section>
            <FormItem
              onChange={(e) => onChange(e, d.name, d.type)}
              value={filterState[d.name]}
              checked={filterState[d.name]}
              {...d}
              {...prepareChildrenData(d)}
            />
          </section>
        </details>
      );
    }
  });
}
