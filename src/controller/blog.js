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

const getDetail = (id)=> {
    
    return {
        id:1,
        title:'A',
        content:'A',
        createTime:'1587321060284',
        author:'yi'
    }
}

const newBlog = (blogData = {}) => {
   
    return {
        id:3,
    }
}

const updateBlog = (id,blogData={})=> {
   
    return true;
}

const delBlog = (id)=> {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}