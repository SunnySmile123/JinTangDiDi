const SERVER = require('../../utils/leancloud-storage');
const Team = require('../../model/team');


Page({
    data:{
        telephone:'',
        list:[ ],
        imageUrl:"../../images/abc.jpg"
    },

    onLoad:function(e){
       // 页面初始化 options为页面跳转所带来的参数
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
        
     
            this.setData({
                name: e.name,
                scrollHeight:500,
                telephone:'passagerTel'
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
    bindUpdateBtn:function(e){
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