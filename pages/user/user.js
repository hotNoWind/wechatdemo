// pages/user/user.js
Page({
    data: {
        nickName: '',
        avatarUrl: '',
        showHistory: true,
        moviesName: []
    },
    onLoad () {
        wx.getUserInfo({ // 获取用户信息
            success: (res) => {
                this.setData({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                })
            }
        })
        
    },
    toMoviesDetail (e) {
        let id = e.currentTarget.dataset.nub
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + id
        })
    },
    onShow()  {
        let arr = wx.getStorageSync('arr');
        wx.request({
            url: 'https://db.miaov.com/doubanapi/v0/movie/list',
            success: (res) => {
                let newData = res.data.data.filter((item) => {
                    let isHas = false;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] == item._id) {
                            isHas = true
                        }
                    }
                    return isHas
                })
                newData = newData.map((item) => {
                    let obj = {
                        nub: item._id,
                        val: item.title.trim().split('/')[0]
                    }
                    return obj
                })
                if ( newData.length > 0 ) {
                    this.setData({
                        moviesName: newData,
                        showHistory: true
                    })
                } else {
                    this.setData({
                        moviesName: newData,
                        showHistory: false
                    })
                }
                
            }
        })
    },
    clearHisMess() { // 清除历史记录
        wx.clearStorageSync('arr')
        this.setData({
            moviesName: [],
            showHistory: false
        })
    }
})