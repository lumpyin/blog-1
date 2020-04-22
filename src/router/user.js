
const {login} = require('../controller/user');
const {SucessModel,ErrorModel} = require('../model/resModel');
const {set} = require('../db/redis');



const handleUserRouter= (req,res)=> {
    const method = req.method;
   

    //login
    if(method === 'POST' && req.path === '/api/user/login'){
        const {username,password} = req.body;
        //const {username,password} = req.query;
        const result = login(username,password);

        return result.then(data => {
            if(data.username){
                //set up sesssion
                req.session.username = data.username;
                req.session.realName = data.realName;
                //sync with redis
                set(req.sessionId,req.session);

                return new SucessModel()
            }
            return new ErrorModel('login failed');
        })
     
    }
   
    //login test
    // if(method === 'GET' && req.path === '/api/user/login-test'){
    //     if(req.session.username){
    //         return new Promise.resolve(
    //             new SucessModel({
    //               session:req.session
    //             })
    //         );
    //     }
    //     return Promise.resolve(new ErrorModel('not login'));
    // }
}

module.exports = handleUserRouter;