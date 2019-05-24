const QQmapWx = require("../qqmap-wx-jssdk.min.js");
let qqmapsdk=new QQmapWx({
  key: "CVOBZ-TKSC5-NNMIZ-QCLLZ-MRNQJ-FLB3L"
})
// const qqMapKey = "CVOBZ-TKSC5-NNMIZ-QCLLZ-MRNQJ-FLB3L",
const qqMapUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=";


class Position{
  getPosition = function () {
    const self = this;
   return new Promise((resolve, reject) => {
      wx.getLocation({
        success(res) { resolve(res) },
        fail(err) { reject(err) }
      })
    }).then(res => {
      self.latitude = res.latitude;
      self.longitude = res.longitude;
      return new Promise((resolve, reject) => {
        qqmapsdk.reverseGeocoder({
          sig: "r54sEcNMPXSlJv2FKwfEpZyqj4pdVVaX",
          location: {
            latitude: self.latitude,
            longitude: self.longitude
          },
          success(res) { resolve(res) },
          fail(err) {
            wx.showToast({
              title: err,
              icon: "none"
            })
            reject(err)
          }
        })
      })
    }, rej => {
      wx.showToast({
        title: '获取位置信息失败',
      })
    })
  };

  }






export {Position}