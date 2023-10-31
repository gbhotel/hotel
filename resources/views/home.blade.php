<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite(['resources/sass/app.scss', 'resources/js/index.jsx'])

        <title>The Hotel</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
