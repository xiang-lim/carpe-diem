let date = new Date()
function getCurrentMonth() {
    return (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
}

function getCurrentDateNumber() {
    return (date.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
}

function getCurrentDateTime() {

    return date.getFullYear() +
        "-" +
        getCurrentMonth() +
        "-" +
        getCurrentDateNumber()
        +
        "T" +
        date.toTimeString().slice(0, 8);
}

function getCurrentDate() {
    return date.getFullYear() + "-" + getCurrentMonth() + "-" + getCurrentDateNumber();
}

function handleApiError(class_name, error_message) {
    $(class_name).hide()
    $(class_name + "Error").text(error_message)
}

// API 2-hour weather forecast
//API Air Temperature
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/air-temperature",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Air Temperature API ${request} ${status.status}`);
        sessionStorage.setItem("airTemp", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("airTemp", JSON.stringify(data));
    } else {
        console.log("Failed to load Air Temperature API!(API data error)");
        sessionStorage.setItem("airTemp", JSON.stringify(failedAPI));
    }
});
//API Relative humidity
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/relative-humidity",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Relative Humidity API ${request} ${status.status}`);
        sessionStorage.setItem("relativeHumidity", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("relativeHumidity", JSON.stringify(data));
    } else {
        console.log("Failed to load Relative Humidity API! (API data error)");
        sessionStorage.setItem("relativeHumidity", JSON.stringify(failedAPI));
    }
});
//API Wind Speed
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/wind-speed",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Wind Speed API ${request} ${status.status}`);
        sessionStorage.setItem("WindSpeed", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("WindSpeed", JSON.stringify(data));
    } else {
        console.log("Failed to load Wind Speed API! (API data error)");
        sessionStorage.setItem("WindSpeed", JSON.stringify(failedAPI));
    }
});
//API 2 hour weather forecast
//API Air Temperature
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/air-temperature",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Air Temperature API ${request} ${status.status}`);
        sessionStorage.setItem("airTemp", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("airTemp", JSON.stringify(data));
    } else {
        console.log("Failed to load Air Temperature API!(API data error)");
        sessionStorage.setItem("airTemp", JSON.stringify(failedAPI));
    }
});
//API Relative humidity
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/relative-humidity",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Relative Humidity API ${request} ${status.status}`);
        sessionStorage.setItem("relativeHumidity", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("relativeHumidity", JSON.stringify(data));
    } else {
        console.log("Failed to load Relative Humidity API! (API data error)");
        sessionStorage.setItem("relativeHumidity", JSON.stringify(failedAPI));
    }
});
//API Wind Speed
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/wind-speed",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`Wind Speed API ${request} ${status.status}`);
        sessionStorage.setItem("WindSpeed", JSON.stringify(failedAPI));
    },
}).done(function (data) {
    if (data.items[0].timestamp !== "") {
        sessionStorage.setItem("WindSpeed", JSON.stringify(data));
    } else {
        console.log("Failed to load Wind Speed API! (API data error)");
        sessionStorage.setItem("WindSpeed", JSON.stringify(failedAPI));
    }
});
//API 2 hour weather forecast
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
    data: { date_time: getCurrentDateTime() },
    error: function (status, request) {
        console.log(`2 Hour Weather Forecast API ${request} ${status.status}`);
        sessionStorage.setItem("02HourFC", JSON.stringify(failed2hrFC));
    },
}).done(function (data) {
    if (data.area_metadata.length !== 0) {
        sessionStorage.setItem("02HourFC", JSON.stringify(data.items));
    } else {
        console.log("Failed to load 2 Hour Weather Forecast API! (API data error)");
        sessionStorage.setItem("02HourFC", JSON.stringify(failed2hrFC));
    }
});
//Current Weather function extract and display all the data saved in session storage
function closestDist(lat, long, lat1, long1) {
    let xDiff = lat - lat1;
    let yDiff = long - long1;
    return  xDiff * xDiff + yDiff * yDiff;
}
function findReading(lat, long, info) {
    let stationInfo = info.metadata.stations;
    let index;
    let dist = 1000;
    for (i = 0; i < stationInfo.length; i++) {
        let station = stationInfo[i];
        let stationLat = station.location.latitude;
        let stationLong = station.location.longitude;
        let diff = closestDist(lat, long, stationLat, stationLong);
        if (diff <= dist) {
            index = i;
            dist = diff;
        }
    }
    return info.items[0].readings[index].value;
}
function searchWeather(
    name,
    i,
    lat,
    long
) {
    const airTempRT = JSON.parse(sessionStorage.getItem("airTemp"));
    const relativeHumidityRT = JSON.parse(
        sessionStorage.getItem("relativeHumidity")
    );
    const windSpeedRT = JSON.parse(sessionStorage.getItem("WindSpeed"));

    const weaFc2Hr = JSON.parse(sessionStorage.getItem("02HourFC"));
    $(`#${"location" + i}`).append("<h4>" + name + "</h4><areadata></areadata>");
    let airTemp = findReading(lat, long, airTempRT);
    let weatherForecast = weaFc2Hr[0].forecasts[i].forecast;
    let relativeHumidity = findReading(lat, long, relativeHumidityRT);
    let windSpeed = findReading(lat, long, windSpeedRT);
    $(`#${"location" + i} areadata`).append(`<div class = "row">
  <div class ="col-sm">Forecast : ${weatherForecast}</div>
  <div class ="col-sm">Temperature: ${airTemp}°C</div>
  <div class ="col-sm">Relative Humidity: ${relativeHumidity}%</div>
  <div class ="col-sm">Wind Speed : ${windSpeed}knots</div>
  </div>`);
}



