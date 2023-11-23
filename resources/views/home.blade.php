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
{{--    @if(Auth::check() && Auth::user()->role_id !== 1)--}}
    <div class="shadow-lg">
        <div class="d-flex  main-container p-2 flex-row justify-content-between align-content-center">
            <div class="align-center mt-2 font-weight-bold">MY HOTEL</div>
            <div class="d-flex gap-4 flex-row align-content-center text-center">
                <div class="d-flex align-items-center justify-content-center"><a  class="text-decoration-none text-reset" href="#">Доступные номера</a></div>
                <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset">Услуги</a></div>
                <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset" >Вакансии</a></div>
                <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset" >Новости</a></div>
                <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset">Соглашения</a></div>
            </div>
            <div>
                @if (Auth::check())
                    <div class="d-flex gap-3">
                        <div class="rounded-circle overflow-hidden bg-gray-25" style="border-radius: 50%; width: 40px; height: 40px;">
                            <img src="{{ asset(Auth::user()->photo) }}" alt="User Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <p class="ml-2 mb-0">Добро пожаловать!</p>
                            <p class="ml-2 mb-0 uppercase font-bold">{{ Auth::user()->first_name . ' ' . Auth::user()->last_name }}</p>
                        </div>
                    </div>
                @else
                    <div class="d-flex gap-2">
                        <div class="gradient-container ">
                            <button   class=" btn-gradient-border text-black uppercase btn"></button>
                        </div>
                        <button type="submit" class="text-white btn-login uppercase btn">
                            {{ __('Registration') }}
                        </button>
                    </div>
                @endif
            </div>
        </div>
    </div>
{{--    @endif--}}
    <div id="root"></div>
    <div class="auth" id="auth">@yield('content')</div>
    </body>
</html>
