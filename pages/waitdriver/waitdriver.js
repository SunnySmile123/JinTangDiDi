const SERVER = require('../../utils/leancloud-storage');
const Team = require('../../model/team');

Page({
    data:{
        idType:2,//0-司机，1-乘客
        carState:0,//0-等待，1-出发，2-取消
        seatNum:1,
        driverInfo:{
            name:"",
            tel:"",
            imageurl:"",
            carNum:"",
            goTime:'',
            seatNum:'',
            index_carColor:0,
            index_carType:0,
        },
        team:null,
        d:null,
        p1:null,
        p2:null,
        p3:null,
        p4:null,
        array_carColor:['黑色','白色','灰色','黄色','红色'],
        
        array_carType:['两厢车','三厢车','SUV'],
        
        pasger1:{
            name:"暂无乘客...",
            tel:"",
            imageurl:""
            },
        pasger2:{
            name:"暂无乘客...",
            imageurl:""
            },
        pasger3:{
            name:"暂无乘客...",
            imageurl:""
            },        
        pasger4:{
            name:"暂无乘客...",
            imageurl:""
            },

        },
    
    onLoad:function(e){
        //司机，默认先读取本地缓存中的司机信息
        var driverName = wx.getStorageSync('drivername')
        var driverImageUrl = wx.getStorageSync('driverimageurl')
        var driverTel = wx.getStorageSync('tel')
        var driverCarNum = wx.getStorageSync('carnum')
        var goTime = wx.getStorageSync('gotime')
        var driverCarColor = wx.getStorageSync('carcolor')
        var driverCarType = wx.getStorageSync('cartype')
        var driverSeatNum = Number(wx.getStorageSync('seatnum'))
        var driver = this.data.driverInfo
        driver.name = driverName
        driver.imageurl = driverImageUrl
        driver.tel = driverTel
        driver.carNum = driverCarNum
        driver.goTime = goTime
        driver.index_carColor = driverCarColor
        driver.index_carType = driverCarType
        driver.seatNum = driverSeatNum + 1

      
        this.setData({
            driverInfo:driver,
        })

    },
    
    //刷新按钮事件
    bindDriverRefreshBtn:function(e){
        console.log('触发了司机刷新按钮')
        //console.log("xxxxxx:" + JSON.stringify(driver))

        var gt
        var that=this
        var query_t1 = new SERVER.Query('Team').equalTo('teamsts', 'N');
        var query_t2 = new SERVER.Query('Team').equalTo('driver', SERVER.User.current());       
        var query = SERVER.Query.and(query_t1, query_t2).descending('createdAt').find().then(function(object) {            
            //var driveri = this.data.driverInfo
            // .data.driverInfo
            // console.log("xxxxxx:" + JSON.stringify(driver))
             gt= object[0].get("goTime")
             console.log("xxxxxx:" + JSON.stringify(gt))
            // driver.goTime = gt
            //object[0].get('goTime').then(function(object){

             that.setData({
             'driverInfo.goTime':gt,
             team:object[0],
             driver:object[0].driver
             })
console.log("xxxxxx:" + JSON.stringify(that.data))
            
      
  }, function (error) {
  });

        // 调用API从本地缓存中获取数据
        // var drivertel = wx.getStorageSync('driverTel')
        // this.setData({
        //     telephone:drivertel,
        // })
        // console.log("本地缓存中的数据telephone为：" + telephone)

        //TODO 
    },    
    //发车按钮事件
    bindDriverGoBtn:function(e){
        console.log('触发了司机发车按钮')

        //弹出提示框，提示是否取消顺风车服务
        wx.showModal({
            title: '确认发车',
            content: '感谢您提供顺风车服务，请确认是否发车',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击了确认发车')
                    //teamsts置Y
                    wx.navigateBack({
                        delta: 2, // 回退前 delta(默认为1) 页面
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
                    
                    //TODO 将发车数据登记到服务器数据表中


                }else{
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });
    },

    //取消按钮事件
    bindDriverCancelBtn:function(e){
        console.log('触发了司机取消按钮')

        //弹出提示框，提示是否取消顺风车服务
        wx.showModal({
            title: '确认取消',
            content: '请确认是否取消顺风车服务',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击了确认取消')
                    //teamsts置C
                    wx.navigateBack({
                        delta: 2, // 回退前 delta(默认为1) 页面
                        success: function(res){
                            // success
                            wx.setStorageSync('driverstatus', '')
                        },
                        fail: function() {
                            // fail
                        },
                        complete: function() {
                            // complete
                        }
                    })
                    
                    //TODO 将取消数据登记到服务器数据表中


                }else{
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });


        
    },
    //更新页面信息
    rfreshInfo:function(e)
    {
        //var driver
        var that=this
        var query_t1 = new SERVER.Query('Team').equalTo('teamsts', 'N');
        var query_t2 = new SERVER.Query('Team').equalTo('driver', SERVER.User.current());       
        var query = SERVER.Query.and(query_t1, query_t2).descending('createdAt').find().then(function(object) {            
            //var 

             that.setData({
             //driverInfo:,
             team:object[0]
             }) 
                console.log("xxxxxx:" + JSON.stringify(that.data.team))      
      
  }, function (error) {
  });

    }
});