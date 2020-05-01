// pages/wxml/index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '测试提交信息',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickname: '',
    infoMess: '',
    userN:'',
    passW:'',
    inviteCode:'',
  },
  //用户名和密码输入框事件
  accountInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      passW:e.detail.value
    })
  },
  inviteCodeInput:function(e){
    this.setData({
      inviteCode:e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(){
    if(this.data.userN.length == 0 || this.data.passW.length == 0 || this.data.inviteCode == 0){
      this.setData({
        infoMess:'提示：用户名、密码、邀请码不能为空！',
      })
    }else{
      /*
      this.setData({
        infoMess:'',
        userName:'用户名：'+this.data.userN,
        passWd:'密码：'+this.data.passW
      })
      */
     this.setData({
      motto: '发起注册……'
    })



     console.log('test for 中文昵称！')
     console.log(this.data.userInfo)
     console.log(this.data.userInfo.nickName)
     var nickname = encodeURI(this.data.userInfo.nickName)
     console.log(nickname)
     var _this= this;

      wx.request({
        url: 'https://www.microservice.work:8080/login?username='+this.data.userN+'&password='+this.data.passW+'&bond=1&share=1&duration=30&sell=0&nickname='+this.data.userInfo.nickName,
        
        //method: 'POST',
        /*
        header: { 'content-type': 'application/json'},
        data: {
          userName:this.data.userN,
          passWord:this.data.passW,
          inviteCode:this.data.inviteCode
        },
        */
        success: function(res) {
          console.log(res)// 服务器回包信息
          if(res.data == 'True'){
            wx.showToast({ title: '提交成功' })
            _this.setData({
              motto: '恭喜！提交注册成功！'
            })
          }else{
            wx.showToast({ title: '提交失败', icon:'none' })
            _this.setData({
              motto: '抱歉！注册失败了！'
            })
          }
        },
        fail: function(res) {
          wx.showToast({ title: '系统错误', icon:'none' })
          console.log(res)
          _this.setData({
            motto: '抱歉！注册失败了！'
          })

        }
      })

    }
  },
  //重置按钮点击事件
  clearBtnClick:function(e){
    this.setData({
      motto: '请提交注册信息',
      /*
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      */
      infoMess: '',
      userN:'',
      passW:'',
      inviteCode:'',
      Account:'',
      Password:'',
      InviteCode:'',
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        nickname: app.globalData.userInfo.nickname
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})