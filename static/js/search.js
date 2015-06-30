$(function() {

    // Submit search on submit
    $('#search-form').on('submit', function(event){
        event.preventDefault();
        $('.intro-gif').css('display', 'none');        
        wxSearch();
    });

    // getJSON for searching
    function wxSearch() {
        var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
        var queryString = $('#id_search_location').val();
        var queryURL = apiURL + queryString;

        $.getJSON(queryURL, function(data) {
            $('#lat').html(data.coord.lat);
            $('#lon').html(data.coord.lon);
            $('#loc_name').html(data.name);
            $('#country').html(data.sys.country);
            convertUnixtime(data);
            $('#con').html(data.weather[0].description);
            $('#temp-far').html(((data.main.temp * (9/5)) - 459.67).toFixed(1) + "ºF");
            $('#temp-cel').html((data.main.temp - 273.15).toFixed(1) + "ºC");
            $('#hum').html((data.main.humidity).toFixed(2) + "%");
            $('#wind').html((data.wind.speed * 2.23693629).toFixed(2) + "Mph");
            convertWindDirection(data);
            $('#pres').html(data.main.pressure.toFixed(2) + "mb");



            // if(data.weather[0].id == '800') { 
            //     $('body').css({
            //         'background': 'url("./static/imgs/clear-sky.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '801') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/few-clouds.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '802') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/broken-clouds.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '803') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/broken-clouds.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '804') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/overcast.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['300','301','302','310','311','312','313','314','321','500','520'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/rain-lite.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '501' || data.weather[0].id == '521') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/rain-med.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '600' || data.weather[0].id == '620') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/light-snow.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['601','602','615','616','621','622'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/heavy-snow.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['511','611','612'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/freezing-rain.jpg") no-repeat center center fixed',
            //     });  
            // } else if(data.weather[0].id == '701' || data.weather[0].id == '741') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/dense-fog.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '711') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/smoky-sky.jpg") no-repeat center center fixed',
            //     });
            // } else if(data.weather[0].id == '721') {
            //     $('body').css({
            //         'background': 'url("./static/imgs/haze.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['731','751','761'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/sand.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['502','503','504','522'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/heavy_rain.jpg") no-repeat center center fixed',
            //     });
            // } else if($.inArray(data.weather[0].id, ['200','201','202','210','211','212','221','230','231','232'])) {
            //     $('body').css({
            //         'background': 'url("./static/imgs/thunderstorm.jpg") no-repeat center center fixed',
            //     });
            // } else {
            //     return false;
            // }
        
        changeBackground(data);
        });
    }

    // Change background based on reported conditions
    function changeBackground(data) {
        var imgURL = "";
        var conditionCode = data.weather[0].id;
        console.log(conditionCode);

        switch (conditionCode) {

        case 800:
            imgURL = 'url("./static/imgs/clear-sky.jpg")';
            break;

        case 801:
            imgURL = 'url("./static/imgs/few-clouds.jpg")';
            break;

        case 802:
            imgURL = 'url("./static/imgs/broken-clouds.jpg")';
            break;
        }
        updateCSS(imgURL);
    }

    function updateCSS(imgURL) {
        console.log(imgURL);
        var changes = imgURL + ' no-repeat center center fixed';
        console.log(changes);

        $('body').css('background', changes);
    }    

    function convertUnixtime(data) {
        // Create a new javascript Date object based on the timestamp
        // multiply by 1000 so that the argument is in milliseconds, not seconds
        var unixTimeConverted = new Date(data.dt * 1000);      
        $('#datetime').html(unixTimeConverted);
        var localTime = $("span:contains('GMT-0400')").text().replace('GMT-0400', '');
        $('#datetime').text(localTime);          
    }

    // Convert wind direction to 16 point cardinal directions
    function convertWindDirection(data) {
        var degrees = data.wind.deg;
        var val = Math.round((((degrees/22.5) + 0.5)) % 16);
        var directions = [
            'North', 
            'North-Northeast', 
            'Northeast', 
            'East-Northeast', 
            'East', 
            'East-Southeast', 
            'Southeast', 
            'South-Southeast', 
            'South', 
            'South-Southwest', 
            'Southwest', 
            'West-Southwest', 
            'West', 
            'West-Northwest', 
            'Northwest', 
            'North-Northwest'
            ];
        var windDir = (directions[val]);
        $('#wind-dir').html(windDir + ' (' + degrees + ')º');        
    }    

    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});