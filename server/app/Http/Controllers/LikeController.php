<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function likeRecipe(Request $request)
    {
        $recipeId = intval($request->recipe_id);
        $user = Auth::user();
        if (!$user || !Recipe::find($recipeId)) {
            return response()->json([
                "message" => "Couldn't like the post",
                "status" => "failed"
            ]);
        }
        $existingLike = Like::firstOrCreate([
            'recipe_id' => $recipeId,
            'user_id' => $user->id,
        ]);
        $existingLike->save();
        if (!$existingLike->wasRecentlyCreated) {
            return response()->json([
                "message" => "You have already liked this recipe",
                "status" => "failed"
            ]);
        }
        return response()->json([
            "message" => "Liked the recipe",
            "status" => "success"
        ]);
    }

    public function unlikeRecipe(Request $request)
    {
        $user = Auth::user();
        $recipeId = $request->recipe_id;
        if (!$user || !Recipe::find($recipeId)) {
            return response()->json([
                "message" => "could'nt like",
                "status" => "failed"
            ]);
        }
        $existingLike = Like::where('user_id', $user->id)->where('recipe_id', $recipeId)->first();
        if ($existingLike) {
            $existingLike->delete();
        }
        return response()->json([
            "message" => "unliked recipe",
            "status" => "success"
        ]);
    }
}
