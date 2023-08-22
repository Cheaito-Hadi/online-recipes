<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\RecipeIngredient;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{

    public function getAllRecipes()
    {
        $recipes = Recipe::with(['ingredients', 'cuisine', 'likes', 'comments', 'images'])->withCount(['likes', 'comments'])->get();
        foreach($recipes as $recipe){
            $recipe->is_liked = $recipe->likes->contains('user_id', Auth::id());
        }
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

    public function createRecipe(Request $request)
    {
        $new_recipe = new Recipe;
        $new_recipe->user_id = Auth::id();
        $cuisine = Cuisine::where('name', $request->cuisine)->first();
        if (is_null($cuisine)) {
            $cuisine = new Cuisine;
            $cuisine->name = $request->cuisine;
            $cuisine->save();
        }
        $cuisine_id = $cuisine->id;
        $new_recipe->name = $request->name;
        $new_recipe->cuisine_id = $cuisine_id;
            $new_recipe->save();
            $decoded_ingredient= json_decode($request->ingredients);
            foreach ($decoded_ingredient as $ingredient) {
                $new_ingredient = Ingredient::where('name', $ingredient->name)->first();         
                if (is_null($new_ingredient)) {
                    $new_ingredient = new Ingredient;
                    $new_ingredient->name = $ingredient->name;
                    $new_ingredient->save();
                }
                $recipe_ingredient = new RecipeIngredient;
                $recipe_ingredient->recipe_id = $new_recipe->id;
                $recipe_ingredient->ingredient_id = $new_ingredient->id;
                $recipe_ingredient->amount = $ingredient->amount;
                try {
                    $recipe_ingredient->save();
                } catch (\Throwable $e) {
                    return response()->json(['status' => 'failed']);
                }
            }
            foreach($request->image_path as $recipe_image ){
            $recipe_image_db = new Image;
            $file_name = time() . "_recipe_image_" . uniqid() . "." . $recipe_image->extension();
            $recipe_image->move(storage_path('images'),$file_name);
            $recipe_image_db->recipe_id =$new_recipe->id;
            $recipe_image_db->image_path = storage_path("images")."\\".$file_name;
            $recipe_image_db->save();
            }
            return response()->json(['status' => 'success']);
        }
    }