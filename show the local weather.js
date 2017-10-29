/*code by riversword
api is hefeng*/

$(document).ready(function(){
  var lat,lon;
  getLocation();

//get location information
function getLocation(){
  if(navigator.geolocation){ 
    //get the location by HTML5
    navigator.geolocation.getCurrentPosition(showPosition,showByIp);
  }else{
    //get IP address by sohu api
    var myIp=returnCitySN["cip"];
    getWeather(myIp);
   }
  }
  
//get weather information by longitude & latitude
function showPosition(position){
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  var positionInfo=lon +','+ lat;
  getWeather(positionInfo);
}

//get weather information by IP
function showByIp(){
  myIp=returnCitySN["cip"];
  getWeather(myIp);
}

//choose one icon to describe the weather
function weatherPicture(codeNum){
  switch(codeNum){
      case '100':
      return '0.png';
      case '101':
      return '4.png';
      case '102':
      return '7.png';
      case '103':
      return '5.png';
      case '104':
      return '9.png';
      case '200':case '202':case '203':case '204':case '205':case '206':case '207':case '208':case '209':case '210':case '211':case '212':case '213':
      return '32.png';
      case '201':
      return '9.png';
      case '300':case '305':case '309':
      return '10.png';
      case '301':case '306':
      return '14.png';
      case '302':case '303':case '304':
      return '16.png';
      case '307':case '308':case '310':case '311':case '312':
      return '15.png';
      case '313':case '404':case '405':case '406':
      return '12.png';
      case '400':case '407':
      return '21.png';
      case '401':case '402':case '403':
      return '23.png';
      case '500':case '501':
      return '31.png';
      case '502':
      return '30.png';
      case '503':case '504':case '507':case '508':
      return '26.png';
    default:
    return '99.png';
  }
}

//get the weather information
function getWeather(keyWords){
  var apiUrl="https://free-api.heweather.com/v5/weather?city="+keyWords+'&key=45f089df10e64f3591d88f0a2c6c7dc5';
  $.ajax({
    url:apiUrl,
    type:"get",
    success: function(data){
      $('.weather h4').html(data['HeWeather5']['0']['now']['cond']['txt']);
      var nowPicture=weatherPicture(data['HeWeather5']['0']['now']['cond']['code']);
      $('.weather .weaIcon img').attr("src","https://github.com/riversword/images/raw/master/weather/bigweatherIcons/"+nowPicture);
      $('.weather .tempInfo h1').html(data['HeWeather5']['0']['now']['tmp'] +"<span>℃</span>");
      $('.weather .tempInfo p').html(data['HeWeather5']['0']['daily_forecast']['0']['tmp']['min']+"~"+data['HeWeather5']['0']['daily_forecast']['0']['tmp']['max']+'℃');

      lon=data['HeWeather5']['0']['basic']['lon'];
      lat=data['HeWeather5']['0']['basic']['lat'];
      lon=dealNum(lon);
      lat=dealNum(lat);
      $('.location .row p:eq(0)').html("lon &nbsp;"+lon+'，'+"lat &nbsp"+lat);
      $('.location .row p:eq(1)').html(data['HeWeather5']['0']['basic']['cnty']);
      $('.location h3').html(data['HeWeather5']['0']['basic']['city']);
      $('.bottomInfo p:eq(0)').html(data['HeWeather5']['0']['now']['wind']['dir']+ '&nbsp;' +data['HeWeather5']['0']['now']['wind']['sc']);
      $('.bottomInfo p').eq(1).html("update: "+data['HeWeather5']['0']['basic']['update']['loc']);
      
      //add daily forecast information to html
      for(var i=0;i<3;i++){
        var dailyPicture=weatherPicture(data['HeWeather5']['0']['daily_forecast'][i]['cond']['code_d']);
        $('.dayInfo .day').eq(i).html('<h5 class="text-center">'+data['HeWeather5']['0']['daily_forecast'][i]['date'].slice(5)+'</h5>');
        $('.dayInfo .day').eq(i).append("<p class='text-center'>"+
          data['HeWeather5']['0']['daily_forecast'][i]['cond']['txt_d']+"</p><div class='text-center'><img src='https://github.com/riversword/images/raw/master/weather/smallweatherIcons/"+
          dailyPicture+"'><p class='text-center'>"+
          data['HeWeather5']['0']['daily_forecast'][i]['tmp']['min']+"~"+
          data['HeWeather5']['0']['daily_forecast'][i]['tmp']['max']+"℃</p><p class='text-center'>"+
          data['HeWeather5']['0']['daily_forecast'][i]['wind']['dir']+"&nbsp;"+
          data['HeWeather5']['0']['daily_forecast'][i]['wind']['sc']+
          "</p>");
      }
       
      //when the weather information finishes loading, hide "Reading"
      $('.cover').css('display','none');
       
      //add the hourly forecast information to html     
      if(!!data['HeWeather5']['0']['hourly_forecast'] && data['HeWeather5']['0']['hourly_forecast'].length !=0){
        var lenHour=data['HeWeather5']['0']['hourly_forecast'].length;
        $('.hourForecast').css('display','block');
        for(var i=0;i<lenHour;i++){
          var hourlyPicture=weatherPicture(data['HeWeather5']['0']['hourly_forecast'][i]['cond']['code']);
          $('.hourForecast').append("<div class='row hourInfo'><p class='col-xs-2 text-center'>"+data['HeWeather5']['0']['hourly_forecast'][i]['date'].slice(11)+
          "</p><p class='col-xs-4 text-center'>"+data['HeWeather5']['0']['hourly_forecast'][i]['cond']['txt']+"</p><div class='col-xs-4 text-center pic'><img src='https://github.com/riversword/images/raw/master/weather/smallweatherIcons/"+hourlyPicture+"'></div><p class='col-xs-2 text-center'>"+
          +data['HeWeather5']['0']['hourly_forecast'][i]['tmp']+"℃</p>");
        }
      }

      //add the suggestion information for the weather to html
      if(!!data['HeWeather5']['0']['suggestion']){
        $('.main').append("<div class='container-fluid suggest'><h4>Suggest</h4><p>"+data['HeWeather5']['0']['suggestion']['air']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['cw']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['drsg']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['sport']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['trav']['txt']+"</p><p>"+data['HeWeather5']['0']['suggestion']['uv']['txt']+"</p></div>");
      }
      
    },
    error:function(){
      $('.cover').css('display','none');
      alert("获取天气失败");
    }
  });
}

//retain two decimal places for lat & lon
function dealNum(x){
   var a=x.toString();
   var b=a.indexOf('.');
   if(b!=-1 && b<a.length-3){
    return a.slice(0,b+3);
   }else return x;
}

});

