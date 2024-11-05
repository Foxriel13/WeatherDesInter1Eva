$(document).ready(function () {
    const toggleButton = $('#toggleSidebarBtn');
    const sidebar = $('#sidebar');
    const closeButton = $('#closeSidebarBtn');
    const mainContent = $('#mainContent');

    toggleButton.on('click', function () {
        sidebar.toggleClass('show'); // Mostrar u ocultar la barra lateral
        mainContent.toggleClass('collapsed'); // Ajustar el contenido principal
        // Mostrar u ocultar el botón de abrir
        toggleButton.toggle(); // Cambiar la visibilidad del botón de abrir
    });

    closeButton.on('click', function () {
        sidebar.removeClass('show'); // Ocultar la barra lateral
        mainContent.removeClass('collapsed'); // Ajustar el contenido principal
        toggleButton.show(); // Mostrar el botón de abrir
    });
});
