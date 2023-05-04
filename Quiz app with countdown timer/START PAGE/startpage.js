const submitBtn = document.getElementById("submitbtn");
const user = document.getElementById("username");
const form = document.getElementById("form");



form.addEventListener('submit', (e) => {
    const userName = user.value;
    if (user.value == '') {
        e.preventDefault();
        return alert("enter a user name");
    } else {
        localStorage.setItem('user-name', userName);
        window.location.href = '/START PAGE/startpage.js';
    }

}) 