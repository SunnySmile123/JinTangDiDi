Page({
    data:{
        idType:2,//0-司机，1-乘客
        carState:0,//0-等待，1-出发，2-取消
        driverInfo:{
            name:"",
            tel:"",
            // imageurl:"",
            // carNum:"",
            // goTime:'',
            // seatNum:2,
            // index_carColor:0,
            // index_carType:0,
        },
        array_carColor:['黑色','白色','灰色','黄色','红色'],
        
        array_carType:['两厢车','三厢车','SUV'],
        
        pasger1:{
            name:"等待乘客...",
            tel:"",
            imageurl:""
            },
        pasger2:{
            name:"等待乘客...",
            imageurl:""
            },
        pasger3:{
            name:"等待乘客...",
            imageurl:""
            },        
        pasger4:{
            name:"等待乘客...",
            imageurl:""
            },

        },
    
    onLoad:function(e){
    
    },
    
    //取消按钮事件
    bindPassagerCancelBtn:function(e){
        console.log('触发了乘客取消按钮')

        //弹出提示框，提示是否取消顺风车服务
        wx.showModal({
            title: '确认取消',
            content: '请确认是否取消搭乘顺风车服务',
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