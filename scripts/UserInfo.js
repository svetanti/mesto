export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(this._userNameSelector).textContent;
    this._userInfo = document.querySelector(this._userInfoSelector).textContent;
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName;
    this._userData.info = this._userInfo;
    return this._userData;
  }

  setUserInfo(data) {
    this._userName = data.name;
    this._userInfo = data.info;
  }
}
