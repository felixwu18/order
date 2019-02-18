// 渲染页面
(function dataFromlocalToPrintCard(){
  // 从本地等获取数据
  var ordersArray = getStoreordersArray('orders');
  var length = ordersArray.length;

  var tableIndex = ordersArray[length-1].tableIndex;
  var total = ordersArray[length-1].total;
  var orderIndex = new Date().getTime();
  var orderTime = ordersArray[length-1].orderDetail[0].orderTime;
  var total = ordersArray[length-1].total;
  // 渲染
  $('.tableIndex').text(tableIndex);
  $('.totalFee').text(total);
  $('.orderIndex').text(orderIndex);
  $('.orderTime').text(orderTime);
  //所点菜品个数
  var food = ordersArray[length-1].orderDetail;
  var tbody = '';
  for(var i=0;i<food.length;i++){
    tbody +=`
              <tr>
                  <td>${food[i].foodName}</td>
                  <td>${food[i].amount}</td>
                  <td>${food[i].price}</td>
              </tr>
            `;
  }
  $('.tbody').html(tbody);
})()
//定义加载本地数据的函数
function getStoreordersArray(key) {
  var ordersArray = localStorage.getItem(key);
  // 先判断本地存储有没有
  if (ordersArray == null || ordersArray == '') {
    ordersArray = new Array();
  } else {
    ordersArray = JSON.parse(ordersArray);
  }
  // 返回解析的对象
  return ordersArray;
}
//打印
function print(){
  $("#printSection").print({iframe:true,prepend:'<br/>'});
}
//点击跳转
function lookOrderLog(){
  window.location.assign('orderManage.html');
}
//二维码
$("#code").text("");  //初始化二维码的位置
$('#code').qrcode({
  render : "canvas",//也可以替换为table
  // render : "table",
    width : 100,
    height : 100,
    // text : "http://www.baidu.com"    //二维码内置内容，如果是URL形式一般浏览器会自动加载
    text : "http://10.2.0.203:3000/src/page/order_.html"    //二维码内置内容，如果是URL形式一般浏览器会自动加载
});
