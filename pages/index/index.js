//index.js
//获取应用实例
var app = getApp();
const SERVER = require('../../utils/leancloud-storage');
const Passengers = require('../../model/passengers');
const Team = require('../../model/team');

Page({
  data: {
    userInfo: {},
  },

  //页面初始化start
  onLoad: function () {

    console.log('driver onLoad')
    var that = this
    //调用应用实例的方法获取全局数据,（微信id，头像url，昵称等）
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })

    return SERVER.Promise.resolve(SERVER.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user =>
      user ? user : SERVER.User.loginWithWeapp()
    ).then((user) => {
      console.log('uid', user.id);
      return new SERVER.Query(Passengers)
        .equalTo('user', SERVER.Object.createWithoutData('User', user.id))
        .catch(console.error);
    });    
  },//页面初始化end

  //开车按钮触发事件
  bindDriveBtnTap:function(){

    //根据全局变量设置司机的微信昵称和头像url
    wx.setStorageSync('drivername',this.data.userInfo.nickName)
    wx.setStorageSync('driverimageurl',this.data.userInfo.avatarUrl)
    
    var driver_status = wx.getStorageSync('driverstatus')
    console.log("-----" + JSON.stringify(driver_status))
    //司机未录入过信息，转入司机录入信息界面
    if(driver_status == ""){
        //页面定向到司机信息页
        wx.navigateTo({
          url: '../driver/driver'
        })
    }else{
      //司机已录入过信息，跳转到等待乘客界面
      wx.setStorageSync('driverstatus','1')

      wx.navigateTo({
        url: '../waitdriver/waitdriver'
      })
    }
    

    

    
  },

  //乘客按钮触发事件
  bindTakeBtnTap:function(){

    //页面定向到乘客选择页
    wx.navigateTo({
      url: '../passager/passager'
    })
  },

 
})
