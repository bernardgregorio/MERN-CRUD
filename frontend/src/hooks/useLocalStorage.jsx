import { useState, useEffect } from "react";

const getLocalStorage = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
