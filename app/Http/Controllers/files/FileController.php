<?php

namespace App\Http\Controllers\files;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class FileController extends Controller
{
    /**
     * @throws HttpException
     */
    public function download(Request $request)
    {

        if(!$request->file('avatar')) {
            throw new HttpException(400,'Отсутствует обязательный файл "avatar" в запросе');
        }

        $user = Auth::user();
//
        $fileName = $user->getAuthIdentifier();

        $path = Storage::url('img/avatars/' . $fileName);

        if($request->file('avatar')->isValid()) {
            $request->file('avatar')->storeAs('img/avatars', $fileName, 'public');
            }

        $user->update([
            'photo' => $path
        ]);

        return response()->json($path);

        }
}
