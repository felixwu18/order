// 导航栏选项卡
window.onload = function () {
    var list = document.getElementsByClassName("list")[0];
    var lis = list.getElementsByTagName("li");
    var public = document.getElementsByClassName("publicMian")[0];
    var div = public.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            $(".list li").removeClass("active");
            $(this).addClass("active");
            for (var i = 0; i < lis.length; i++) {
                div[i + 1].className = "";
            }
            div[this.index + 2].className = "right";
        }
    }
}

//点击删除按钮弹出并删除用户
var trid = "";

function openDeleteWindow(ob) {
    // 点击删除按钮弹出删除页面
    $('.removeBill').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeBi').fadeIn();
    })
    $('.removeUser').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeUse').fadeIn();
    });
    // 点击取消隐藏删除页面
    $('.no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
        $('#removeUse').fadeOut();
    });
    trid = $(ob).parent().parent().parent().prop("id");
};
// 点击确定按钮删除各条记录
function deleteRecord() {
    $('.zhezhao').css('display', 'none');
    $('#removeBi').fadeOut();
    $('#removeUse').fadeOut();
    $("#" + trid).remove();
}