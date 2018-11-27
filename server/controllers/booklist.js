const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page,openid} = ctx.request.query
    const size = 10
    const mysqlSelect =  mysql('books')
        .select('books.*', 'csessioninfo.user_info')
        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
        
        .orderBy('books.id', 'desc') // 数据按倒叙排列
    let books

    if(openid){
        //根据openid 过滤
        books = await mysqlSelect.where('books.openid',openid)
    }else{
        //全部图书 分页
        books = await mysqlSelect.limit(size) // 设置数据的大小
                                .offset(Number(page) * size) // 设置数据的起点
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
