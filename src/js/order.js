// $('.sideBarRight .minus_plus').off("click");
var orderTemp = {
  order: this,
  tableIndex: this,
  total: this
}


$('body').click(function(e) {
  amountMinusAndPlus(e);
});

function amountMinusAndPlus(e) {
  var className = e.target.className;
  var amount = 0;
  if (className == 'minus') {
    amount = Number($(e.target).next().text());
    if (amount > 0) {
      amount--;
      $(e.target).next().text(amount);
      if (amount == 0) {
        $(e.target).fadeOut(300);
        $(e.target).next().text(' ');
      }
    }
  }
  if (className == 'plus') {
    $(e.target).prev().prev().attr('style', 'display:inline-block');
    $(e.target).prev().prev().show();
    amount = Number($(e.target).prev().text());
    amount++;
    $(e.target).prev().text(amount);
  }
  //页面选菜的价格及时渲染页面
  userSelectedFoodFeeToDOM(e, className);
}

function userSelectedFoodFeeToDOM(e, className) {
  var price = $(e.target).parent().prev().children().text();
  var total = $('span.orderSumFee').text();
  if (className == 'plus') {
    var sumFee = Number(total) + Number(price);
    $('span.orderSumFee').text(sumFee);
  }
  if (className == 'minus') {
    var sumFee = Number(total) - Number(price);
    $('span.orderSumFee').text(sumFee);
  }
}

//模态框形成订单信息
function orderInfoGenerate() {
  //获取桌号
  var selectObj = $('select.tableIndex')[0];
  var tableIndex = selectObj.options[selectObj.selectedIndex].innerText;
  $('span.tableIndex').text(tableIndex);
  //获取总金额
  var total = $('span.orderSumFee').text();
  $('span.total').text(total);
  //获取页面订单信息, 并渲染模态框页面
  var order = getOrderInfoFromDOM();
  //全局变量临时存储
  orderTemp.order = order;
  orderTemp.tableIndex = tableIndex;
  orderTemp.total = total;
}

//确认最终订单页面订单数据再存本地
function orderInfoConfirm() {
  //从返回的对象中获取值
  var order = orderTemp.order;
  var tableIndex = orderTemp.tableIndex;
  var total = orderTemp.total;
  //订单数据存储本地
  saveOrderInfo(order, tableIndex, total);
  //跳转页面
  window.location.assign('orderPrint.html');
}

//定义获取页面订单数据的函数
function getOrderInfoFromDOM() {
  var foodName = '',
    price = 0,
    amount = 0,
    orderTime = '',
    tbody = '';
  var order = new Array(); //订单对象(所有的订单菜名对象集合存订单数组)
  //获取事件对象
  orderTime = getOrderTime();
  //通过循环过滤,筛选出已选定的菜单
  $('span.amount').each(function(index, e) {

    if (e.innerText) {
      //单个菜品的对象(注意引用类型的数据,);
      var foodObj = {
        foodName: foodName,
        price: price,
        amount: amount,
        orderTime: orderTime,
        note: '待缴费'
      };
      //数量
      foodObj.amount = e.innerText;
      // // 价格
      foodObj.price = $(e).parent().prev().children().text();
      // //菜名
      foodObj.foodName = $(e).parent().prev().prev().prev().text();
      //渲染页面
      tbody += `
                    <tr>
                      <td>${foodObj.foodName}</td>
                      <td>${foodObj.price}</td>
                      <td>${foodObj.amount}</td>
                      <td>${foodObj.orderTime}</td>
                      <td>
                        <span>${foodObj.note}</span>
                      </td>
                    </tr>
                 `;
      $('tbody').html(tbody);
      //存一个订单里
      order.push(foodObj);
    }
  })
  return order;
}

