var rootDocment = ''; //你的域名
if(process.env.NODE_ENV === 'development'){
    rootDocment = 'http://127.0.0.1:88';
}else{
    rootDocment = 'http://jie12366.xyz:88';
}

export default rootDocment