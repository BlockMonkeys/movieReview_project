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


router.get('/create', (req, res) => {
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
        let title = `Movie Review Write Page`;
        let description = page.createPage;
        let buttons = `<p><a href="/">홈페이지로 돌아가기</a></p>`
        let authUI = loginCheck(req, res);
        let template = page.template(title, description, '', buttons, authUI);
        res.send(template);
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/create_process', (req, res)=> {
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let date = req.body.date;
    db.query(`INSERT INTO movies(title, description, author, created) VALUES ('${title}', '${description}', '${author}', '${date}');` ,(err ,result)=>{
        if(err) throw err;
    });
    res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/update/:id', (req, res)=> {
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
    let id = req.params.id;
    db.query(`SELECT * FROM movies WHERE id=${id}`, (err, movies)=>{
        if(err) throw err;
        let title = `Movie Review Update Page`;
        let description = page.updatePage(movies[0].title, movies[0].description, movies[0].author, id);
        let buttons = `<p><a href="/">취소</a></p>`
        let authUI = loginCheck(req, res);
        let template = page.template(title, description, '', buttons, authUI);
        res.send(template);
    });
    } else {
        res.redirect('/auth/login'); 
    }
});

router.post('/update_process/:id', (req, res)=> {
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let date = req.body.date;
    db.query(`UPDATE movies SET title='${title}', description='${description}', author='${author}', created='${date}' WHERE id=${id};`, (err, result)=>{
        if(err) throw err;
    });
    res.redirect(`/board/${id}`);
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/delete_process/:id', (req, res)=> {
    if(req.cookies.user_id === "admin" && req.cookies.user_password === "1234"){
    let id = req.params.id;
    db.query(`DELETE FROM movies WHERE id=${id}`, (err, result)=>{
        if(err) throw err;
    });
    res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
        db.query(`SELECT * FROM movies WHERE id=${id}`, (err, result)=> {
            let title = result[0].title;
            let description = result[0].description;
            let created = `
            <p>영화 감독 : ${result[0].author}</p>
            <p>영화 개봉일 : ${String(result[0].created).substring(8, 16)}</p>
            `
            let buttons = `
            <a href="/">돌아가기</a>
            <a href="/board/update/${id}">수정하기</a>
            <form action="/board/delete_process/${id}" method="POST">
                <input type="submit" value="삭제하기">
            </form>
            `;
            let authUI = loginCheck(req, res);
            let template = page.template(title, description, created, buttons, authUI);
            res.send(template);
    });
});

module.exports = router;