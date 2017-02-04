const SERVER = require('../../utils/leancloud-storage');
const Team = require('../../model/team');
const { User } = require('../../utils/leancloud-storage');

var app = getApp();




Page({
    data:{
        team:null,
        },
    loadTeamInfo: function () {
//根据全局变量中的teamid查询当前队伍，然后同步本页面和全局变量中的team对象
        var that = this;

        new SERVER.Query(Team)
        .equalTo('objectId',this.data.team.id)
        .descending('createdAt')
        .find()
        .then((t)=>
        {
            console.log('load',t)
            that.setData({
                team: t[0]   }),
            app.globalData.team = t[0];
        }).catch(console.error);
    },

    
    onLoad:function(e){
        this.setData({
        team: app.globalData.team
      })    

      console.log(app.globalData.team)

    },

        //刷新按钮事件
    bindDriverRefreshBtn:function(e){
        console.log('触发了乘客刷新按钮')
        this.loadTeamInfo();
    },   
    
        //取消按钮事件
    bindDriverCancelBtn:function(e){
        console.log('触发了乘客取消按钮')
        var that = this;

        //弹出提示框，提示是否取消顺风车服务
        wx.showModal({
            title: '确认取消',
            content: '请确认是否离开当前顺风车',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击了确认取消')
                    //当前队伍置空，team对象passengers更新，同步全局team变量
                    new SERVER.Query(Team)
                    .equalTo('objectId',that.data.team.id)
                    .find()
                    .then((t)=>
                    {

                        var passengers = t[0].get('passengers');
                        var temp_p=[];
                        const user =User.current();
                        var name = user.get('username');
                        console.log("name:"+name);
                        for(var i =0;i<passengers.length;i++)
                        {
                            if (passengers[i].name != name)
                            {
                                temp_p=temp_p.concat(passengers[i]);
                            }
                        };
                        console.log(temp_p);
                        t[0].set('passengers',temp_p).save();
                        user.set('currentTeam','').save();

                        //t[0].set('teamsts','C').save();
                        //that.data.team =t[0],
                        app.globalData.team=null

                    }).catch(console.error);
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
                    console.log('用户点击取消，继续等待')
                }
            }
        })
    }
        
});