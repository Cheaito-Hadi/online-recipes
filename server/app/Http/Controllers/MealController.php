<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Meal;


class MealController extends Controller
{
    public function addAMeal(Request $request) {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'failed']);
        }
        $existing_meal = Meal::where('user_id', $user->id)->where('name', $request->name)->first();
        if ($existing_meal) {
            return response()->json(["message" => "Meal with the same name already exists"]);
        }
        $new_meal = new Meal;
        $new_meal->user_id = $user->id;
        $new_meal->name = $request->name;
        $new_meal->date = $request->date;
        $new_meal->save();
        return response()->json(["Schedule" => $new_meal]);
    }
    
}
