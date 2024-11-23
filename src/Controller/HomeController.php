<?php

declare(strict_types=1);


namespace App\Controller;

use App\Kernel\Controller\Controller;

class HomeController extends Controller
{
    public function index(): void
    {

//        $this->view('home');

        error_reporting(E_ALL);
        ini_set('display_errors', 1);

        $filter1 = [
            'dates' => [
                'start' => date('d.m.Y', strtotime('yesterday')),
                'end' => date('d.m.Y', strtotime('yesterday')),
            ],
            'types' => [
                'civil',
      //          'administrative',
            ],
            'courts' => [
                'АС Ростовской области',
                'АС Рязанской области'
            ],
        ];

        $filter2 = ['caseNumber'=>"А54-10898/2024"];

       // $url = 'http://localhost:3000/api/arbitr/all?' . http_build_query($filter1);
        $url = 'http://localhost:3000/api/arbitr/case?' . http_build_query($filter2);
        $ch = curl_init($url);

        // Настраиваем параметры запроса
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Чтобы получить ответ в переменной
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Автоматически следовать редиректам
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);           // Без ограничения времени ожидания
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);    // Без ограничения времени подключения

        // Указываем, что ожидаем JSON
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',          // Заголовок для JSON (если требуется)
            'Accept: application/json',                // Ожидаем JSON-ответ
        ]);

        // Выполняем запрос
        $response = curl_exec($ch);

        // Закрываем соединение
        curl_close($ch);

        $result = json_decode($response, true);
        dd($result);

    }
}

?>