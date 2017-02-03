const SERVER = require('../../utils/leancloud-storage');
const Team = require('../../model/team');
const { User } = require('../../utils/leancloud-storage');

var app = getApp();

Page({
    data:{
        team:null,
        },
    //根据全局变量中的teamid查询当前队伍，然后同步本页面和全局变量中的team对象    
    loadTeamInfo: function () {
        
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
    },
    //左上角返回按钮触发事件，等同点击了‘取消’按钮
    onUnload:function(){
       console.log('触发了司机取消按钮')

        var that = this;

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
                    new SERVER.Query(Team)
                    .equalTo('objectId',that.data.team.id)
                    .descending('createdAt')
                    .find()
                    .then((t)=>
                    {
                        t[0].set('teamsts','C').save();
                        that.data.team =null,
                        app.globalData.team=null
                    }).catch(console.error);
                    wx.navigateBack({
                        delta: 2, // 回退前 delta(默认为1) 页面
                        //url:'../index/index',
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
                }else{
                    wx.navigateTo({
                      url: '../waitdriver/waitdriver',
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
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });
        console.log('------- waitDriver page onUnload event----', )
    },
    
    //刷新按钮事件
    bindDriverRefreshBtn:function(e){
        console.log('触发了司机刷新按钮')
        this.loadTeamInfo();
    },    
    //发车按钮事件
    bindDriverGoBtn:function(e){
        console.log('触发了司机发车按钮')

        var that =this;

        //弹出提示框，提示是否取消顺风车服务
        wx.showModal({
            title: '确认发车',
            content: '感谢您提供顺风车服务，请确认是否发车',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {//用户点击确定-start
                    console.log('用户点击了确认发车')
                    //teamsts置Y 
                    new SERVER.Query(Team)
                    .equalTo('objectId',that.data.team.id)
                    .descending('createdAt')
                    .find()
                    .then((t)=>
                    {
                        t[0].set('teamsts','Y').save();
                        that.data.team =null,
                        app.globalData.team=null
                    }).catch(console.error);


                    wx.navigateBack({
                        delta: 2, // 回退首页
                    })
                }//用户点击确定-end
                else{
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });
    },

    //取消按钮事件
    bindDriverCancelBtn:function(e){
        console.log('触发了司机取消按钮')

        var that = this;

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
                    new SERVER.Query(Team)
                    .equalTo('objectId',that.data.team.id)
                    .descending('createdAt')
                    .find()
                    .then((t)=>
                    {
                        t[0].set('teamsts','C').save();
                        that.data.team =null,
                        app.globalData.team=null
                    }).catch(console.error);
                    wx.navigateBack({
                        delta: 2, // 回退前 delta(默认为1) 页面
                        //url:'../index/index',
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
                    
                   

                }else{
                    console.log('用户点击取消，继续等待乘客')
                }
            }
        });
    },
});