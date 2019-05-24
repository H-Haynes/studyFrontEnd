// component/dateList/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    day:String
  },

  /**
   * 组件的初始数据
   */
  data: {
      
  },
  attached(){
    this.changeDay();

  },
  /**
   * 组件的方法列表
   */
  methods: {
      changeDay(){
        
        let date=this.properties.day.replace("（", "\n (")
        this.setData({
          date
        });
      }
  }
})
