module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial</h1>');
    //printing the cookie in server (terminal here) from browser
    console.log(req.cookies);
    //to send the query to browser from here we use res
     res.send('user_id', 25);
    return res.render('home',{
        title: 'Home'

    })
}