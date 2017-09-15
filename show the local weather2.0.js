
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
  var info=lon +','+ lat;
  console.log("byHTML5 经,纬:"+info);
  getWeather(info);
}
function showByIp(){
  myIp=returnCitySN["cip"];
  getWeather(myIp);
}

//获取天气信息，和风天气
function getWeather(keyWords){
  var apiUrl="https://free-api.heweather.com/v5/now?city="+keyWords+'&key=45f089df10e64f3591d88f0a2c6c7dc5';
  $.ajax({
    url:apiUrl,
    type:"get",
    success: function(data){
      console.log(data);
      $('#weather p span:eq(0)').html(data['HeWeather5']['0']['now']['cond']['txt']);
      $('#weather p span:eq(1)').html(data['HeWeather5']['0']['now']['tmp'] +"℃");
      $('#weather > p').eq(1).html(data['HeWeather5']['0']['now']['wind']['dir']+ '&nbsp;' +data['HeWeather5']['0']['now']['wind']['sc']);
      lon=data['HeWeather5']['0']['basic']['lon'];
      lat=data['HeWeather5']['0']['basic']['lat'];
      lon=dealNum(lon);
      lat=dealNum(lat);
      $('#weather > p').eq(2).html("经度&nbsp"+lon+'，'+"纬度&nbsp"+lat);
      $('.tips > p').eq(0).html(data['HeWeather5']['0']['basic']['city'] + '&nbsp;' + data['HeWeather5']['0']['basic']['cnty']);
      $('.tips > p').eq(1).html("更新时间："+data['HeWeather5']['0']['basic']['update']['loc']);
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


