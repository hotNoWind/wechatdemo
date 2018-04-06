// pages/index/index.js
Page({
    // 声明页面所需要使用的参数
    data: {
        movies: [],
        page: 1,
        size: 8,
        loading: true,
        noMore: false
    },

    // 页面加载时
    onLoad () {
        this.moviesLoad()
    },
    
    // 根据data中定义的page来显示对应的数据
    moviesLoad () {
        let page = this.data.page
        let size = this.data.size
        this.setData({ loading: true })
        wx.request({
            url: `https://db.miaov.com/doubanapi/v0/movie/list?base=true&page=${page}&size=${size}`,
            // 请求成功的函数
            success: (res) =>  {
                let data = res.data.data
                let movies = [];
                let newData = data.map( (item) => {
                    item.title = item.title.trim().split('/')[0];
                    return item;
                } );
                for (let i = 0; i < newData.length; i+=2 ) {
                    movies.push([newData[i], newData[i + 1] ? newData[i+1] : null ] )
                }
                this.setData({ movies, loading: false }) // 将请求到的数据放入data中
            }
        })
    },

    // 下拉加载
    scorllDownHandler () {
        let page = this.data.page
        this.setData({
            page: page + 1,
            noMore: false
        })
        this.moviesLoad()
    },

    // 上拉加载
    scorllUpHandler () {
        let page = this.data.page
        page--;
        if ( page < 0) {
            page = 0;
            this.setData({ noMore: true })
        }
        this.setData({
            page
        })
        this.moviesLoad()
    },
    goToMovieDetails (e) {
        let id = e.currentTarget.dataset.id
        this.setMsg(id);
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + id,
        })
    },
    setMsg: (num) => {
        let arr = wx.getStorageSync('arr') || [];
        arr = arr.filter( (item) => {
            return item != num
        } )
        arr.push(num)
        wx.setStorageSync('arr', arr)
    }
})