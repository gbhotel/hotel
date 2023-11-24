<?php

namespace App\Http\Controllers\files;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the uploaded file
//        $request->validate([
//            'file' => 'required|mimes:pdf,doc,docx|max:2048', // Adjust the allowed file types and size
//        ]);

        // Get the uploaded file
//        $file = $request->file('form-data');
//
//        // Store the file on disk (e.g., in the 'public' disk)
//        $path = $file->store('uploads', 'public');

        // Do any additional processing if needed (e.g., save the file path to a database)

        return response()->json(['message' => $request]);
    }
}
