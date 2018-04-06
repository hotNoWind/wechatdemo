// pages/movie-detail/movie-detail.js
let baseUrl = 'http://douban.newfq.com'
Page({
    data: {
        movie: {}
    },
    onLoad: function (options) {
        let id = options.id;
        wx.showLoading({
            title: '',
        })
        wx.request({
            url: `https://db.miaov.com/doubanapi/v0/movie/detail/${id}`,
            success: (res) => {
                let movie = res.data.data
                this.setData({
                    movie,
                    video: movie.videoUrl,
                    time: movie.pubdate,
                    cover: movie.coverUrl
                })
                wx.hideLoading()
            }
        });
    }
})