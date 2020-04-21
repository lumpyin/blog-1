
const {login} = require('../controller/user');
const {SucessModel,ErrorModel} = require('../model/resModel');

const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

const handleUserRouter= (req,res)=> {
    const method = req.method;
   

    //login
    if(method === 'GET' && req.path === '/api/user/login'){
        //const {username,password} = req.body;
        const {username,password} = req.query;
        const result = login(username,password);

        return result.then(data => {
            if(data.username){

                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SucessModel()
            }
            return new ErrorModel('login failed');
        })
     
    }
   
    //login test
    if(method === 'GET' && req.path === '/api/user/login-test'){
        if(req.cookie.username){
            return new Promise.resolve(SucessModel({
                username:req.cookie.username
            }));
        }
        return Promise.resolve(new ErrorModel('not login'));
    }
}

module.exports = handleUserRouter;