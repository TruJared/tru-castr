$('document').ready(function () {

  $('#city-search-button').click(function () {
    return getWeather();
  });

  $('#city').keypress(function (e) {
    if (e.which == 13) { //Enter key
      $('#city-search-button').click(); //trigger click event
    }
  });

});

function getWeather() {
  var city = $("#city").val();

  if (city !== '') {
    $("#error").html(" "); //if error exists :: clear error
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&APPID=affdc924f52676c400831fd1b50a6aa2',
      type: "GET",
      datatype: "jsonp",
      success: function (data) {
        var widget = showResults(data);

        console.log(data);
        $("#show-weather").html(widget);
        $("#city").val('');

      }
    });

  } else {
    $("#error").html("<div class='alert alert-danger' id='city-error'><a href='#' class ='close' data-dismiss='alert'>&times;</a>A City Name Is Required</div>");
  }
}

function showResults(data) {
  return "<img id='weather-icon' src='http://openweathermap.org/img/w/" + data.weather['0'].icon + ".png'>" + "<H3 id='forecast-city-name'>" + data.name + ", " + data.sys.country + ":  " + (data.weather['0'].description).replace //function capitalizes each word
  (/\b./g, function (m) {
    return m.toUpperCase();
  }) + "</H3>" +
  "<H4>Current Temperature: " + (data.main.temp).toFixed(1) + " &deg;F</h4>" +
    "<p>Today's High: " + (data.main.temp_max).toFixed(1) + " &deg;F</p>" +
    "<p>Today's Low: " + (data.main.temp_min).toFixed(1) + " &deg;F</p>" +
    "<p>Wind Speed: " + (data.wind.speed).toFixed(1) + " m/h</p>" +
    "<p>Humidity: " + (data.main.humidity) + "%</p>";
}
