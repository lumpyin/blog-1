
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');
const {SucessModel,ErrorModel} = require('../model/resModel');


const handleBlogRouter = (req,res)=> {
    const method = req.method;
    const id = req.query.id;

    //get list
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author,keyword);
        // return new SucessModel(listData);
        const result = getList(author,keyword);
        return result.then(listData => {
            return new SucessModel(listData);
        })
    }

    //get detail
    if(method === 'GET' && req.path === '/api/blog/detail'){
       
        //const data = getDetail(id);
        //return new SucessModel(data);
        const result = getDetail(id);
        return result.then(data => {
            return new SucessModel(data);
        })
    }

    //new blog
    if(method === 'POST' && req.path === '/api/blog/new'){
        
        // const data = newBlog(req.body);
        // return new SucessModel(data);
        req.body.author = 'zhangsan';
        const result = newBlog(req.body);
        return result.then(data => {
            return new SucessModel(data);
        })

    }
    //update blog
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id,req.body);
        return result.then(val => {
            if(val){
                return new SucessModel();
            }else{
                return new ErrorModel('update failed');
            }
        })
        
    }
    //delete blog
    if(method === 'POST' && req.path === '/api/blog/del'){
        const author = 'zhangsan';
        const result = delBlog(id,author);
        return result.then(val => {
            if(val){
                return new SucessModel();
            }else{
                return new ErrorModel('delete failed');
            }
        })
      
    }

}

module.exports = handleBlogRouter;