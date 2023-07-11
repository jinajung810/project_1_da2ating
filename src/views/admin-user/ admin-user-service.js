let url = "http://127.0.0.1:5555";

fetch(`${url}/api/user`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
})
.then((res) => res.json())
.then((data) => {
    let users = data.data;
    let userContents = '';
    users.forEach(user => {
        let userArr = `<div class="user">
        <h2>${user.id} </h2>
        <div class="email">${user.email}</div>
    </div>`
    userContents += userArr;
    });
    let container = document.querySelector('.container');
    container.innerHTML = userContents;

});