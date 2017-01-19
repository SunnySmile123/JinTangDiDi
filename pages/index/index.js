const AV = require('../../utils/leancloud-storage');
const Passengers = require('../../model/passengers');


//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    start_address:'金唐大厦西门',
    array_des:['西局地铁站','七里庄地铁站','菜户营桥东','菜户营桥北'],
    index_des:0,
  },

  //页面初始化
  onLoad: function () {
     return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user =>
      user ? user : AV.User.loginWithWeapp()
    ).then((user) => {
      console.log('uid', user.id);
      return new AV.Query(Passengers)
        .equalTo('user', AV.Object.createWithoutData('User', user.id))
        .catch(console.error);
    });
    console.log('onLoad');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  bindDriveBtnTap:function(){
    wx.navigateTo({
      url: '../driver/driver?name='+this.data.userInfo.nickName
    })
    
  },
  bindTakeBtnTap:function(){
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Passengers({
      wxid: 'yukikanking',
      phone: '627054',
      user: AV.User.current()
    }).setACL(acl).save().catch(console.error);

        wx.navigateTo({
      url: '../passager/passager?name='+this.data.userInfo.nickName
    });
  },
 
});