//API 24-hour weather forecast
function load24Hour(weaFc24Hr) {
    let general = weaFc24Hr.items[0].general;
    //Weather(Air Temp)
    $("#t24High").text(general.temperature.high + " °C");
    $("#t24Low").text(general.temperature.low + " °C");
    // Weather (Relative Humidity)
    $("#rh24High").text(general.relative_humidity.high + " %");
    $("#rh24Low").text(general.relative_humidity.low + " %");
    //Weather (Wind Speed)
    $("#ws24High").text(general.wind.speed.high + " knots");
    $("#ws24Low").text(general.wind.speed.low + " knots");
    //Weather Wind Direction
    $("#wd24").text(general.wind.direction);
    // Weather(Sky)
    for (i = 0; i < 3; i++) {
        let periodRegion = weaFc24Hr.items[0].periods[i].regions;

        //First period
        let start =
            "(" +
            weaFc24Hr.items[0].periods[i].time.start.slice(0, 10) +
            ") " +
            weaFc24Hr.items[0].periods[i].time.start.slice(11, 19);
        let end =
            "(" +
            weaFc24Hr.items[0].periods[i].time.end.slice(0, 10) +
            ") " +
            weaFc24Hr.items[0].periods[i].time.end.slice(11, 19);
        $(`#stime${i}`).text(start);
        $(`#etime${i}`).text(end);
        // Weather forecast for first period
        $(`#north${i}`).text(periodRegion.north);
        $(`#south${i}`).text(periodRegion.south);
        $(`#east${i}`).text(periodRegion.east);
        $(`#west${i}`).text(periodRegion.west);
        $(`#central${i}`).text(periodRegion.central);
    }
}

$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast",
    data: {date_time: getCurrentDateTime()},
    error: function (status, request) {
        console.log(`24 Hour Weather Forecast API ${request} ${status.status} ${getCurrentDateTime()}`);
        handleApiError(".hour24Weather", `Failed to retrieve 24 Hour Weather Forecast API ${request} ${status.status} ${getCurrentDateTime()}.
        Sorry for the inconvenience`)
    },
}).done(function (data) {
    try {
        load24Hour(data)
    } catch (e) {
        handleApiError(".hour24Weather", e)
    }
});

