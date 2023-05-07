class validator {
  static validateUserInfo(UserInfo, UserData) {
    // console.log(UserInfo);
    // console.log(UserData);
    console.log('email' in UserInfo)
    if (UserInfo.hasOwnProperty("id") &&
      UserInfo.hasOwnProperty("fullName") &&
      UserInfo.hasOwnProperty("email") &&
      UserInfo.hasOwnProperty("password") &&
      this.validateUniqueUserId(UserInfo, UserData) &&
      this.validateUniqueUserEmail(UserInfo, UserData)) {
      return {
        "status": true,
        "message": "User has been added"
      };
    }
    if (!this.validateUniqueUserId(UserInfo, UserData)) {
      return {
        "status": false,
        "message": "User id has to be unique and number"
      };
    }
    if (!this.validateUniqueUserEmail(UserInfo, UserData)) {
      return {
        "status": false,
        "message": "This email is already registered"
      };
    }
    return {
      "status": false,
      "message": "User Info is malformed please provide all the properties"
    }
  }

  static validateUniqueUserId(UserInfo, UserData) {
    // if(typeof UserData.id !='number') return false;
    let valueFound = UserData.some(el => el.id === UserInfo.id);
    if (valueFound) return false;
    return true;
  }

  static validateUniqueUserEmail(UserInfo, UserData) {
    let valueFound = UserData.some(el => el.email === UserInfo.email);
    if (valueFound) return false;
    return true;
  }




}

module.exports = validator;