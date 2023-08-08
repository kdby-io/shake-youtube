export const useSearchParams = (param: string) =>
  new URLSearchParams(window.location.search).get(param)
