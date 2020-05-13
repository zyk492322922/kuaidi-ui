//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		homeBannerList: [{
				"img": "http://a0.att.hudong.com/64/76/20300001349415131407760417677.jpg",
				"name": "zhangsan"
			},
			{
				"img": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3125526008,3010441145&fm=26&gp=0.jpg",
				"name": "lisi"
			},
		],
		tabList: [{
				"img": "../../image/navi-tab1.png",
				"content": "意见反馈"
			},
			{
				"img": "../../image/navi-tab2.png",
				"content": "使用指南"
			}
		],
		userInfo: {},
		hasUserInfo: false
	},
	// 取storage中的用户信息
	onLoad: function() {
		this.setData({
			userInfo: wx.getStorageSync('userInfo') || {},
			hasUserInfo: wx.getStorageSync('hasUserInfo') || false
		})
	},

	// 获取用户信息 (后期搞成自定义弹窗组件 进行公用)
	getUserInfo: function(e) {
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId   
							app.globalData.userInfo = res.userInfo
							// 取到的用户头像 昵称等存本地缓存
							wx.setStorageSync('userInfo', res.userInfo)
							wx.setStorageSync('hasUserInfo', true)
							// 绑定数据
							this.setData({
								userInfo: res.userInfo,
								hasUserInfo: true
							})
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res1)
							}
						}
					})
				}
			}
		});

	}



})