//定义获取订单时间的函数
function getOrderTime() {
  var orderTime = '';
  Date.prototype.getTime = function() {
    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()} ${this.getHours()}:${this.getMinutes()}`;
  }
  return orderTime = new Date().getTime();
}

//定义数据存本地的函数
function saveOrderInfo(order, tableIndex, total) {
  var orderObj = {
    tableIndex: tableIndex,
    orderDetail: order,
    total: total
  }
  //获取加载本地数据的函数
  var ordersArray = getStoreordersArray('orders');
  ordersArray.push(orderObj);
  // //注册信息存储本地
  localStorage.setItem('orders', JSON.stringify(ordersArray));
}

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

//表单点击颜色变化
function bgColorToggle(e) {
  e.style.cssText = `background-color:rgb(204,255,161);
                   box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6)
                   `
}

function bgColorRemove(e) {
  e.style.cssText = `background-color:white`;
}



//左边栏导航样式控制
$('.sideBarLeft').click(function(e) {
  if (e.target.tagName == 'A') {
    $('.list-group-item').css({
      'border': '0',
      'color': 'white',
      'font-size': '1.2em',
      'font-weight': 'normal'
    });
    $(e.target).css({
      'border': 'solid rgb(192,112,66)',
      'border-left': '0.5em solid rgb(192,112,66)',
      'color': 'rgb(245,245,245)',
      'font-weight': 'bold',
      'padding-left': '2em'
    });
  }
});

//懒加载
$(function() {
  $("img").lazyload({
    effect: "fadeIn"
  });
});

/* 滚动监听 */
  (function(){
   // 定义一个获取三个菜品分栏p的的距离高度(距离顶部)
   var pOffsetTop = [
     $('p.foodContent').eq(0).offset().top,
     $('p.foodContent').eq(1).offset().top,
     $('p.foodContent').eq(2).offset().top,
   ];
    // 第一个菜品分栏p的距离高度
    var initHeight = $('p.foodContent').eq(0).offset().top;
    //默认左边热菜栏选中
    $('.list-group-item').eq(0).css({
      'border': 'solid rgb(192,112,66)',
      'border-left': '0.5em solid rgb(192,112,66)',
      'color': 'rgb(245,245,245)',
      'font-weight': 'bold',
      'padding-left': '2em'
    });
    
  // 滚动事件(每次滚动都做一次循环判断)
  $(window).scroll(function() {
     for(var i=0; i<$('p.foodContent').length; i++) {
        if($(this).scrollTop() > pOffsetTop[i] - initHeight) {  // 减去一个固定值，是定位准确点
           // $('ul li').eq(i).addClass('active').siblings().removeClass('active');
           $('.list-group-item').css({
             'border': '0',
             'color': 'white',
             'font-size': '1.2em',
             'font-weight': 'normal'
           });
          $('.list-group-item').eq(i).css({
            'border': 'solid rgb(192,112,66)',
            'border-left': '0.5em solid rgb(192,112,66)',
            'color': 'rgb(245,245,245)',
            'font-weight': 'bold',
            'padding-left': '2em'
          });
        }
     }
  });
})();

//搜索功能
$('.searchBtn').click(function() {
  var foodNameInput = $('.input').val();
  foodNameInput == "" ? foodNameInput = undefined : foodNameInput;
  //循环抓取数据
  var foodArray = getDataFromDom()
  //调用queryValueFilter()方法,实现数组元素的过滤
  var food = queryValueFilter(foodNameInput, foodArray);
  //渲染页面
  slectedFoodToDOM(food)

});

//定义过滤函数
function queryValueFilter(foodNameInput, foodArray) {
  $('.foodContainer').addClass('none');
  var searchPanel = $('.searchPanel').text();
  //''(空字符串) 为假
  if (!searchPanel && foodNameInput) {
    let food = foodArray.filter(function(ele) {
      //注意空字符串对真假的判断
      return (ele[2].indexOf(foodNameInput) != -1);
    });
    return food;
  } else {
    //刷新页面
    // window.location.reload();
    parent.location.reload();
  }
}
//定义循环抓取数据的函数
function getDataFromDom() {
  // console.log($('.foodName'));
  var foodArray = [];
  $('.foodName').each(function(inde, e) {
    var food = [];
    //获取img的data-original值
    food.push($(e).parent().prev().children().attr('data-original'));
    //获取img的alt值
    food.push($(e).text());
    // 获取菜品名
    food.push($(e).text());
    // 获取优惠折扣
    food.push($(e).next().text());
    // 获取金额
    food.push($(e).next().next().children().text());
    //将每个菜信息数组存在总菜品数组
    foodArray.push(food);
  })
  return foodArray;
}

//渲染匹配的菜品到页面
function slectedFoodToDOM(food) {
  var temp = '';
  for (var i = 0; i < food.length; i++) {
    temp += `
             <div class="col-lg-6 col-md-4 col-sm-6">
                 <div class="col-lg-6 thumbnail">
                   <img src=${food[i][0]} alt=${food[i][1]}>
                 </div>
                 <div class="col-lg-6">
                   <h3 class="foodName">${food[i][2]}</h3>
                   <p class="discount">${food[i][3]}</p>
                   <p>¥&nbsp;<span class="price">${food[i][4]}</span> 元/份</p>
                   <p class="minus_plus">
                     <span class="minus">-</span>
                     <span class="amount"></span>
                     <span class="plus">+</span>
                   </p>
                 </div>
             </div>
           `;
    $('.searchPanel').html(temp);
  }
}
