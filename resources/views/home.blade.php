<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite(['resources/sass/app.scss', 'resources/js/index.jsx'])

        <title>The Hotel</title>
    </head>
    <body>
        <div id="root">

        </div>
        <div id="auth">@yield('content')</div> 
        

        <form action="{{route('logout')}}" method="post">
            @csrf
            Костыль для выхода из учетной записи (logout):
            <input type="submit" value="Выход">
        </form>   
        
    </body>
</html>
