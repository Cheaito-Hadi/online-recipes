<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RecipeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::get('/get_recipes', [RecipeController::class, "getAllRecipes"]);
Route::get('/get_image/{id}', [RecipeController::class, "getRecipeImage"]);
Route::post('/create_recipe', [RecipeController::class, "createRecipe"]);

Route::post('/like_recipe', [LikeController::class, "likeRecipe"]);
Route::post('/unlike_recipe', [LikeController::class, "unlikeRecipe"]);