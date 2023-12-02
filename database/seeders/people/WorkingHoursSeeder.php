<?php

namespace Database\Seeders\people;

use DateInterval;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkingHoursSeeder extends Seeder
{
    public function run(): void
    {
        $ShiftDuration1 = 12;   //Продолжительность смены у горничной
        $ShiftDuration2 = 24;   //Продолжительность смены у администратора
        $employee1 = 5;          //С какого сотрудника начинать проставляють отметки (горничная)
        $employee2 = 2;          //С какого сотрудника начинать проставляють отметки (админ)
        $admin1 = 4;            //С какого админа начинаем отмечать приход на работу
        $admin2 = 2;            //С какого админа начинаем отмечать уход с работы для горницной
        $admin3 = 3;            //С какого админа начинаем отмечать уход с работы для администратора
        $maid= 0;               //Составляем график для горничной
        $admin = 1;             //Составляем график для администратора

        //Внимание, даты, с какого и по какое с отметкой о работе и с какого без отметки о работе нужно согласовывать в ручную
        DB::table('working_hours')->insert($this->workSchedule($ShiftDuration1, $employee1, $admin1, $admin2, $maid));        //Засеиваем Горничных
        DB::table('working_hours')->insert($this->workSchedule($ShiftDuration2, $employee2, $admin1, $admin3, $admin));        //Засеиваем администраторов
        DB::table('working_hours')->insert($this->workSchedule2($ShiftDuration1, $employee1, $maid));
        DB::table('working_hours')->insert($this->workSchedule2($ShiftDuration2, $employee2, $admin));
    }

    /**
     * Функция создает массивы для заполнения таблицы "working_hours" с заполнением прихода и ухода сотрудников
     * @param $duration int - Продолжительность смены у горничной
     * @param $staff int - С какого сотрудника начинать проставляють отметки (горничная)
     * @param $admin1 int - С какого админа начинаем отмечать приход на работу
     * @param $admin2 int - С какого админа начинаем отмечать уход с работы для горницной
     * @param $staffType int - Для какой должности составляем график
     * @return array[]
     */
    public function workSchedule(int $duration, int $staff, int $admin1, int $admin2, int $staffType): array
    {
        $shiftDuration = $duration;                                                                //Продолжительность смены горничнйой
        $period = 24;                                                                       //Период между началом первой смены и началом следующей смены
        $beginning = new DateTime('2023-02-15 6:00:00');                            //Начало первой смены горничнйой
        $end = (clone $beginning)->add(new DateInterval("PT{$shiftDuration}H"));    //Конец первой смены горничнйой
        $finish = new DateTime('2023-12-01 00:00:00');                              //Дата окончания цикла (до какой даты строить график)

        $firstComing = new DateTime('2023-02-15 5:30:00');                          //Время и дата, восколько пришел на работу первый сотрудник
        $periodRand = rand(5, 15);                                                          //Для добавления случайности времени прихода и ухода

        $leaving = (clone $end)->add(new DateInterval("PT{$periodRand}M"));;        //Время, восколько ушел с работы первый сотрудник

        $key = 1;
        $idStaff = $staff;
        $idAdmin1 = $admin1;
        $idAdmin2 = $admin2;
        $arrDateWorking = [
            $key => [
                'id_staff' => $idStaff,         //Гоничная
                'id_admin1' => $idAdmin1,         //Администратор, которой создал запись о приходе
                'id_admin2' => $idAdmin2,         //Администратор, которой создал запись об уходе
                'beginning' => $beginning,      //Начало смены
                'end' => $end,                  //Конец смены
                'work_in' => $firstComing,       //Восколько по факту пришел на работу
                'work_out' => $leaving,          //Восколько по факту ушел с работы
                'note' => '',                   //Заметка о призине опоздания
                'violation' => false,           //Является ли опоздание нарушением
                'overtime_before' => false,
                'overtime_after' => false,
            ],
        ];

        do {
            $idStaff++;
            if($staffType === 0){

                if($idStaff >= 8){$idStaff = 5;}
            }else{
                if($idStaff >= 5){$idStaff = 2;}
            }

            $idAdmin1++;
            if($idAdmin1 >= 5){$idAdmin1 = 2;}
            $idAdmin2++;
            if($idAdmin2 >= 5){$idAdmin2 = 2;}
            $periodRand1 = rand(1, 20);                                                     //Для добавления случайности времени прихода и ухода
            $periodRand2 = rand(1, 20);                                                     //Для добавления случайности времени прихода и ухода

            $dateG = clone $arrDateWorking[$key]['beginning'];                              //Начало смены предыдущее

            $dateS = (clone $dateG)->add(new DateInterval("PT{$period}H"));         //начало смены
            $dateE = (clone $dateS)->add(new DateInterval("PT{$shiftDuration}H"));  //Конец смены

            if(rand(1, 100) <= 3){$violation1 = rand(15, 180);}else{$violation1 = 0;}       //Опоздание прибавляем к началу смены
            if(rand(1, 100) <= 3){$violation2 = rand(15, 180);}else{$violation2 = 0;}       //Уход раньше прибавляем к началу смены

            if($violation1 === 0){
                $dateC = (clone $dateS)->sub(new DateInterval("PT{$periodRand1}M"));    //Пришла на работу
                $violation = false;
                $note = '';
            }else{
                $dateC = (clone $dateS)->add(new DateInterval("PT{$violation1}M"));    //Пришла на работу с опозданием
                if(rand(1,2) === 1 ){$violation = true;}else{$violation = false;}
                if($violation && rand(1,2) === 1 ){$note = 'Проспала';}else{$note = 'Проблемы в личной жизни';}

            }

            if($violation2 === 0){
                $dateL = (clone $dateE)->add(new DateInterval("PT{$periodRand2}M"));    //Ушла с работы
            }else{
                $dateL = (clone $dateE)->sub(new DateInterval("PT{$violation2}M"));    //Ушла с работы не доработав
                if(rand(1,2) === 1 ){$violation = true;}else{$violation = false;}
                if($violation && rand(1,2) === 1 ){$note = $note . ' Прорвало кран';}else{$note = $note . ' Ребенка забрать из садика';}
            }

            $key++;
            $arrDateWorking[$key] = [
                'id_staff' => $idStaff,
                'id_admin1' => $idAdmin1,
                'id_admin2' => $idAdmin2,
                'beginning' => $dateS,
                'end' => $dateE,
                'work_in' => $dateC,
                'work_out' => $dateL,
                'note' => $note,
                'violation' => $violation,
                'overtime_before' => false,
                'overtime_after' => false,
            ];

        } while ($dateS < $finish);

        return $arrDateWorking;
    }

    /**
     * Функция создает массивы для заполнения таблицы "working_hours" без заполнения прихода и ухода сотрудников
     * @param $duration int - Продолжительность смены у горничной
     * @param $staff int - С какого сотрудника начинать проставляють отметки (горничная)
     * @param $staffType int - Для какой должности составляем график
     * @return array[]
     */
    public function workSchedule2(int $duration, int $staff, int $staffType): array
    {
        $shiftDuration = $duration;                                                          //Продолжительность смены горничнйой
        $period = 24;                                                                       //Период между началом первой смены и началом следующей смены
        $beginning = new DateTime('2023-12-01 06:00:00');                            //Начало первой смены горничнйой
        $end = (clone $beginning)->add(new DateInterval("PT{$shiftDuration}H"));    //Конец первой смены горничнйой
        $finish = new DateTime('2024-02-01 00:00:00');                              //Дата окончания цикла (до какой даты строить график)

        $key = 1;
        $idStaff = $staff;
        $arrDateWorking = [
            $key => [
                'id_staff' => $idStaff,         //Гоничная
                'beginning' => $beginning,      //Начало смены
                'end' => $end,                  //Конец смены
                'note' => '',                   //Заметка о призине опоздания
                'violation' => false,           //Является ли опоздание нарушением
                'overtime_before' => false,
                'overtime_after' => false,
            ],
        ];

        do {
            $idStaff++;
            if($staffType === 0){

                if($idStaff >= 8){$idStaff = 5;}
            }else{
                if($idStaff >= 5){$idStaff = 2;}
            }

            $dateG = clone $arrDateWorking[$key]['beginning'];                              //Начало смены предыдущее

            $dateS = (clone $dateG)->add(new DateInterval("PT{$period}H"));         //начало смены
            $dateE = (clone $dateS)->add(new DateInterval("PT{$shiftDuration}H"));  //Конец смены

            $key++;
            $arrDateWorking[$key] = [
                'id_staff' => $idStaff,
                'beginning' => $dateS,
                'end' => $dateE,
                'note' => '',                   //Заметка о призине опоздания
                'violation' => false,           //Является ли опоздание нарушением
                'overtime_before' => false,
                'overtime_after' => false,
            ];

        } while ($dateS < $finish);

        return $arrDateWorking;
    }

}
