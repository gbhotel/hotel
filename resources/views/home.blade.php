<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <script>
            let _token='{{csrf_token()}}';
        </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../sass/app.scss">
        @vite(['resources/sass/app.scss', 'resources/js/index.jsx'])

        <title>The Hotel</title>
    </head>
    <body>
        <div id="root">
        </div>
        <div class="auth" id="auth">@yield('content')</div>
    </body>
</html>
