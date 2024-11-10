$(document).ready(function () {
    const apiKey = '290980dcf65fc6dbf6af06af6638fbfb';

    // Función para mostrar el clima según el nombre de la ciudad
    function getWeatherByCity(city) {
        if (city === "") {
            alert("Por favor, ingrese un nombre de lugar.");
            return;
        }

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        // Clima actual
        $.ajax({
            url: currentWeatherUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayCurrentWeather(data);
            },
            error: function () {
                alert("Error al obtener el clima actual.");
            }
        });

        // Predicción de 5 días
        $.ajax({
            url: forecastUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayForecast(data);
            },
            error: function () {
                alert("Error al obtener la predicción del clima.");
            }
        });
    }

    // Función para mostrar el clima en la ubicación actual
    function getWeatherByLocation(lat, lon) {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

        // Clima actual
        $.ajax({
            url: currentWeatherUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayCurrentWeather(data);
            },
            error: function () {
                alert("Error al obtener el clima actual.");
            }
        });

        // Predicción de 5 días
        $.ajax({
            url: forecastUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayForecast(data);
            },
            error: function () {
                alert("Error al obtener la predicción del clima.");
            }
        });
    }

    // Función para mostrar los datos de clima actual
    function displayCurrentWeather(data) {
        $('#cityName').text(data.name);
        $('#weatherDescription').text(data.weather[0].description);
        $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        $('#weatherResult').removeClass('d-none');
    }

    // Función para mostrar la predicción del clima
    function displayForecast(data) {
        $('#forecastContainer').empty(); // Limpiar la predicción anterior
        const forecastList = data.list;

        // Procesar cada predicción cada 24 horas (aprox. 8 intervalos de 3 horas por día)
        for (let i = 0; i < forecastList.length; i += 8) {
            const forecast = forecastList[i];
            const date = new Date(forecast.dt_txt).toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric', month: 'short' });
            const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

            // Crear una tarjeta de predicción
            const forecastCard = `
                <div class="col-md-3">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <h6 class="card-title">${date}</h6>
                            <img src="${iconUrl}" alt="${forecast.weather[0].description}" width="50">
                            <p class="card-text">${forecast.weather[0].description}</p>
                            <p class="card-text">Temp: ${forecast.main.temp}°C</p>
                        </div>
                    </div>
                </div>
            `;

            $('#forecastContainer').append(forecastCard);
        }
    }

    // Evento para buscar por ciudad
    $('#getWeatherBtn').click(function () {
        const city = $('#cityInput').val().trim();
        getWeatherByCity(city);
    });

    // Evento para obtener clima por ubicación actual
    $('#locationBtn').click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            }, function () {
                alert("No se pudo obtener la ubicación.");
            });
        } else {
            alert("Geolocalización no es soportada en este navegador.");
        }
    });
});
