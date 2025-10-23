export const setJSON = (k: string, v: any) =>
  localStorage.setItem(k, JSON.stringify(v));
export const getJSON = (k: string) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
