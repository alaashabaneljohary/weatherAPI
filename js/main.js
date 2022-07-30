$("document").ready(function(){
   $("#loading .spinner").fadeOut(4000 , function(){
    $("#loading").hide(1000)
   }) ;


   $(".owl-carousel").owlCarousel({
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
   });
});


let isLocation = document.getElementById("location");
let imgIcon    = document.getElementById("img-icon");
let todayDegree     = document.getElementById("todayDegree") ;
let condetionText = document.getElementById("condetionText")
let tempF = document.getElementById("temp-f");
let humidity = document.getElementById("humidity");
let windKph = document.getElementById("wind_kph");
let pressureMb = document.getElementById("pressure_mb");
let tempcc = document.getElementById("temp-cc") ; 
let maxtemp = document.getElementById("maxtemp");
let minTemp =  document.getElementById("mintemp");
let apiResponse ; 


async function getWeatherDay(currentCity="cairo")
{

    let apiResult = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=96c745bbd2a54eeaad7161521222907&q=${currentCity}&days=7&aqi=yes&alerts=yes`);
  //  http://api.weatherapi.com/v1/forecast.json?key=&q=cairo&days=5&aqi=yes&alerts=yes

    
    apiResponse = await apiResult.json();
    console.log(apiResponse);
    displayWeatherDay() ;
    getNextDayWeather();
}
getWeatherDay();

function displayWeatherDay(){

  isLocation.innerHTML = apiResponse.location.name ;
  imgIcon.setAttribute("src",`https:${apiResponse.current.condition.icon}`);
  todayDegree.innerHTML = apiResponse.current.temp_c ;
  condetionText.innerHTML = apiResponse.current.condition.text ;
  tempcc.innerHTML = apiResponse.current.temp_c ;
  minTemp.innerHTML = apiResponse.current.temp_c;
  maxtemp.innerHTML = apiResponse.current.temp_f;
  humidity.innerHTML = apiResponse.current.humidity ;
  windKph.innerHTML = apiResponse.current.wind_kph ;
  pressureMb.innerHTML = apiResponse.current.pressure_mb ;
} ;


let days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
let nextDay = document.getElementsByClassName("nextDay");
let nextTodayIcon = document.getElementsByClassName("nextToday-icon");
let nextText = document.getElementsByClassName("nextText")
let maxTempC = document.getElementsByClassName("max");
let minTempC = document.getElementsByClassName("min")
function getNextDayWeather(){

    for( let i=0; i<nextDay.length;i++){
        nextDay[i].innerHTML= days[new Date(apiResponse.forecast.forecastday[i+1].date).getDay()];
         nextTodayIcon[i].setAttribute("src",`https:${apiResponse.forecast.forecastday[i+1].day.condition.icon}`);
        nextText[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.condition.text ;
        maxTempC[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.maxtemp_c ;
        minTempC[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.mintemp_c ;
      }

}




let searchInput = document.getElementById("searchInput") ;

searchInput.addEventListener("keyup",function(){

    currentCity = searchInput.value ;
    getWeatherDay(currentCity)

});