Page({
    data:{
        name:'司机',
        idType:0,
        array_goAddr:['金唐大厦','七里庄','金玉大厦','东单'],
        index_goAddr:0,
        array_arrAddr:['西局地铁站','菜户营桥北','菜户营桥东','七里庄'],
        index_arrAddr:0,
        array_carColor:['黑色','白色','灰色','黄色','红色'],
        index_carColor:0,
        array_carType:['两厢车','三厢车','SUV'],
        index_carType:0,
        array_seatNum:['1','2','3','4'],
        index_seatNum:1,
        goTime:'17:30',
        driverInfo:{
            telphone:"",
            index_seatNum:0,
            carNum:"",
            index_carColor:0,
            index_carType:0
        }
    },

    onLoad:function(e){

        //调用API从本地缓存中获取数据
        //var driverInfo = wx.getStorageSync('driverInfo') || []
        //driverInfo.unshift(Date.now())
        //wx.setStorageSync('driverInfo', logs)

        // 页面初始化 options为页面跳转所带来的参数
        console.log("车主微信昵称为为："+e.name)
        this.setData({
            name: e.name
        })

    },
    bindSeatNumChange:function(e){
        this.setData({
            index_seatNum:e.detail.value
        })
    },
    bindGoAddrChange:function(e)
    {
        console.log('carColor picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_goAddr: e.detail.value,
        })
    },
    bindArrAddrChange:function(e)
    {
        console.log('arrAddr picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_arrAddr: e.detail.value,
        })
    },
    bindCarColorChange:function(e)
    {
        console.log('carColor picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_carColor: e.detail.value,
        })
    },
    bindCarTypeChange:function(e)
    {
        console.log('carType picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_carType: e.detail.value,
        })
    },
    bindGoTimeChange: function (e) {
        this.setData({
            goTime: e.detail.value
        })
    },
    bindStarGoBtn:function(e)
    {
        wx.navigateTo({
          url: '../start/start?idType=' + this.data.idType,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    

});