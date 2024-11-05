$(document).ready(function() {
    $('#getWeatherBtn').click(function () {
        const city = $('#cityInput').val().trim();
        
        if (city === "") {
            $('#errorMessage').text("Por favor, ingrese un nombre de lugar.").removeClass('d-none');
            return;
        } else {
            $('#errorMessage').addClass('d-none'); // Hide error message if input is valid
        }

        const apiKey = '290980dcf65fc6dbf6af06af6638fbfb'; // Replace with a secure method to manage API keys
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.cod === 200) {
                    $('#cityName').text(data.name);
                    $('#weatherDescription').text(data.weather[0].description);
                    $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                    $('#weatherResult').removeClass('d-none');
                } else {
                    $('#errorMessage').text("Ciudad no encontrada!").removeClass('d-none');
                    $('#weatherResult').addClass('d-none'); // Hide results if city not found
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error fetching weather data:', textStatus, errorThrown);
                $('#errorMessage').text("An error occurred while retrieving weather data.").removeClass('d-none');
            }
        });
    });
});