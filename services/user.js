/**
 * 用户相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
    }).then(() => {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, { code: code }, 'GET').then(res => {
        if (res.status === 0) {
          //存储用户信息
          wx.setStorageSync('memberId', res.result.memberId);
          wx.setStorageSync('shopUserId', res.result.shopUserId);
          wx.setStorageSync('token', res.result.loginSessionKey);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    // 先查询是否有值
    if (wx.getStorageSync('token')) {
      // 在查询session是否有效
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











