
var lat,lon;
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

//获取天气信息，和风天气
function getWeather(keyWords){
  var apiUrl="https://free-api.heweather.com/v5/weather?city="+keyWords+'&key=45f089df10e64f3591d88f0a2c6c7dc5';
  $.ajax({
    url:apiUrl,
    type:"get",
    success: function(data){
      console.log(data);
     /* var weatherCode=data['HeWeather5']['0']['now']['cond']['code'];
      switch(weatherCode){
        case 100: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        case 101: &('#weaIcon img').css("src","../images/weatherIcons/7.png");
        break;
        case 102,103: &('#weaIcon img').css("src","../images/weatherIcons/5.png");
        break;
        case 104: &('#weaIcon img').css("src","../images/weatherIcons/9.png");
        break;
        case 200~213: &('#weaIcon img').css("src","../images/weatherIcons/32.png");
        break;
        case 300~313: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        case 400~407: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        case 500~508: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        case 900: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        case 901: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
        break;
        default: &('#weaIcon img').css("src","../images/weatherIcons/0.png");
      }*/
      //选择器加eq()将jq模式转换为js模式，直接用id选择器也无法对元素进行设置
      $('#content p:eq(1)').html(data['HeWeather5']['0']['now']['cond']['txt']);
      $('#content p:eq(0) span:eq(0)').html(data['HeWeather5']['0']['now']['tmp']);
      $('#content p:eq(3)').html(data['HeWeather5']['0']['now']['wind']['dir']+ '&nbsp;' +data['HeWeather5']['0']['now']['wind']['sc']);
      lon=data['HeWeather5']['0']['basic']['lon'];
      lat=data['HeWeather5']['0']['basic']['lat'];
      lon=dealNum(lon);
      lat=dealNum(lat);
      $('#content p:eq(4)').html("lon&nbsp;"+lon+'，'+"lat&nbsp"+lat);
      $('.poster h3').eq(0).html(data['HeWeather5']['0']['basic']['city'] + '&nbsp;' + data['HeWeather5']['0']['basic']['cnty']);
      $('.poster p').eq(5).html("update: "+data['HeWeather5']['0']['basic']['update']['loc']);
      $('#content p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['0']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']+'℃');
      /* 选择元素时，i被当作一般的字符了；另，['hourly_forecast']数组元素个数不定，不能在HTML中直接写出结构
      var lenHour=data['HeWeather5']['0']['hourly_forecast'].length;
      for(var i=0;i<lenHour;i++){
        $('#more div:eq(i) p:eq(0)').html(data['HeWeather5']['0']['hourly_forecast']['0']['cond']['txt']);
        $('#more div:eq(i) p:eq(1)').html(data['HeWeather5']['0']['hourly_forecast']['0']['tmp']+"℃");
        $('#more div:eq(i) p:eq(2)').html(data['HeWeather5']['0']['hourly_forecast']['0']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['hourly_forecast']['0']['wind']['sc']);
        $('#more div:eq(i) p:eq(3)').html(data['HeWeather5']['0']['hourly_forecast']['0']['date']);
      }*/
        $('#more div:eq(0) p:eq(0)').html(data['HeWeather5']['0']['hourly_forecast']['0']['cond']['txt']);
        $('#more div:eq(0) p:eq(1)').html(data['HeWeather5']['0']['hourly_forecast']['0']['tmp']+"℃");
        $('#more div:eq(0) p:eq(2)').html(data['HeWeather5']['0']['hourly_forecast']['0']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['hourly_forecast']['0']['wind']['sc']);
        $('#more div:eq(0) p:eq(3)').html(data['HeWeather5']['0']['hourly_forecast']['0']['date']);

        $('#more div:eq(1) p:eq(0)').html(data['HeWeather5']['0']['hourly_forecast']['1']['cond']['txt']);
        $('#more div:eq(1) p:eq(1)').html(data['HeWeather5']['0']['hourly_forecast']['1']['tmp']+"℃");
        $('#more div:eq(1) p:eq(2)').html(data['HeWeather5']['0']['hourly_forecast']['1']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['hourly_forecast']['0']['wind']['sc']);
        $('#more div:eq(1) p:eq(3)').html(data['HeWeather5']['0']['hourly_forecast']['1']['date']);

     /*   $('#more div:eq(2) p:eq(0)').html(data['HeWeather5']['0']['hourly_forecast']['2']['cond']['txt']);
        $('#more div:eq(2) p:eq(1)').html(data['HeWeather5']['0']['hourly_forecast']['2']['tmp']+"℃");
        $('#more div:eq(2) p:eq(2)').html(data['HeWeather5']['0']['hourly_forecast']['2']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['hourly_forecast']['0']['wind']['sc']);
        $('#more div:eq(2) p:eq(3)').html(data['HeWeather5']['0']['hourly_forecast']['2']['date']); */


        $('#suggest p:eq(0)').html(data['HeWeather5']['0']['suggestion']['cw']['txt']);
        $('#suggest p:eq(1)').html(data['HeWeather5']['0']['suggestion']['drsg']['txt']);
        $('#suggest p:eq(2)').html(data['HeWeather5']['0']['suggestion']['flu']['txt']);
        $('#suggest p:eq(3)').html(data['HeWeather5']['0']['suggestion']['sport']['txt']);
        $('#suggest p:eq(4)').html(data['HeWeather5']['0']['suggestion']['trav']['txt']);
        $('#suggest p:eq(5)').html(data['HeWeather5']['0']['suggestion']['uv']['txt']);
      

        $('#day .today .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['0']['date']);
        $('#day .today .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['0']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#day .today .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['0']['cond']['txt_d']);
        $('#day .today .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['0']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);

        $('#day .seconday .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['1']['date']);
        $('#day .seconday .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['1']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#day .seconday .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['1']['cond']['txt_d']);
        $('#day .seconday .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['1']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);

        $('#day .thirday .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['2']['date']);
        $('#day .thirday .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['2']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#day .thirday .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['2']['cond']['txt_d']);
        $('#day .thirday .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['2']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);



        $('#night .today .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['0']['date']);
        $('#night .today .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['0']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#night .today .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['0']['cond']['txt_n']);
        $('#night .today .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['0']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);

        $('#night .seconday .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['1']['date']);
        $('#night .seconday .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['1']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#night .seconday .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['1']['cond']['txt_n']);
        $('#night .seconday .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['1']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);

        $('#night .thirday .dateInfo').eq(0).html(data['HeWeather5']['0']['daily_forecast']['2']['date']);
        $('#night .thirday .weather p:eq(0)').html(data['HeWeather5']['0']['daily_forecast']['2']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']);
        $('#night .thirday .weather p:eq(1)').html(data['HeWeather5']['0']['daily_forecast']['2']['cond']['txt_n']);
        $('#night .thirday .weather p:eq(2)').html(data['HeWeather5']['0']['daily_forecast']['2']['wind']['dir']+"&nbsp;"+data['HeWeather5']['0']['daily_forecast']['0']['wind']['sc']);
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
var numS=0,numD;
$('input[name="switchButton"]').click(function(){
  if(numS==0){
    $('#more').slideUp("fast");
    $('#suggest').slideDown("slow");
    $('input[name="title"]').val("Advices in this weather");
    $('input[name="switchButton"]').val("forecast");
    numS=1;
  }else{
    $('#suggest').slideUp("fast");
    $('#more').slideDown("slow");
    $('input[name="title"]').val("Hourly forecast for today");
    $('input[name="switchButton"]').val("suggest");
    numS=0;
  }
});
//为什么最开始，这个要click两次才能生效？
$('input[name="dayNight"]').click(function(){
  if(numD==0){
    $('#day').slideUp("fast");
    $('#night').slideDown("slow");
    $('input[name="dayNight"]').val("day");
    numD=1;
  }else{
    $('#night').slideUp("fast");
    $('#day').slideDown("slow");
    $('input[name="dayNight"]').val("night");
    numD=0;
  }
});
getLocation();


