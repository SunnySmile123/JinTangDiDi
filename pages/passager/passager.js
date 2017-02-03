const SERVER = require('../../utils/leancloud-storage');
const { User } = require('../../utils/leancloud-storage');
const Team = require('../../model/team');


Page({
    data:{
        telephone:'',
        //editPhone:false,
        teams:[],
        imageUrl:"../../images/abc.jpg"
    },
loadTeams: function () {
    //查询当前有效的队伍信息
    var that=this;
    var l=[];
    new SERVER.Query(Team)
        .equalTo('teamsts','N')
        .descending('createdAt')
        .find()
        .then(function(t)
        {
            console.log(t.length)

            for (var i=0;i< t.length;i++)
            {
                l =l.concat([{
                    id:t[i].get('objectId'),
                    name:t[i].get('driver').name,
                    img:t[i].get('driver').img,
                    start:t[i].get('start'),
                    end:t[i].get('end'),
                    goTime:t[i].get('goTime'),
                    }]);
            }
            that.setData({
                teams: l   })
        }).catch(console.error);
    },

    onLoad:function(e){
       // 页面初始化 options为页面跳转所带来的参数
        var passagerTel = wx.getStorageSync('tel');
        // var phone = User.current().get('phone');
        // this.setData({
        //     telephone:phone,
        // })
        this.loadTeams();
        },

    bindInputTel:function(e){
        console.log('driver input tel，携带值为', e.detail.value)
        this.setData({
            telephone:e.detail.value,
        })
        //editPhone = true;
        var tel = wx.getStorageSync('tel')
        wx.setStorageSync('tel',this.data.telephone)
        
    },
    bindListBtn:function(e){
        var that = this;
        //校验手机号是否合法
        var itel = this.data.telephone && this.data.telephone.trim()
        if(!itel){
            wx.showToast({
                title: '请输入手机号',
                icon: 'loading',
                duration: 500
                })
            return;}
        //获取行程对象
        console.log(e.currentTarget.id)
        var team = SERVER.Object.createWithoutData('Team', e.currentTarget.id).fetch().then(function (t) {
            //判断行程状态为N当前乘客数目<4
            //是-》插入乘客数据，赋值给全局变量记录用户的当前行程id，页面跳转
            if( t.get('teamsts')=='N' && t.get('passengers').length<4 )
            {
                console.log('ok')
                //获得当前user
                const user = User.current();
                var passenger =[{
                    name:user.get('username'),
                    img:user.get('img'),
                    phone:user.get('phone')
                }]
                passenger = passenger.concat(t.get('passengers'))
                console.log(passenger)
                t.set('passengers',passenger)
                t.save();
                user.set('currentTeam',t.id).set('phone',that.data.telephone).save();
                
                wx.setStorageSync('tel',that.data.telephone)
                //console.log(user)
                var app = getApp();
                app.globalData.team = t;
                //页面定向到乘车页
                wx.navigateTo({
                    url: '../waitpassager/waitpassager'
                })
            }
            else//否-》报错并刷新
            {
                wx.showToast({
                        title: '行程已失效',
                        icon: 'loading',
                        duration: 500
                        })
                that.loadTeams();
                    return;
            }
            console.log(t)
        }, function (error) {
            console.error(error);
        }); 

    },//listbtn响应事件end
})