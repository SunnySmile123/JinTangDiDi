Page({
    data:{
        idType:2,//0-司机，1-乘客
        carState:0,//0-等待，1-出发，2-取消
        driverInfo:{
            name:"张三",
            tel:"13512345678",
            carNum:"京N654123",
            goTime:'18:00',
            seatNum:2,
            index_carColor:0,
            index_carType:0,
        },
        array_carColor:['黑色','白色','灰色','黄色','红色'],
        
        array_carType:['两厢车','三厢车','SUV'],
        
        pasger1:{
            name:"梁冰宇",
            tel:"13500001111"},
        pasger2:{
            name:"",
            tel:""},
        pasger3:{
            name:"",
            tel:""},        
        pasger4:{
            name:"",
            tel:""},

        },
    //初始化页面,只会调用一次
    onLoad:function(e){
        // 页面初始化 options为页面跳转所带来的参数
        console.log("onLoad程序....")
        this.setData({
            name: e.name,
            idType:e.idType
        })
    },

    //刷新按钮事件
    bindDriverRefreshBtn:function(e){
        console.log('触发了司机发车按钮')

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
                    
                    //TODO 将取消数据登记到服务器数据表中


                }else{
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });


        
    }
});