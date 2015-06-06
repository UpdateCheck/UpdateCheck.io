<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function() {
    Route::post('auth', 'UserController@auth');

    Route::group(['prefix' => 'users'], function() {
        Route::post('/', 'UserController@store');
    });
});

Route::get('{any}', 'AppController@index')->where('any', '.*');
