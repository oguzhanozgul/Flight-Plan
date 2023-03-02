export const apiUrl = (): string => {
  const apiUrlDev = import.meta.env.VITE_API_URL_DEV;
  const apiUrlProd = import.meta.env.VITE_API_URL_PROD;

  const appMode = import.meta.env.MODE;

  return appMode === "development" ? apiUrlDev : apiUrlProd;
}