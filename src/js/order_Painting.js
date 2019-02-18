
//ajax获取json数据,渲染页面(js加载数据到页面)
getDataFromJson();
function getDataFromJson(){
  // 创建一个ajax对象
    var xhr=new XMLHttpRequest();
        // 创建用一个Ajax请求
        xhr.open('get','../json/order_.json');
        // 发送get请求
       xhr.send();
       // 监听请求状态,在请求成功之后,处理请求得到的数据
       xhr.onreadystatechange=function(){
         if(xhr.readyState==4&&xhr.status==200){
           //说明请求完成,状态ok,然后就可以提取后端返回的数据用于渲染到页面里了
     var value=xhr.responseText;//responseText属性 获取后端返回的文本
     var valueArray=JSON.parse(value);//将后端返回的字符串数据转换为js中的对象,方便操作控制
           //渲染页面
        dataToDOM(valueArray);
     }
  }
}

//定义渲染页面的数据
function dataToDOM(valueArray){
  var foodContainer=document.getElementsByClassName('foodContainer')[0];
  for(var i=0;i<valueArray.length;i++){
    var valueObj=valueArray[i];
    foodContainer.innerHTML+=`
             <div class="row" id=${valueObj.id}>
              <p class="foodContent">_______${valueObj.foodContent}_______</p>
            </div>
        `;
      var foodDetail = valueObj.foodDetail;
      //hotFood coldFood drinks
      var foodSeries = document.getElementById(valueObj.id);
      //分别在id为hotFood coldFood drinks的元素内循环添加菜品
      for(var j=0;j<foodDetail.length;j++){
        //开头两个菜没有懒加载
        if(i==0 && (j == 0 || j == 1) ){
    foodSeries.innerHTML += `
                            <div class="col-lg-6 col-md-4 col-sm-6">
                                 <div class="col-lg-6 thumbnail">
                                   <img src=${foodDetail[j]['data-original']} alt=${foodDetail[j].alt}>
                                 </div>
                                 <div class="col-lg-6">
                                   <h3 class="foodName">${foodDetail[j].foodName}</h3>
                                   <p class="discount">${foodDetail[j].discount}</p>
                                   <p>¥&nbsp;<span class="price">${foodDetail[j].price}</span> 元/份</p>
                                   <p class="minus_plus">
                                     <span class="minus">-</span>
                                     <span class="amount"></span>
                                     <span class="plus">+</span>
                                   </p>
                                 </div>
                             </div>
                     `;

        }else{ //剩下的菜品图片懒加载
    foodSeries.innerHTML += `
               <div class="col-lg-6 col-md-4 col-sm-6">
                    <div class="col-lg-6 thumbnail">
                      <img src="../img/loading.gif" data-original=${foodDetail[j]["data-original"]} alt=${foodDetail[j].alt}>
                    </div>
                    <div class="col-lg-6">
                      <h3 class="foodName">${foodDetail[j].foodName}</h3>
                      <p class="discount">${foodDetail[j].discount}</p>
                      <p>¥&nbsp;<span class="price">${foodDetail[j].price}</span> 元/份</p>
                      <p class="minus_plus">
                        <span class="minus">-</span>
                        <span class="amount"></span>
                        <span class="plus">+</span>
                      </p>
                    </div>
                </div>
            `;
        }
     }
  };

  //懒加载
  $(function() {
    $("img").lazyload({
      effect: "fadeIn"
    });
  });
}
