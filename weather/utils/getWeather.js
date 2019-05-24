class Weather{

  getWeather(data){
      return new Promise((resolve,reject)=>{
        wx.request({
          url:`https://www.tianqiapi.com/api/`,
          data,
          success(res){resolve(res)},
          fail(err){
            wx.showToast({
              title: '获取天气失败，服务器错误',
            });
            reject(err);
          }
        })
      })
  }
}
export {Weather}