const Base64Util = {
  encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  },

  decode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
};