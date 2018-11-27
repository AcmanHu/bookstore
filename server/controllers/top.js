const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const top = await mysql('books')
        .select('id', 'title', 'image', 'count')
        .orderBy('count', 'desc') // 设置排序方式  为倒叙
        .limit(9)// 限制为九条数据
    ctx.state.data = {
        list: top
    }
}
