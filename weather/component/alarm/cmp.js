// component/alarm/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      alarm:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached(){
        this.confirmData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    confirmData(){
      let alarms=[];
      if(this.properties.alarm.length==0){
        this.setData({
          alarms:['暂无预警信息']
        })
      }else{
        this.setData({
          alarms:this.properties.alarm
        })
      }
    }
  }
})
