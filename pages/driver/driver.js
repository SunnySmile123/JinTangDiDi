
const SERVER = require('../../utils/leancloud-storage');
const Passengers = require('../../model/passengers');
const Drivers = require('../../model/drivers');
const WaitList = require('../../model/waitList');

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
        var query = new SERVER.Query(Drivers);

        query.equalTo('user', SERVER.Object.createWithoutData('Drivers', SERVER.User.current().id))
            .descending('createdAt').find().then(function(object) {
          
            var acl = new SERVER.ACL();
            acl.setPublicReadAccess(false);
            acl.setPublicWriteAccess(false);
            acl.setReadAccess(SERVER.User.current(), true);
            acl.setWriteAccess(SERVER.User.current(), true);    

            //如果未查询到司机信息，则插入一条道Drivers表里      
            if(object.length == 0){
                new Drivers({
                    user: SERVER.User.current(),
                    name:iwxname,
                    goAddr:igoaddr,
                    arrAddr:iarraddr,
                    seatNum:iseatnum,
                    goTime:igotime,
                    phone: itel,
                    carNum: icarnum,
                    carColor:icarcolor,
                    carType:icartype,
                    imageUrl:iimageurl,
                    date:idate
                    }).setACL(acl).save().catch(console.error);
            }else{
                console.log("json:" + JSON.stringify(object[0].updatedAt))

                //判断本地数据和服务器端数据是否一致
                //不一致，更新本地数据到服务器端
                // object[0].name != iwxname ||
                //     object[0].goAddr !=igoaddr ||
                //     object[0].arrAddr !=iarraddr ||
                //     object[0].seatNum !=iseatnum ||
                //     object[0].goTime !=igotime ||
                // object[0].carNum != icarnum ||
                //     object[0].carColor !=icarcolor ||
                //     object[0].carType !=icartype ||
                //     object[0].imageUrl !=iimageurl

                console.log("---object phone :" + object[0].phone)
                console.log("---object id :" + object[0].objectId)
                if(object[0].phone != itel){
                        
                        console.log("----object[0] is " + JSON.stringify(object[0]))

                        var updatesql = 'update Drivers set phone="' + itel +'" where objectId="5881b274570c350062b39b63"';
                        console.log("-----update sql: " + updatesql)
                        SERVER.Query.doCloudQuery(updatesql)
                            .then(function (data) {
                                // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
                                console.log("-----update success----")
                                console.log(JSON.stringify(data))
                                //var results = data.results;
                            }, function (error) {
                                // 异常处理
                                console.error(error);
                            });

                    }

                
                


                //在发车信息表里建立一条数据
                console.log("-----在发车信息表里添加一条记录------")
                // new WaitList({
                //     user: SERVER.User.current(),
                //     driver_name:iwxname,
                //     goAddr:igoaddr,
                //     arrAddr:iarraddr,
                //     seatNum:iseatnum,
                //     left_seatNum:iseatnum,
                //     goTime:igotime,
                //     driver_phone: itel,
                //     carNum: icarnum,
                //     carColor:icarcolor,
                //     carType:icartype,
                //     driver_imageUrl:iimageurl,
                //     carStatus:'0',
                //     pasger1_name:'',
                //     pasger1_imageurl:'',
                //     pasger1_phone:'',
                //     pasger2_name:'',
                //     pasger2_imageurl:'',
                //     pasger2_phone:'',
                //     pasger3_name:'',
                //     pasger3_imageurl:'',
                //     pasger3_phone:'',
                //     pasger4_name:'',
                //     pasger4_imageurl:'',
                //     pasger4_phone:'',
                //     date:idate
                //     }).setACL(acl).save().catch(console.error);

            }
            

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

        }, function(error) {
           // error is an instance of AVError.
            
        });
        console.log('--------end server---------')


        
    },

    
    
});