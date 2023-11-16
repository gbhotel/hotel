{{-- @extends('layouts.app') --}}
@extends('home')

@section('content')
<div class="">
    <div class="d-flex main-container p-2 flex-row justify-content-between align-content-center">
        <div class="align-center mt-2 font-weight-bold">MY HOTEL</div>
        <div class="d-flex gap-4 flex-row align-content-center text-center">
            <div class="d-flex align-items-center justify-content-center"><a  class="text-decoration-none text-reset" href="#">Доступные номера</a></div>
            <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset">Услуги</a></div>
            <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset" >Вакансии</a></div>
            <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset" >Новости</a></div>
            <div class="d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none text-reset">Соглашения</a></div>
        </div>
        <div class="d-flex gap-2 ">
            <div class="gradient-container">
                <button type="submit"  class=" btn-gradient-border text-black uppercase btn">
                    <a></a>
                </button>
            </div>

            <button type="submit" class=" text-white btn-login uppercase btn">
                {{ __('Registration') }}
            </button>
        </div>
    </div>
    <div class="login">
            <div class=" login-card card col-md-3">
                <div class=" uppercase border-0 bg-transparent card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="row mb-3">
{{--                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>--}}

                            <div class="col-md-12">
                                <input id="email" placeholder="{{ __('Email Address') }}" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email')?? "user21@htl.ru" }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
{{--                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>--}}

                            <div class="col-md-12">
                                <input id="password" placeholder="{{ __('Password') }}" type="password" class="form-control @error('password') is-invalid @enderror" name="password" value="{{ old('password')?? "123" }}" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-12 mt-auto">
                                <button type="submit" class=" text-white btn-login uppercase w-100 btn">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </div>
</div>
@endsection
