const queryString = require('querystring'); 

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}
//session
const SESSION_DATA = {};

const getPostData = (req)=> {
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return;
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data',chunk =>{
            postData += chunk.toString();
        })
        req.on('end',()=>{
           if(!postData){
               resolve({});
               return
           }
           resolve(
               JSON.parse(postData)
           )
        })

    })
    return promise;
}


const serverHandle = (req,res)=> {

    res.setHeader('Content-type','application/json');
    //handle path
    const url = req.url;
    req.path = url.split('?')[0];

    //handle query
    req.query = queryString.parse(url.split('?')[1]);

    //handle cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })
   
    //handle session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {};
        }
    }else{
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];
    

    //handle post data
    getPostData(req).then(postData=> {
        req.body = postData;

        //handle blog router
        // const blogData = handleBlogRouter(req,res);
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return;
        // }
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
       
        

        //handle user router
        // const userData = handleUserRouter(req,res);
        // if(userData){
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return;
        // }

        const userRouter = handleUserRouter(req,res);
        if(userRouter){
            userRouter.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return 
        }

        //404
        res.writeHead(404,{"Content-type":"text/plain"});
        res.write("404 Not Found\n");
        res.end();

    })

   

}

module.exports = serverHandle;
//process.env.NODE_ENV