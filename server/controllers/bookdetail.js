const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { id } = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'csessioninfo.user_info')
        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
        .where('id', id)
        .first()// 第一条数据
    const info = JSON.parse(detail.user_info)

    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        user_info: {
            name: info.nickName,
            image: info.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1) // 让count字段每次累加一次  用户每次点击count字段都会知增加一个
}
