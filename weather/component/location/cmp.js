
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position:Object
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
   showInfo(){
     console.log(this.properties)
   }
  }
})
