<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipeController extends Controller
{

    public function getAllRecipes()
    {
        $recipes = Recipe::with(['ingredients', 'cuisine', 'likes', 'comments', 'images'])->withCount(['likes', 'comments'])->get();

        return response()->json([
            'message' => 'success',
            'recipe_data' => $recipes
        ]);
    }

    public function getRecipeImage(Request $request)
    {
        $image_id = $request->id;
        $image = Image::find($image_id);
        header("Content-type: image/png");
        $imageContent = file_get_contents($image->image_path);
        return $imageContent;
    }
}
