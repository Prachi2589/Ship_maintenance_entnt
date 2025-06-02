export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Load error", e);
    return [];
  }
};

export const saveToStorage = (key, data) => {
  try {
    console.log(`Saving ${key} to storage:`, data); // Debugging
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Save error", e);
  }
};
