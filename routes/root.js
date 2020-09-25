const express = require('express');
const db = require('../db');
const page = require('../template');
const router = express.Router();

const loginCheck = (req, res) => {
    let authUI = `<a href="/auth/login">Log-In</a>`
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
        authUI = `${req.cookies.user_id} | <a href="/auth/logout">Log-Out</a>`;
        return authUI;
    } else {
        authUI = authUI;
        return authUI;
    }
}

router.get('/', (req, res)=>{
    db.query(`SELECT * FROM movies`, (err, movies)=> {
        let title = `Movie Review`;
        let description = `영화 목록`;
        let movieList = (JSON.parse(JSON.stringify(movies)));
        let list = page.mainlist(movieList);
        let buttons = `<p><a href="/board/create">리뷰쓰러가기</a></p>`
        let authUI = loginCheck(req, res);
        let template = page.template(title, description, list, buttons, authUI);
        res.send(template);
    }
)});

module.exports = router;