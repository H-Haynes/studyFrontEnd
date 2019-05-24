// component/cityList/cmp.js
import { Weather } from "../../utils/getWeather.js";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      city:String,
  },
  attached(){
    this.getWeatherData();
   
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPicUrl() {
      this.setData({
        url: `../../${this.properties.img}.png`
      })
    },

    getWeatherData(){
      const self = this;
      let weather = new Weather();
      let data={
        version:"v6",
        city:this.properties.city
      }
      weather.getWeather(data).then(res => {
        self.setData({
          weather:res.data
        });
      })
    },

    toDetail(e){
      wx.navigateTo({
        url: `../index/index?city=${e.currentTarget.dataset.city}`,
       
      })
    }
  }
})
