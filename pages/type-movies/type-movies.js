// pages/type-movies/type-movies.js
Page({
    // 声明页面所需要使用的参数
    data: {
        movies: [],
        page: 1,
        size: 8,
        loading: true,
        noMore: false,
        val: ''
    },

    // 页面加载时
    onLoad(options) {
        let val = options.text
        this.setData({ val })
        this.moviesLoad(val)
    },

    // 根据data中定义的page来显示对应的数据
    moviesLoad(val) {
        let page = this.data.page
        let size = this.data.size
        this.setData({ loading: true })
        wx.request({
            url: `https://db.miaov.com/doubanapi/v0/movie/list`,
            // 请求成功的函数
            success: (res) => {
                let txt = this.data.val
                let data = res.data.data.filter( (item) => {
                    let isHas = false;
                    item.types.forEach( ( a ) => {
                        if ( a == txt ) {
                            isHas = true
                        } else {
                            isHas = false
                        }
                    })
                    return isHas
                } );
                let movies = [];
                let newData = data.map((item) => {
                    item.title = item.title.trim().split('/')[0];
                    return item;
                });
                for (let i = 0; i < newData.length; i += 2) {
                    movies.push([newData[i], newData[i + 1] ? newData[i + 1] : null])
                }
                this.setData({ movies, loading: false }) // 将请求到的数据放入data中
            }
        })
    },

    // 下拉加载
    scorllDownHandler() {
        let page = this.data.page
        this.setData({
            page: page + 1,
            noMore: false
        })
        this.moviesLoad(this.data.val)
    },

    // 上拉加载
    scorllUpHandler() {
        let page = this.data.page
        page--;
        if (page < 0) {
            page = 0;
            this.setData({ noMore: true })
        }
        this.setData({
            page
        })
        this.moviesLoad(this.data.val)
    },
    goToMovieDetails(e) {
        let id = e.currentTarget.dataset.id
        this.setMsg(id)
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + id,
        })
    },
    setMsg: (num) => {
        let arr = wx.getStorageSync('arr') || [];
        arr = arr.filter((item) => {
            return item != num
        })
        arr.push(num)
        wx.setStorageSync('arr', arr)
    }
})