
const {getList} = require('../controller/blog');
const {SucessModel,ErrorModel} = require('../model/resModel');


const handleBlogRouter = (req,res)=> {
    const method = req.method;
    
    //get list
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author,keyword);

        return new SucessModel(listData);

    }
    //get detail
    if(method === 'GET' && req.path === '/api/blog/detail'){
        return{
            msg:'detail'
        }
    }

    //new blog
    if(method === 'POST' && req.path === '/api/blog/new'){
        return {
            msg:'new blog'
        }
    }
    //update blog
    if(method === 'POST' && req.path === '/api/blog/update'){
        return {
            msg:'update update'
        }
    }
    //delete blog
    if(method === 'POST' && req.path === '/api/blog/del'){
        return {
            msg:'delete blog'
        }
    }

}

module.exports = handleBlogRouter;