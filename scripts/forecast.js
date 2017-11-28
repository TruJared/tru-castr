$('document').ready(function () {

  //  fade footer on scroll
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    $('footer').css({
      'opacity': 1 - scrollTop / 350
    });
  });

  $("#city-search-button").click(function () {

    return getForecast();



  });

});

function getForecast() {
  var city = $("#city").val();
  var days = $("#days option:selected").text();

  if (city !== '') {

    $("#error").html(" "); //if error exists :: clear error
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=imperial' + '&cnt=' + days + '&APPID=affdc924f52676c400831fd1b50a6aa2',
      type: "GET",
      datatype: "jsonp",
      success: function (data) {

        var table = '';

        // loop to build the table
        for (var i = 0; i < data.list.length; i++) {
          table += "<tr>";
          table += "<td>" + "<img id='weather-icon' src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'>" + "</td>";
          table += "<td>" + data.list[i].weather[0].description + "</td>";
          table += "<td>" + data.list[i].temp.min.toFixed(1) + " &deg;F</td>";
          table += "<td>" + data.list[i].temp.max.toFixed(1) + " &deg;F</td>";
          table += "<td>" + data.list[i].pressure.toFixed(1) + " hpa</td>";
          table += "<td>" + data.list[i].humidity.toFixed(1) + "%</td>";
          table += "<td>" + data.list[i].speed.toFixed(1) + " m/h</td>";
          table += "</tr>";

        }

        $("#weather-forecast").html(table);

      }

    });

  } else {
    $("#error").html("<div class='alert alert-danger' id='city-error'><a href='#' class ='close' data-dismiss='alert'>&times;</a>A City Name Is Required</div>");
  }
}
