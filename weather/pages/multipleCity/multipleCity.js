// pages/multipleCity/multipleCity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoad:true,
    statusBarHeight: app.globalData.statusBarHeight,
    cityList:[],
    hotCityList:["北京","上海","深圳","广州","杭州","重庆","成都","福州","三亚","香港","澳门","珠海"],
    showAdd:false,
    showManage:false,
    inputWords:"",      //搜索城市的输入框值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const self = this;

    this.getCache();
    let str=options.city.slice(0,options.city.length-1);
    this.getCityNameList();
    //将当前定位位置加入列表
    this.addCity(str);

    this.setData({  //第一次加载当定位城市已经在列表则不提示信息
      firstLoad:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getFuturePic(){ //获取未来24-72小时全国降水地图
    const self = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v8',
      success(res) {
        self.setData({
          hou: res
        });
      }
    })
  },
  backPage(){//页面回退
    wx.navigateBack()
  },
  getCache(){
    //获取缓存设置城市列表
    let storageCityList = wx.getStorageSync("cityList");
    this.setData({
      cityList: storageCityList ? storageCityList : ["北京", "上海", "深圳"]
    })
  },
  addCity(city){//添加一个城市到列表
    let cityList = this.data.cityList;
    for(let i=0;i<cityList.length;i++){
      if(cityList[i]===city){
        //已经有了这个城市了
        if (!this.data.firstLoad){//不是第一次加载才显示
          wx: wx.showToast({
            title: '已经添加过啦~',
            icon: 'none',
            duration: 1500,
          });
        }
        return
      }
    }
    cityList.unshift(city);//向首部添加城市
    wx.setStorageSync("cityList", cityList);
    this.setData({  //重设数据
      cityList
    })
  },
  showAddBox(){//显示新增城市模块
    this.setData({
      showAdd:true
    })
  },
  hideAddBox(){//隐藏新增城市模块
    this.setData({
      showAdd:false
    })
  },
  showManageBox() {//显示管理城市模块
    this.setData({
      showManage: true
    })
  },
  hideManageBox() {//隐藏管理城市模块
    this.setData({
      showManage: false
    })
  },
  inputCity(e){//搜索框输入时执行
    this.setData({
      inputWords:e.detail.value
    })
  },
  addCityToList(){//添加城市,需要向数组unshift，并且隐藏add模块
    //功能未完善，未校验输入的值，可能非城市导致获取到的数据位默认数据
    //检索城市列表,对输入的城市和json表检查，没找到则不添加
    const self=this;
    //检索是否有输入的名字：
        if(self.data.cityNameList.includes(self.data.inputWords)){
            self.addCity(self.data.inputWords);
            self.hideAddBox();
        }else{
          wx.showToast({
            title: '没有匹配城市',
            icon:"none"
          })
        }
      
    
    // this.addCity(this.data.inputWords);
    // this.hideAddBox();
  },
  deleteCity(e){
      let deleteTarget=e.currentTarget.dataset.city;
    let cityList = this.data.cityList;
     for(let i=0;i<cityList.length;i++){
       if(cityList[i]===deleteTarget){
         cityList.splice(i,1);
         break;
       }
     }
    wx.setStorageSync("cityList", cityList);
    
    this.setData({
      cityList
    })
  },
  addTuijianCity(e){
    //点击热门城市后，添加到列表，隐藏模块
    let city=e.currentTarget.dataset.name;
    this.addCity(city);
    this.hideAddBox();
  },
  getCityNameList(){
    const self=this;
    wx.request({
      url: 'https://mydata-1258971635.cos.ap-beijing.myqcloud.com/city.json',
      success(res) {
        let cityNameList = [];
        res.data.forEach((ele) => {
          cityNameList.push(ele.cityZh)
        })
        self.setData({
          cityNameList
        });
      }
    })
  }
})