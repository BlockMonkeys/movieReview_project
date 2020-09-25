module.exports={
    template: (title, description, list, buttons, authUI) =>`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
        <hr>
        ${description}
        ${list}
        <hr>
        ${buttons}
        ${authUI}
    </body>
    </html>
    `,
    mainlist:(movies)=>{
        let result = `<ul>`;
        let i = 0;
        while(i < movies.length){
            result = result + `<a href=/board/${movies[i].id}>` + `<li>${movies[i].title}</li>` + `</a>`;
            i = i + 1;
        }
        result = result + `</ul>`;
        return result;
    },
    createPage: `
    <form action="http://localhost:3000/board/create_process" method="POST">
    <p>
        <h3>영화제목을 입력해주세요</h3>
        <input type="text" name="title" placeholder="영화제목">
    </p>
    <p>
        <h3>영화에 대한 설명을 입력해주세요</h3>
        <textarea placeholder="영화설명"name="description" cols="55" rows="10"></textarea>
    </p>
    <p>
        <h3>영화 감독의 이름을 입력해주세요</h3>
        <input type="text" name="author" placeholder="영화감독명">
    </p>
    <p>
        <h3>영화 개봉 날짜를 선택해주세요</h3>
        <input type="date" name="date" value="2020-01-01" min="1980-01-01" max="2020-12-12">
    </p>
    <p>
        <input type="submit">
    </p>
    </form>
    `,
    updatePage:(title, des, author, id)=>`
    <form action="http://localhost:3000/board/update_process/${id}" method="POST">
    <p>
        <h3>영화제목을 입력해주세요</h3>
        <input type="text" name="title" value="${title}">
    </p>
    <p>
        <h3>영화에 대한 설명을 입력해주세요</h3>
        <textarea name="description" cols="55" rows="10">${des}</textarea>
    </p>
    <p>
        <h3>영화 감독의 이름을 입력해주세요</h3>
        <input type="text" name="author" value="${author}">
    </p>
    <p>
        <h3>영화 개봉 날짜를 선택해주세요 (재설정 필수)</h3>
        <input type="date" name="date" value="2020-01-01" min="1980-01-01" max="2020-12-12">
    </p>
    <p>
        <input type="submit">
    </p>
    </form>
    `
};