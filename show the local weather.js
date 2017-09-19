//使用的API为和风天气
var lat,lon;
var banners=$(' div.banner'),  //用于轮播
  circles=$('.circleGroup div')
  banLen=banners.length,
  j=0,
  timer=null;

//通过HTML5获取地理位置
function getLocation(){
  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(showPosition,showByIp);
  }//测试发现会出现判断超时，既不执行true下的语句，也不执行false下的语句。
   else{
    //获取IP地址
     console.log("浏览器不支持获取地理位置");
    var myId=returnCitySN["cid"];
    getWeather(myId);
   }
  }

function showPosition(position){
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  var positionInfo=lon +','+ lat;
  console.log("byHTML5 lon,lat:"+positionInfo);
  getWeather(positionInfo);
}
function showByIp(){
  myIp=returnCitySN["cip"];
  getWeather(myIp);
}
//判断使用什么天气图标
function weatherPicture(codeNum){
  switch(codeNum){
      case '100':
      return '0.png';
      break;
      case '101':
      return '4.png';
      break;
      case '102':
      return '7.png';
      break;
      case '103':
      return '5.png';
      break;
      case '104':
      return '9.png';
      break;
      case '200':case '202':case '203':case '204':case '205':case '206':case '207':case '208':case '209':case '210':case '211':case '212':case '213':
      return '32.png';
      break;
      case '201':
      return '9.png';
      break;
      case '300':case '305':case '309':
      return '10.png';
      break;
      case '301':case '306':
      return '14.png';
      break;
      case '302':case '303':case '304':
      return '16.png';
      break;
      case '307':case '308':case '310':case '311':case '312':
      return '15.png';
      break;
      case '313':case '404':case '405':case '406':
      return '12.png';
      break;
      case '400':case '407':
      return '21.png';
      break;
      case '401':case '402':case '403':
      return '23.png';
      break;
      case '500':case '501':
      return '31.png';
      break;
      case '502':
      return '30.png';
      break;
      case '503':case '504':case '507':case '508':
      return '26.png';
      break;
    default:
    return '99.png';
  }
}
//获取天气信息
function getWeather(keyWords){
  var apiUrl="https://free-api.heweather.com/v5/weather?city="+keyWords+'&key=45f089df10e64f3591d88f0a2c6c7dc5';
  $.ajax({
    url:apiUrl,
    type:"get",
    success: function(data){

      //选择器加eq()将jq模式转换为js模式，直接用id选择器也无法对元素进行设置
      $('#content p:eq(1)').html(data['HeWeather5']['0']['now']['cond']['txt']);
      var nowPicture=weatherPicture(data['HeWeather5']['0']['now']['cond']['code']);
      $('#content img').attr("src","https://github.com/riversword/images/raw/master/weather/bigweatherIcons/"+nowPicture);
      $('#content p:eq(0) span:eq(0)').html(data['HeWeather5']['0']['now']['tmp']);
      $('#content p:eq(3)').html(data['HeWeather5']['0']['now']['wind']['dir']+ '&nbsp;' +data['HeWeather5']['0']['now']['wind']['sc']);
      lon=data['HeWeather5']['0']['basic']['lon'];
      lat=data['HeWeather5']['0']['basic']['lat'];
      lon=dealNum(lon);
      lat=dealNum(lat);
      $('#content p:eq(4)').html("经&nbsp;"+lon+'，'+"纬&nbsp"+lat);
      $('.poster h3').eq(0).html(data['HeWeather5']['0']['basic']['city'] + '&nbsp;' + data['HeWeather5']['0']['basic']['cnty']);
      $('.poster p').eq(5).html("更新: "+data['HeWeather5']['0']['basic']['update']['loc']);
      $('#content p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['0']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']+'℃');
      
      for(var i=0;i<3;i++){
        $('.dateInfo').eq(i).html(data['HeWeather5']['0']['daily_forecast'][i]['date'].slice(5));
        $('.weather').eq(i).html("<p>"+data['HeWeather5']['0']['daily_forecast'][i]['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast'][i]['tmp']['max']+"℃</p><p>日:"+data['HeWeather5']['0']['daily_forecast'][i]['cond']['txt_d']+"</p><p>夜:"+data['HeWeather5']['0']['daily_forecast'][i]['cond']['txt_n']+"</p><p>"+data['HeWeather5']['0']['daily_forecast'][i]['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast'][i]['wind']['sc']+"</p>");
        var dailyPicture=weatherPicture(data['HeWeather5']['0']['daily_forecast'][i]['cond']['code_d']);
        $('.weaIcon img').eq(i).attr("src", "https://github.com/riversword/images/raw/master/weather/bigweatherIcons/"+dailyPicture);
       }
       console.log(data['HeWeather5']['0']['suggestion']);
     if(data['HeWeather5']['0']['suggestion'].length != 0){
      $('.suggest').eq(0).append("<p>"+data['HeWeather5']['0']['suggestion']['air']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['cw']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['drsg']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['sport']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['trav']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['uv']['txt']+"</p>");
      }else $('.suggest').eq(0).append("<p>sorry, there is no information about this religion.</p>");
       
      
      if(data['HeWeather5']['0']['hourly_forecast']){
        var lenHour=data['HeWeather5']['0']['hourly_forecast'].length,
           coluWid=Math.floor(510/lenHour);
       for(var i=0;i<lenHour;i++){
        $('.coluCover').eq(0).append("<div class='colu'><img><p>"+data['HeWeather5']['0']['hourly_forecast'][i]['cond']['txt']+"</p><p>"+data['HeWeather5']['0']['hourly_forecast'][i]['tmp']+"℃</p><p>"+data['HeWeather5']['0']['hourly_forecast'][i]['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['hourly_forecast'][i]['wind']['sc']+"</p><p>"+data['HeWeather5']['0']['hourly_forecast'][i]['date'].slice(11)+"</p></div>");
        var hourlyPicture=weatherPicture(data['HeWeather5']['0']['hourly_forecast'][i]['cond']['code']);
        $('.colu img').eq(i).attr("src","https://github.com/riversword/images/raw/master/weather/smallweatherIcons/"+hourlyPicture);
        $('.colu').css("width",coluWid+"px");
       }
      } else  $('.coluCover').eq(0).append("<p>sorry, there is no information about this religion at the time.</p>");
      
      if(data['HeWeather5']['0']['suggestion'] && data['HeWeather5']['0']['hourly_forecast']){
        autoPlay();
      }
    },
    error:function(){
      alert("获取天气失败");
    }
  });
}
//保留两位小数，处理经纬度
function dealNum(x){
   var a=x.toString();
   var b=a.indexOf('.');
   if(b!=-1 && b<a.length-3){
    return a.slice(0,b+3);
   }else return x;
}

getLocation();

//实现轮播
function autoPlay(){
  timer=setInterval(function(){
    changeItem();
    j++;
  },4000);

}
function changeItem(){
  if(j>banLen-1){
    j=0;
  }
  for(var i=0;i<banLen;i++){
    banners[i].style.display="none";
    circles.eq(i).css("background-color","rgba(117,127,137,0.3)");
  }
  banners[j].style.display="block";
  circles.eq(j).css("background-color","rgba(250,250,250,0.6)");;
}
function stopPlay(){
  clearInterval(timer);
}
$('div.bannerBox').mouseenter(stopPlay);
$('div.bannerBox').mouseleave(autoPlay);
$('#pre').click(function(){  //为何第一次点击无效
  if(j==0){
    j=banLen-1
  }else{
    --j;
  }
  changeItem();
});
$('#nex').click(function(){
  if(j==banLen-1){
    j=0;
  }else{
    ++j;
  }
  changeItem();
});
for(var i=0;i<circles.length;i++){
  circles[i].id=i;
  circles[i].onclick=function(){
    j=this.id;
    changeItem();
  }
}

