const getList = (author,keyword) => {
    //mock data
    return [
        {
            id:1,
            title:'A',
            content:'A',
            createTime:'1587321060284',
            author:'yi'
        },
        {
            id:2,
            title:'B',
            content:'B',
            createTime:'1587321060284',
            author:'yi2'
        },
    ]
}

module.exports = {
    getList
}