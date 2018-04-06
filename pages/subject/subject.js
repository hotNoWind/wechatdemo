// pages/subject/subject.js
Page({
    data: {
        type: [
            {
                title: '剧情',
                src: 'http://img1.gtimg.com/ent/pics/hv1/82/136/1661/108041287.jpg'
            },
            {
                title: '奇幻',
                src: 'http://pic.58pic.com/58pic/13/17/94/13b58PICPjn_1024.jpg'
            },
            {
                title: '冒险',
                src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522809006248&di=5b71c979208c26dc9dd32bcb1e8d48a7&imgtype=0&src=http%3A%2F%2Fwww.cnwnews.com%2Fuploads%2Fallimg%2F151020%2F20191SM8-11.jpg'
            },
            {
                title: '犯罪',
                src: 'http://dl.3dmgame.com/uploads/allimg/160909/333_160909103308_2.jpg'
            },
           
            {
                title: '科幻',
                src: 'http://p0.so.qhimgs1.com/bdr/_240_/t01631cd3d6a6a1700c.jpg'
            },
            {
                title: '喜剧',
                src: 'http://p2.so.qhimgs1.com/bdr/_240_/t01db2508fe5482bbee.jpg'
            },
            {
                title: '音乐',
                src: 'http://p1.so.qhimgs1.com/bdr/_240_/t01e9bd5b5c85d9d05d.gif'
            },
            {
                title: '家庭',
                src: 'http://img.mp.itc.cn/upload/20170328/fba6bef38042424497f9cce05d59f6dc_th.jpg'
            },
            {
                title: '动画',
                src: 'http://p1.so.qhimgs1.com/bdr/_240_/t01c02218cb4609e001.jpg'
            },
            {
                title: '悬疑',
                src: 'http://cs.vmovier.com/Uploads/post/2014-04-29/535f5c731ce1c.png'
            },
            {
                title: '爱情',
                src: 'http://img.mp.sohu.com/upload/20170525/46f1711605734772b77c103c5131a413_th.png'
            }
        ]
    },
    toMoviesType: (e) => {
        // console.log(e.currentTarget.dataset.text);
        let text = e.currentTarget.dataset.text
        wx.navigateTo({
            url: '../type-movies/type-movies?text=' + text
        })
    }
})