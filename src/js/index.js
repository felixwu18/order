$(function () {
    $(".button").click(function () {
        var inps = document.getElementsByTagName("input");
        var username = inps[0].value;
        var password = inps[1].value;
        var personArray = JSON.parse(localStorage.getItem("userInfo"));
        for (let i = 0; i < personArray.length; i++) {
            if (personArray[i].username == username) {
                if (personArray[i].password == password) {
                    alert("登录成功")
                    window.location.replace("../page/primary.html")
                } else {
                    alert("密码错误")
                }
            }
        }
    })
})