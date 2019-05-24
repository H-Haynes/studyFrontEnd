import {Position} from "../../utils/getPosition.js";
import {Weather} from "../../utils/getWeather.js";
import * as echarts from "../../ec-canvas/echarts";
import {setOption} from "../../utils/echartsData"
let chart;
let option;
function initChart(canvas, width, height) {
   chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
}

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight:app.globalData.statusBarHeight,
    nowIndex:0,
    gotowhere:0,
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 

      this.setData({
        city:options.city||""
      })
      this.getUserPosition();
      this.getCityWeather(this.data.city);
      this.getMapList()
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getUserPosition(){
    const self=this;
    wx.authorize({    //获取用户位置信息并记录
      scope: 'scope.userLocation',
      success() {
        let pos = new Position();
        pos.getPosition().then(res => {

          let address = res.result.address_component
          pos.myPosition = {
            nation: address.nation,
            province: address.province,
            city: address.city,
            district: address.district,
            street: address.street,
            street_number: address.street_number
          }
          self.setData({
            position: pos
          })
        })
       
      }
    })


  },
  getCityWeather(city){
    const self=this;
      city=city||"";
      let weather=new Weather();
      let data={
        version:"v1",
        city
      }
      weather.getWeather(data).then(res=>{
        weather.data=res.data.data;
        weather.updateTime=res.data.update_time
        self.setData({
          weather
        });
        self.setWeather(self.data.nowIndex)
      })
  },
  setWeather(nowIndex){//设置当前页面的天气数据
      this.setData({
        indexDayWeather: this.data.weather.data[nowIndex],
        indexDayLife:this.data.weather.data[nowIndex].index
      });
      this.setWeaBg();
  
       option=setOption(this.data.weather.data[this.data.nowIndex].hours)
       if(chart){//如果已经初始化过
          chart.setOption(option)
       }

  },
  choiceDay(e){
    const self=this;
      //检查是否和当前inde一致
      if(e.currentTarget.dataset.index===self.data.nowIndex){
        return;
      }else{
        self.setData({
          nowIndex:e.currentTarget.dataset.index
        });
        self.setWeather(self.data.nowIndex)
      }
    self.setData({
      gotowhere: "date" + e.currentTarget.dataset.index
    })
  },
  setWeaBg(){ 
    let bg="";
    switch(this.data.indexDayWeather.wea_img){
      case "yu": bg ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558550457151&di=89a3420b095100680a1139df8dbef4c0&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fd0d731dc297edc207d55e94992fa7e1dfb3a4a61fb86b-BWKwUx_fw658";break;
      case "lei": bg = "http://d.ifengimg.com/w128/p3.ifengimg.com/ifengiclient/ipic/20160530/default_7788_9c22381f30ac5d9674c815d18a5bb6c9_w800_h405.gif";break;
      case "xue": bg ="http://img2.ph.126.net/QJRkxfRgT10VUhWVNzg1hQ==/671036344495487052.gif";break;
      case "yun": bg ="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2427759163,251301900&fm=26&gp=0.jpg";break;
      case "yin": bg ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558549960579&di=d63a2fe67395d0f32d92baae83acf65b&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170813%2Fdd6aa8ce91f242e2b531705935cc6196_th.png";break;
      default: bg = "https://mydata-1258971635.cos.ap-beijing.myqcloud.com/wind.gif";//默认晴天
    }
    this.setData({
      bg
    })
  },
  navBarTap(){
      wx.navigateTo({
        url: `../multipleCity/multipleCity?city=${this.data.position.myPosition.city}`,
      })
    
  },
  getMapList(){
    let self=this;
      wx.request({
        url: 'https://www.tianqiapi.com/api/?version=v8',
        success(res){

            self.setData({
              mapList:res.data.data
            })
        }
      })

  },
  showImg(e){//大图模式
      let index=e.currentTarget.dataset.index;
     let imgList=this.data.mapList.map(ele=>{
       return ele.pic 
      });
      wx.previewImage({
        urls: imgList,
        current:imgList[index]
      })
  },

})