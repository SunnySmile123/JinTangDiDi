Page({
    data:{
        name:'乘客',
        idType:1,
        array_goAddr:['金唐大厦','七里庄','金玉大厦','东单'],
        index_goAddr:0,
        array_arrAddr:['西局地铁站','菜户营桥北','菜户营桥东','七里庄'],
        index_arrAddr:0,
    },

    onLoad:function(e){
       // 页面初始化 options为页面跳转所带来的参数
        console.log("乘客微信昵称为为："+e.name)
        this.setData({
            name: e.name
        })
    },
    bindCallDriverTap:function(e)
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
    }

})