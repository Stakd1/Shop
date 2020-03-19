//公共类，验证格式
class Valid {
  constructor() {
    this.phoneReg = /^1[3-9]\d{9}$/;
    this.passwordReg = /^[0-9A-Za-z]{6,}$/;
  }

  //验证手机号
  isPhone(value) {
    return this.phoneReg.test(value);
  }
  isPassWord(value) {
    return this.passwordReg.test(value);
  }

}
//导出
export const valid = new Valid();
