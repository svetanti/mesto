export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userInfoSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.info = this._userInfo.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }
}
