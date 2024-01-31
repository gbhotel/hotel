<?php

namespace App\Http\Controllers\files;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\throwException;

class FileController extends Controller
{
    /**
     * @throws HttpException
     */
    public function upload(Request $request)
    {

        if(!$request->hasFile('avatar')) {
            throw new HttpException(400,'Отсутствует обязательный файл "avatar" в запросе');
        }

        $user = Auth::user();
//
        $fileName = $user->getAuthIdentifier() . time();

        $path = Storage::url('img/avatars/' . $fileName);

        if($request->file('avatar')->isValid()) {
            $request->file('avatar')->storeAs('img/avatars', $fileName, 'public');
            }

        $user->update([
            'photo' => $path
        ]);

        }
}
