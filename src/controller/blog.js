const {exec} = require('../db/mysql');


const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and author ='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`;

    return exec(sql);
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