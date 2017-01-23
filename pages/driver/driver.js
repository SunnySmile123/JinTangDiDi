
const SERVER = require('../../utils/leancloud-storage');
const Passengers = require('../../model/passengers');
const Drivers = require('../../model/drivers');
const Team = require('../../model/team');

Page({
    data:{
        name:'司机',
        idType:0,
        telephone:"",
        array_goAddr:['金唐大厦','七里庄','金玉大厦','东单'],
        index_goAddr:0,
        array_arrAddr:['西局地铁站','菜户营桥北','菜户营桥东','七里庄'],
        index_arrAddr:0,
        array_carColor:['黑色','白色','灰色','黄色','红色'],
        index_carColor:0,
        array_carType:['两厢车','三厢车','SUV'],
        index_carType:1,
        array_seatNum:['1','2','3','4'],
        index_seatNum:1,
        goTime:'17:40',
        carNum:''
    },

    onLoad:function(e){
        //获取本地缓存中的司机信息
        var driverName = wx.getStorageSync('drivername')
        var driverTel = wx.getStorageSync('tel')
        var driverCarNum = wx.getStorageSync('carnum')
        var driverCarColor = wx.getStorageSync('carcolor')
        if(!driverCarColor){
            driverCarColor = 0;
            this.data.index_carColor = 0; }
        var driverCarType = wx.getStorageSync('cartype')
        if(!driverCarType){
            driverCarType = 1;
            this.data.index_carType = 1;}
        var driverseatNum = wx.getStorageSync('seatnum')
        if(!driverseatNum){
            driverseatNum = 1;
            this.data.index_seatNum = 1;}
        var driverGoTime = wx.getStorageSync('goTime')
        if(!driverGoTime){
            driverGoTime = "17:40";
            this.data.goTime = "17:40";}
        // 缓存数据赋值给页面的data
        this.setData({
            name:driverName,
            telephone: driverTel,
            carNum: driverCarNum,
            index_carColor:driverCarColor,
            index_carType:driverCarType,
            index_seatNum:driverseatNum,
            goTime:driverGoTime })


        
    },

    //座位数选择器触发事件
    bindSeatNumChange:function(e){
        console.log('seatNum picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_seatNum:e.detail.value
        })
    },
    //出发地选择器触发事件
    bindGoAddrChange:function(e)
    {
        console.log('goAddr picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_goAddr: e.detail.value,
        })
    },
    //目的地选择器触发事件
    bindArrAddrChange:function(e)
    {
        console.log('arrAddr picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_arrAddr: e.detail.value,
        })
    },
    //车颜色选择器触发事件
    bindCarColorChange:function(e)
    {
        console.log('carColor picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_carColor: e.detail.value,
        })
    },
    //车类型选择器触发事件
    bindCarTypeChange:function(e)
    {
        console.log('carType picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index_carType: e.detail.value,
        })
    },
    //出发时间选择器触发事件
    bindGoTimeChange: function (e) {
        this.setData({
            goTime: e.detail.value
        })
    },
    //手机号输入框触发事件
    bindInputTel:function(e){
        console.log('driver input tel，携带值为', e.detail.value)
        this.setData({
            telephone:e.detail.value,
        })          
    },
    //车牌号输入框触发事件
    bindInputCarNum:function(e){
        console.log('driver input car num，携带值为', e.detail.value)
        this.setData({
            carNum:e.detail.value,
        })      
    },

    //确认载客按钮触发事件
    bindStarGoBtn:function(e)
    {
        //重新更新保存一份本地存储文件
        wx.setStorageSync('carcolor',this.data.index_carColor)
        wx.setStorageSync('cartype',this.data.index_carType)
        wx.setStorageSync('gotime',this.data.goTime)
        wx.setStorageSync('tel',this.data.telephone)
        wx.setStorageSync('carnum',this.data.carNum)
        wx.setStorageSync('seatnum',this.data.index_seatNum)

        
        //检查必输项；给临时变量赋值，在上传时使用
        var itel = this.data.telephone && this.data.telephone.trim()
        if(!itel){
            wx.showToast({
                title: '请输入手机号',
                icon: 'loading',
                duration: 500
                })
            return;}
        var icarnum = this.data.carNum && this.data.carNum.trim()
        if (!icarnum) {
            wx.showToast({
                title: '请输入车牌号',
                icon: 'loading',
                duration: 500
                })
            return;}
        var igotime = this.data.goTime && this.data.goTime.trim()
        if(!igotime){
            wx.showToast({
                title: '请输入发车时间',
                icon: 'loading',
                duration: 500
                })
            return;}
        var iseatnum = this.data.array_seatNum[this.data.index_seatNum]
        var icarcolor = this.data.index_carColor
        var icartype = this.data.index_carType
        var igoaddr = this.data.index_goAddr
        var iarraddr = this.data.index_arrAddr
        var iimageurl = wx.getStorageSync('driverimageurl')
        var iwxname = wx.getStorageSync('drivername')
        var utils = require("../../utils/util.js")  
        var idate = utils.getNowFormatDate()  
        console.log("--------idate:" + idate)
        //建立与服务器的连接控制对象
        console.log('--------start server---------')
        var acl = new SERVER.ACL();
            acl.setPublicReadAccess(false);
            acl.setPublicWriteAccess(false);
            acl.setReadAccess(SERVER.User.current(), true);
            acl.setWriteAccess(SERVER.User.current(), true);   
        //查询passenger表
        var query_p = new SERVER.Query(Passengers);
        query_p.equalTo('user', SERVER.Object.createWithoutData('Passengers', SERVER.User.current().id)).find().then(function(object) 
        {          
            //如果没有数据，新增一条passenger
            if(object.length == 0){
              new Passengers({
                    user: SERVER.User.current(),
                    name:iwxname,  //微信昵称
                    imageUrl:iimageurl,//头像
                    phone: itel,//手机号
                    }).setACL(acl).save().catch(console.error);
            }
            //如果有数据，更新passenger表
            else
            {
                object[0].set('phone',itel).save();
    
            }            
        });
        //查询driver表
        var query_d = new SERVER.Query(Drivers);
        query_d.equalTo('user', SERVER.Object.createWithoutData('Drivers', SERVER.User.current().id)).find().then(function(object) 
        {
            //如果没有数据，新增一条driver
            if(object.length == 0)
            {
                 new Drivers({
                    user: SERVER.User.current(),            
                    carNum: icarnum,//车牌号
                    carColor:icarcolor,//车颜色
                    carType:icartype,//车型
                    }).setACL(acl).save().catch(console.error);
            }
            //如果有数据，对比是否一致//不一致：更新driver表
            else
            {
                

            }           
            
        })
        
        //插入team表
         new Team({
             teamsts:'N',//行程状态
             start:igoaddr,//起点
             end:iarraddr,//终点终点
             goTime:igotime,//出发时间
             //rem//备注
             driver: SERVER.User.current(),//司机
             //乘客1
             //乘客2
             //乘客3
             //乘客4
         }).setACL(acl).save().catch(console.error);            
        //页面跳转
        wx.navigateTo({
            url: '../waitdriver/waitdriver',
            success: function(res){
                // success
                wx.setStorageSync('driverstatus', '1')
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })

    console.log('--------end server---------')


        
    },

    
    
});