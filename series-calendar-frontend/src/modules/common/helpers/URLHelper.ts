export default class URLHelper {
  public static getUrlParams() {
    const urlParams = document.location.search;
    return new URLSearchParams(urlParams);
  }
}
