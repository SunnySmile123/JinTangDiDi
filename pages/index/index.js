//获取应用实例
var app = getApp();
const SERVER = require('../../utils/leancloud-storage');

Page({
  data: {
    userInfo: {},
  },

  //页面初始化start
  onLoad: function () 
  {
    console.log('driver onLoad')
    var that = this
    //调用应用实例的方法获取全局数据,（微信id，头像url，昵称等）
    app.getUserInfo(function (userInfo)
    {
      that.setData({
        userInfo: userInfo
      })
    })
    //获取当前leancloud小程序用户
    return SERVER.Promise.resolve(SERVER.User.current())
    //如果能获取用户，检查登陆状态是否有效
    .then(user =>user ? (user.isAuthenticated()
      .then(authed => authed ? user : null)) : null)
    //如果无效，通过微信登陆leancloud
    .then(user => user ? user : SERVER.User.loginWithWeapp())
    .then((user) => {  //打印uid
     console.log('uid：', user.id); })
    //处理异常
    .catch(error => console.error(error.message));

  },//页面初始化end

  //开车按钮触发事件start
  bindDriveBtnTap: function () 
  {
        wx.setStorageSync('name', this.data.userInfo.nickName);
        wx.setStorageSync('img', this.data.userInfo.avatarUrl);
   
    //转入行程创建界面
    wx.navigateTo({
      url: '../driver/driver'
    })
  },//开车按钮触发事件end

  //乘客按钮触发事件start
  bindTakeBtnTap:function () 
  {
      wx.setStorageSync('name', this.data.userInfo.nickName);
      wx.setStorageSync('img', this.data.userInfo.avatarUrl);
   
    //页面定向到乘客选择页
    wx.navigateTo({
      url: '../passager/passager'
    })
  },  //乘客按钮触发事件end

 
})
