const express = require('express');
const page = require('../template');
const router = express.Router();

router.get('/login', (req, res)=>{
        let title = `Log-In Page`;
        let description = `
        <form action="/auth/login_process" method="POST">
            <p><input type='text' name='user_id' placeholder="ID"></p>
            <p><input type='password' name='user_password' placeholder="password"></p>
            <p><input type="submit" value="Log-In">
        `;
        let buttons = `<p><a href="/">홈으로 돌아가기</a></p>`
        let template = page.template(title, description, '', buttons, '');
        res.send(template);
});

router.post('/login_process', (req, res)=>{
    let user_id = req.body.user_id;
    let user_password = req.body.user_password;
    if(user_id === "admin" && user_password === "1234"){
        res.cookie(`user_id`, user_id, httpOnly=true);
        res.cookie(`user_password`, user_password, httpOnly=true);
        res.redirect(`/`);
    } else {
        res.redirect(`/auth/login`);
    }
});

router.get('/logout', (req, res)=>{
    res.clearCookie('user_id');
    res.clearCookie('user_password');
    res.redirect('/');
})



module.exports = router;