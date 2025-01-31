import { useLocation, useNavigate } from "react-router-dom";

export const EQUAL_SIGN = "~";
export const AND_SIGN = "+";
export const ARRAY_SEPARATOR = "--";

function parseUrl(url) {
  const params = new URLSearchParams(url);
  const filterData = {};

  params.forEach((value, key) => {
    if (value.includes(ARRAY_SEPARATOR)) {
      filterData[key] = value.split(ARRAY_SEPARATOR);
    } else if (value.includes(EQUAL_SIGN)) {
      filterData[key] = value.split(EQUAL_SIGN);
    } else if (value.includes(AND_SIGN)) {
      filterData[key] = value.split(AND_SIGN);
    } else {
      filterData[key] = value;
    }
  });

  return filterData;
}

function stringifyUrl(filters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      params.set(key, value.join(ARRAY_SEPARATOR));
    } else {
      params.set(key, value);
    }
  }

  return params.toString();
}

function useFilter(initialFormData = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  const filterState = parseUrl(location.search) || initialFormData;

  const setFilterState = (newFilters) => {
    const queryString = stringifyUrl(newFilters);
    navigate(`?${queryString}`, { replace: true });
  };

  function onChange(e, name) {
    const value = e.target ? e.target.value : e;
    setFilterState({
      ...filterState,
      [name]: value,
    });
  }

  function onClear(name) {
    const updatedFilters = { ...filterState };
    delete updatedFilters[name];
    setFilterState(updatedFilters);
  }

  function onClearAll() {
    navigate("?", { replace: true });
  }

  return { filterState, setFilterState, onChange, onClear, onClearAll };
}

export default useFilter;
