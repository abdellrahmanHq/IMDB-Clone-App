var sideOption = document.getElementById("side");

function showMenu() {
    sideOption.style.left = "0";
}

function hideMenu() {
    sideOption.style.left = "-300px";
}

function createNewAccount() {
    window.location.href = "/Sign/Regstration/registration.html";
}

document.querySelector('.create-account-button').addEventListener('click', createNewAccount);

function aaa() {
    window.location.href = "/IMDBPro/pro.html";
}