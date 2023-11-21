<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Check_in;
use App\Models\Room_cleaning;
use App\Models\Rooms;
use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TasksController extends Controller
{
    public function getTasks()
    {

        $result = [
            'tasks_name' => [],
            'tasks' => []
        ];

        $tasks = Tasks::query()
            ->with('room')
            ->get();

        foreach ($tasks as $task) {

            if (!in_array($task->name, $result['tasks_name'])) {
                $result['tasks_name'][] = $task->name;
            }

            $result['tasks'][] = [
                'name' => $task->name,
                'id_room' => $task->room->number,
                'id_staff' => $task->id_staff,
                'created_date' => $task->created_date,
                'execution_date' => $task->execution_date,
                'comment' => $task->comment,
                'status' => $task->status
            ];
        }
        return response()->json($result);
    }

    public function getTasksForEmployee($id) {


        $result = [];

        $tasks = Tasks::query()
                      ->with('employee.user')
                      ->with('room.category')
                      ->where('created_date', "=", '2023-11-18')
                      ->where('id_staff', '=', $id )
                      ->orderBy('id')
                      ->get();


        foreach ($tasks as $task) {
            $result[] = [
                'id' => $task->id,
                'employee_name' =>  $task->employee->user->first_name . ' ' . $task->employee->user->last_name,
                'id_staff' => $task->employee->id,
                'name' => $task->name,
                'room_number' => $task->room->number,
                'comment' => $task->comment,
                'status' => $task->status,
                'room_sets' => $task->room->sets,
                'room_category' => $task->room->category->category,
                ];
        }

            return response()->json($result);
    }

    public function changeTaskStatus(Request $request) {

        $data = $request->only([
            'taskId',
            'status'
        ]);

        if(!Tasks::query()->find($data['taskId'])){
            return response()->json(['message' => 'Задание не найдено'], 404);
        }

        if(Tasks::query()
            ->where('id', '=', $data['taskId'])
            ->update([
                'status' => $data['status'],
//                'execution_date' => now()->format('y-m-d'),
                ])) {
            return response()->json(['status' => $data['status']]);
        }
        return response()->json(['message' => 'Статус не обновился'], 404);
    }

    public function addTask(Request $request)
    {

        $data = $request->only([
            'room_number',
            'task_name',
            'id_staff',
            'id_room'
        ]);

        DB::table('tasks')
            ->insert([
                'name' => $data['task_name'],
                'id_room' => $data['id_room'],
                'id_staff' => $data['id_staff'],
                'created_date' => '2023-11-12',

            ]);


        return response()->json(['message' => 'Задача успешно добавлена', 'task' => $data['task_name'] . ' ' . '(комната №' . $data['id_room'] . ')'], 200);
    }
}
