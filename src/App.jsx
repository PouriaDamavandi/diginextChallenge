import React from "react";
import useFilter from "./hooks/useFilter";
import { LocationDisplay } from "./components/Location";
import { FilterForm } from "./components/formInput/FilterForm";
import { FormClear } from "./components/formInput/FormClear";

function App({ formData }) {
  const { onChange, onClear, onClearAll, filterState } = useFilter(formData);

  return (
    <div className="main-container">
      <div className="form-container">
        <FilterForm
          formData={formData}
          filterState={filterState}
          onChange={onChange}
        />
        <FormClear
          formData={formData}
          filterState={filterState}
          onClear={onClear}
          onClearAll={onClearAll}
        />
      </div>

      <LocationDisplay />
    </div>
  );
}

export default App;
