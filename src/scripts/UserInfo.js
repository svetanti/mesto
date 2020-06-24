export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userInfoSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.about = this._userInfo.textContent;
    return this._userData;
  }

  setUserInfo(api) {
    api.then((data) => {
      this._userName.textContent = data.name;
      this._userInfo.textContent = data.about;
      this._userAvatar.src = data.avatar;
    });
  }
}
