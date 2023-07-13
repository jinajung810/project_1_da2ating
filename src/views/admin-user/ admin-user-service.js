let url = "http://127.0.0.1:5555";

fetch(`${url}/api/`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
})
.then((res) => res.json())
.then((data) => {
    let users = data.data;
    console.log(users);
    let userContents = '';
    users.forEach((v, i) => {
        let userArr = `<div class="user">
        <h2>${v.email} </h2>
        <div class="email">${v}</div>
    </div>`
    userContents += userArr;
    });
    let container = document.querySelector('.container');
    container.innerHTML = userContents;

});