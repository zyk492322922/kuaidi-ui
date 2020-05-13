//app.js
App({
	onLaunch: function() {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		var session = wx.getStorageSync('session')
		if(!session) {
			// 登录
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					wx.request({
						url: 'http://localhost:8076/wx-api/wechat/auth', //仅为示例，并非真实的接口地址
						data: {
							code: res.code
						},
						method: 'POST',
						success: function(res) {
							if(res.data.status==1){
								console.log(res.data)
								// 保存session
								wx.setStorageSync('session',res.data.data.session)
							}
						}
					})
			
				}
			})
		}
		

	},
	globalData: {
		userInfo: null
	}
})
