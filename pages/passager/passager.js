Page({
    data:{
        name:'乘客',
        idType:1,
        telephone:'',
        array_goAddr:['金唐大厦','七里庄','金玉大厦','东单'],
        index_goAddr:0,
        array_arrAddr:['西局地铁站','菜户营桥北','菜户营桥东','七里庄'],
        index_arrAddr:0,
        list:[
            {name:"1号司机",go:0,arr:1,goTime:'18:00'},
            {name:"2号司机",go:0,arr:1,goTime:'18:00'},
            {name:"3号司机",go:0,arr:1,goTime:'18:00'},
            {name:"4号司机",go:1,arr:1,goTime:'18:00'},
            {name:"5号司机",go:1,arr:1,goTime:'18:00'},
            {name:"6号司机",go:1,arr:1,goTime:'18:00'},
            {name:"7号司机",go:1,arr:1,goTime:'18:00'},],
        imageUrl:"../../images/abc.jpg"
            //"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqyjtt5UNwQZQxYQGOo4L7g3G4iazf4iccp3GmicGtx167Kp7kjQpEvMfvJDcpHOjBCPOSMWkF6Aa2g/0"
    },

    onLoad:function(e){
       // 页面初始化 options为页面跳转所带来的参数
        console.log("乘客微信昵称为为："+e.name)
        var passagerTel = wx.getStorageSync('tel')
        this.setData({
            name: e.name,
            scrollHeight:500,
            telephone:passagerTel
        })
        
    },

    bindInputTel:function(e){
        console.log('driver input tel，携带值为', e.detail.value)
        this.setData({
            telephone:e.detail.value,
        })
        var tel = wx.getStorageSync('tel')
        wx.setStorageSync('tel',this.data.telephone)
        
    },
    bindSearchBtn:function(e){
        //TODO 搜索符合条件的车辆信息


        
    },
    bindListBtn:function(e){
        console.log("xxxxxx:" + JSON.stringify(e.detail.id))


        wx.showModal({
            content: '确认搭乘该顺风车？',
            confirmText: "是",
            cancelText: "否",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击是')
                    wx.navigateTo({
                      url: '../waitpassager/waitpassager',
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
                }else{
                    console.log('用户点击否')
                }
            }
        });
    }

})