const SERVER = require('../../utils/leancloud-storage');
const Team = require('../../model/team');


Page({
    data:{
        name:'乘客',
        idType:1,
        telephone:'',
        array_goAddr:['金唐大厦','七里庄','金玉大厦','东单'],
        index_goAddr:0,
        array_arrAddr:['西局地铁站','菜户营桥北','菜户营桥东','七里庄'],
        index_arrAddr:0,
        list:[ {name:"58841062128fe1006832a75d",go:"00",arr:"1",goTime:'18:00'}],
            // {name:"1号司机",go:0,arr:1,goTime:'18:00'},
            // {name:"2号司机",go:0,arr:1,goTime:'18:00'},
            // {name:"3号司机",go:0,arr:1,goTime:'18:00'},
            // {name:"4号司机",go:1,arr:1,goTime:'18:00'},
            // {name:"5号司机",go:1,arr:1,goTime:'18:00'},
            // {name:"6号司机",go:1,arr:1,goTime:'18:00'},
            // {name:"7号司机",go:1,arr:1,goTime:'18:00'},],
        imageUrl:"../../images/abc.jpg"
            //"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqyjtt5UNwQZQxYQGOo4L7g3G4iazf4iccp3GmicGtx167Kp7kjQpEvMfvJDcpHOjBCPOSMWkF6Aa2g/0"
    },

    onLoad:function(e){
       // 页面初始化 options为页面跳转所带来的参数
        console.log("乘客微信昵称为为："+e.name);
        var passagerTel = wx.getStorageSync('tel');
        var l=[];
        var query = new SERVER.Query('Team');
        var that =this;
        var team= query.equalTo('teamsts', 'N').find().then(function(team) {
        var num = Math.min((team.length-1),5);
         console.log("xxxxxx:" + JSON.stringify(num))
        for (var i=0;i<= num;i++)
        {
             l =l.concat([{name:"test",
                        go:team[i].get('start'),
                        arr:team[i].get('end'),
                        goTime:team[i].get('goTime')}]);
                     console.log("xxxxxx:" + JSON.stringify(team[i]))
                    that.setData({
                         'list': l });
        }
        })

         //.then(function(results) {
        //     var num = Math.min((results.length-1),5);
        //     for (var i=0;i<= num;i++)
        //     {
        //         var team = results[i];
        //         //获取司机对象对象
        //         var driver = SERVER.Object.createWithoutData('Drivers', team.get('driver')).fetch().then(function (success) {
        //             console.log("司机对象" +JSON.stringify(driver));  
        //              //获取司机对象对应的乘客对象
        //             // var dp = SERVER.Object.createWithoutData('Passengers', driver.get('pid')).fetch().then(function (success) {
        //             //     //获取成功成功
        //             //     console.log("司机对象" +JSON.stringify(dp));
        //              l =l.concat([{name:'dp.get()',
        //                 go:'temp',
        //                 arr:'111',
        //                 goTime:'2222'}]);
        //              console.log("xxxxxx:" + JSON.stringify(l))
        //             this.setData({
        //                  'list': l });
        //         }, function (error) {
        //             // 异常处理
        //             console.error(error);
        //         });
        //     }
        // }),
        
     
            this.setData({
                name: e.name,
                scrollHeight:500,
                telephone:'passagerTel'
            })

            // this.setData({
            //     'list': l });
            //    console.log("aaaaa:" + JSON.stringify(this.data.list))
            
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
        console.log("xxxxxx:" + JSON.stringify(e.detail.id));
        var team = SERVER.Object.createWithoutData('Team', '58841062128fe1006832a75d');
       team.set("passenger1",'testpa');
       team.save();
        
        console.log("xxxxxx:" + JSON.stringify(team));
        //页面定向到乘车页
        wx.navigateTo({
            url: '../waitpassager/waitpassager'
        })
    },

    

})