// API 4 days weather forecast
$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/4-day-weather-forecast",
    data: {date_time: getCurrentDateTime()},
    error: function (status, request) {
        console.log(`4 Day Weather Forecast API ${request} ${status.status}`);
        handleApiError(".d4WFC", `Failed to retrieve 4 days Weather Forecast API ${request} ${status.status} ${getCurrentDateTime()}.
        Sorry for the inconvenience`)
    },
}).done(function (data) {
    try {
        chart4Day(data)
    } catch (e) {
        handleApiError(".d4WFC", e)
    }
});
function generateChart(element, dataHigh,dataLow, labelHigh,labelLow,border1,background1,border2,background2,label){
    new Chart(element, {
        type: "line",
        data: {
            labels: label,
            datasets: [
                {
                    label: labelHigh,
                    data: dataHigh,
                    backgroundColor: background1,
                    borderColor: border1,
                },
                {
                    label: labelLow,
                    data: dataLow,
                    backgroundColor: background2,
                    borderColor: border2,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });
}
function chart4Day(weaFc4d) {
    let forecast = weaFc4d.items[0].forecasts;
    console.log(forecast.length);
    let label = [];
    let tempHigh = [];
    let tempLow = [];
    let rhHigh = [];
    let rhLow = [];
    let wsHigh = [];
    let wsLow = [];
    for (i = 0; i < weaFc4d.items[0].forecasts.length; i++) {
        label.push(forecast[i].date);
        tempHigh.push(forecast[i].temperature.high);
        tempLow.push(forecast[i].temperature.low);
        rhHigh.push(forecast[i].relative_humidity.high);
        rhLow.push(forecast[i].relative_humidity.low);
        wsHigh.push(forecast[i].wind.speed.high);
        wsLow.push(forecast[i].wind.speed.low);
    }

    var ttx = $("#d4Temp");
    var rtx = $("#d4rh");
    var wtx = $("#d4ws");
    generateChart(ttx,tempHigh,tempLow,"High(°C)","Low(°C)",["rgba(255,0,0,1)"],
        ["rgba(255,0,0,0.2)"],["rgba(255,255,0,1)"],["rgba(255,255,0,0.2)"],label)
    generateChart(rtx, rhHigh,rhLow,"High(%)","Low(%)",["rgba(0,0,255,1)"],
        ["rgba(0,0,255,0.2)"],["rgba(0,255,255,1)"],["rgba(0,255,255,0.2)"],label)
    generateChart(wtx,wsHigh,wsLow,"High(knots)","Low(knots)",["rgba(0,255,0,1)"],
        ["rgba(0,255,0,0.2)"],["rgba(255,0,255,1)"],["rgba(255,0,255,0.2)"],label)

}

//API PSI
let previous_date = date;
previous_date.setDate(date.getDate() - 1);
let date_p =
    previous_date.getFullYear() +
    "-" +
    ("0" + (previous_date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + previous_date.getDate()).slice(-2);

$.ajax({
    type: "GET",
    dataType: "json",
    contentType: "text/plain",
    url: "https://api.data.gov.sg/v1/environment/psi",
    data: { date: date_p },
    error: function (status, request) {
        console.log(`PSI API ${request} ${status.status}`);
        handleApiError(".psi", `Failed to retrieve PSI API ${request} ${status.status} ${getCurrentDate()}.
        Sorry for the inconvenience`)
    },
}).done(function (data) {
    //Previous Day Readings
    let label=[]
    let psiData=[]
    try {
        let hour = date.getHours() - 1;
        for (i = hour; i < data.items.length; i++) {
            let timeStamp = data.items[i].timestamp.slice(11, 19);
            label.push(timeStamp);
            let reading = data.items[i].readings.psi_twenty_four_hourly;
            psiData.push(reading);
        }
        label.push("00:00:00");
        psiData.push(
            data.items[data.items.length - 1].readings.psi_twenty_four_hourly
        );
    }
    catch (e){
        handleApiError(".psi",e)
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "text/plain",
        url: "https://api.data.gov.sg/v1/environment/psi",
        data: { date: getCurrentDate() },
        error: function (status, request) {
            console.log(`PSI API ${request} ${status.status}`);
            handleApiError(".psi", `Failed to retrieve PSI API ${request} ${status.status} ${getCurrentDate()}.
        Sorry for the inconvenience`)
        },
    }).done(function (data) {
        try{
        //Current Day Readings
        for (i = 0; i < data.items.length; i++) {
            let timeStamp = data.items[i].timestamp.slice(11, 19);
            label.push(timeStamp);
            let reading = data.items[i].readings.psi_twenty_four_hourly;
            psiData.push(reading);
        }
        chartPSI(label, psiData);}
        catch (e)
        {
            handleApiError(".psi",e)
        }
    });
});
function chartPSI(label_x, psiData) {
    let a = 0;
    let viewLen = $(window).width();
    if (viewLen < 540) {
        a = 17;
    } else if (viewLen < 720) {
        a = 11;
    } else if (viewLen < 960) {
        a = 5;
    }
    let north = [];
    let south = [];
    let east = [];
    let west = [];
    let central = [];
    let label = [];
    for (i = a; i < psiData.length; i++) {
        north.push(psiData[i].north);
        south.push(psiData[i].south);
        east.push(psiData[i].east);
        west.push(psiData[i].west);
        central.push(psiData[i].central);
        label.push(label_x[i]);
    }
    var ctx = $("#PSIChart");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: label,
            datasets: [
                {
                    label: "North",
                    data: north,
                    backgroundColor: ["rgba(255,0,0,0.2)"],
                    borderColor: ["rgba(255,0,0,1)"],
                },
                {
                    label: "South",
                    data: south,
                    backgroundColor: ["rgba(255,255,0,0.2)"],
                    borderColor: ["rgba(255,255,0,1)"],
                },
                {
                    label: "East",
                    data: east,
                    backgroundColor: ["rgba(0,0,255,0.2)"],
                    borderColor: ["rgba(0,0,255,1)"],
                },
                {
                    label: "West",
                    data: west,
                    backgroundColor: ["rgba(255,0,255,0.2)"],
                    borderColor: ["rgba(255,0,255,1)"],
                },
                {
                    label: "Central",
                    data: central,
                    backgroundColor: ["rgba(0,255,255,0.2)"],
                    borderColor: ["rgba(0,255,255,1)"],
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });
}

$(document).ajaxStop(function(){
    //Variable to be used by main program
    const area = area_JSON.area_metadata;
    //Initialization
    let lat = area[0].label_location.latitude;
    let long = area[0].label_location.longitude;
    let name = area[0].name;
    $("#location").append(
        `<div class ="area" id = "${"location" + 0}"></div>`
    );
    searchWeather(name,0,lat,long)


    let hide = true;
    if ($(window).width() <= 576) {
        $("#indexLocation").click(function () {
            $("#location div").remove();
            let index = $("select#indexLocation").val();
            //Get the latitude and longitude of the location and find closest
            //weather reading station
            let lat = area[index].label_location.latitude;
            let long = area[index].label_location.longitude;
            //Labeling location
            let name = area[index].name;
            $("#location").append(`<div id = "${"location" + index}"></div>`);
            searchWeather(
                name,
                index,
                lat,
                long
            );
            //Codes below allow this portion to toggle to expand
            $(`#${"location" + index} areadata`).hide();
            $(`#${"location" + index}`).click(function () {
                if (hide === true) {
                    $(`#${"location" + index} areadata`).show();
                    hide = false;
                } else {
                    $(`#${"location" + index} areadata`).hide();
                    hide = true;
                }
            });
        });
    }
    else{
        //Prevent default event from happening form input
        //Prevent event occuring when enter is pressed
        $("form input").keydown(function (a) {
            if (a.keyCode === 13) {
                a.preventDefault();
            }
        });
        //Search function(or at least close to a search)
        $("#locationSearch").keyup(function () {
            //Get input from user
            let userValue = $("#locationSearch").val().toUpperCase();
            let userLen = userValue.length;
            if (userLen !== 0) {
                $("#location div").remove();
                let indexResult = [];
                //Search index of related areas
                for (a = 0; a < area.length; a++) {
                    let areaname = area[a].name.slice(0, userLen).toUpperCase();
                    if (userValue === areaname) {
                        indexResult.push(a);
                    }
                }
                if (indexResult.length > 0) {
                    //From index establish latitude and longitude of each respective location

                    let indexed = indexResult[0];
                    let lat = area[indexed].label_location.latitude;
                    let long = area[indexed].label_location.longitude;
                    //Labeling location
                    let name = area[indexed].name;
                    $("#location").append(
                        `<div class ="area" id = "${"location" + i}"></div>`
                    );
                    searchWeather(
                        name,
                        i,
                        lat,
                        long
                    );
                }
            }
        });}
})