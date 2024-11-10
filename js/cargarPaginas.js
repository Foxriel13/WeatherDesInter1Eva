$(document).ready(function () {
    var home = $('#home');
        var buscar = $('#buscar');
    $('#buscarSitio').click(function () {
        buscar.removeAttr('hidden');
        home.attr('hidden', true);
    });
    $('#homeSitio').click(function () {
        home.removeAttr('hidden');
        buscar.attr('hidden', true);
    });
    $('#buscarBoton').click(function () {
        buscar.removeAttr('hidden');
        home.attr('hidden', true);
    });
    $('#locationBtn').click(function () {
        buscar.removeAttr('hidden');
        home.attr('hidden', true);
    });
});
