const loginCheck = (username,password)=>{
    if(username === 'yi' && password === '123'){
        return true;
    }
    return false;
}

module.exports = {
    loginCheck
}