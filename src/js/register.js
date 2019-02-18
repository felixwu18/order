$(function () {
    $(".add").click(function () {
  
        var inps = document.getElementsByTagName("input");
        //获取input值
        var username = inps[0].value;
        var password = inps[1].value;
        var realname = inps[2].value;
        var age = inps[3].value;
        var job = inps[4].value;
        var sex = inps[5].value;
        var data = {
            username: username,
            password: password,
            sex: sex,
            realname: realname,
            age: age,
            job: job
        };
        var inp1 = username.match(/\d{6}/);
        if (inp1 == null) {
            alert("用户名应该输入六位");
            return false;
        }
        var inp2 = password.match(/\w{9}/);
        if (inp2 == null) {
            alert("密码应该输入九位【数字或字母或下滑线】");
            return false;
        }
        var arr = JSON.parse(localStorage.getItem("userInfo"));
        console.log(arr.username);
        for (let k = 0; k < arr.length; k++) {
            if (arr[k].username == username) {
                alert("该用户已存在")
                return;
            }
        }
        var tr = `<tr>`;
        $("input").each(function () {
            var val = $(this).val();
            tr += `<td>${val}</td>`
        })
        tr += `<td><a href='#'>Delete</a></td></tr>`;
        $("tbody tr:last-child").after(tr);
        //调用函数，存储到本地
       var trueOrFalse =  fn(data.username);
       if(trueOrFalse==true){
        save(data);
       }
    })
//保存本地
function save(data) {
    //从本地读取
    var personArray = getStorePersonArray('userInfo');
    personArray.push(data);
    // //注册信息存储本地
    localStorage.setItem('userInfo', JSON.stringify(personArray));
}
//加载本地数据
function getStorePersonArray(key) {
    personArray = localStorage.getItem(key);
    // 先判断本地存储有没有
    if (personArray == null || personArray == '') {
        personArray = new Array();
    } else {
        personArray = JSON.parse(personArray);
    }
    return personArray;
}
//检测用户名是否存在
function fn(username){
    var personArray = getStorePersonArray('userInfo');
    for(var i=0;i<personArray.length;i++){
        if(personArray[i].username==username){
            alert("该用户已存在")
            return false;
        }
    }
    return true;
}
//用户输入的内容渲染到页面
(function () {
    let str1 = "<tr>",
        str2 = "</tr>",
        contentStr2 = "",
        tbody = document.getElementsByTagName("tbody")[0];
    var arr=JSON.parse(localStorage.getItem("userInfo"));
    for (let i = 0; i < arr.length; i++) {
        let contentStr = "";
        for (let j in arr[i]) {
            contentStr += `<td>${arr[i][j]}</td>`;
        }
        contentStr = str1 + contentStr+"<td><a>Delete</a></td>" + str2;
        contentStr2 += contentStr;
    };
    tbody.innerHTML = contentStr2;
    $("tbody").click(function(e){
        var node=$(e.target);
            if(node.text()=="Delete"){
                //1.获取当前行工号num
                var person=node.parents("td").siblings("td").html();
                console.log(person);
                //2. 获取localstorage里面的数据，转成对象数组
                var arr=JSON.parse(localStorage.getItem("userInfo"));
                //3. 循环对象数组，用每一个元素的username值和
                //工号num比对一下，比如相等，说明找到了，那就删除他
                for(let i=0;i<arr.length;i++){
                    if(arr[i].username==person){
                        arr.splice(i,1);
                        localStorage.clear();
                        localStorage.userInfo=JSON.stringify(arr);
                    }
                }
                 console.log(localStorage.getItem("userInfo"));
                //4. 把这个对象转换为字符串在写入localstorage
                node.parents("tr").remove();
            }
    })
})();
})