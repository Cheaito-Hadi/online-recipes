<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ShoppingList;
use App\Models\Lists;


class ShoppingListController extends Controller
{
    public function createShoppingList(Request $request)
    {
        $user = Auth::user();
        if ($user->shoppingLists->isEmpty()) {
            $new_shopping_list = new ShoppingList;
            $new_shopping_list->name = $user->name;
            $new_shopping_list->user_id = $user->id;
            $new_shopping_list->save();
        } else {
            $new_shopping_list = $user->shoppingLists;
        }
        $recipe_id = $request->recipe_id;
        $existingList = $new_shopping_list[0]->items->contains('recipe_id', $recipe_id);
        if ($existingList) {
            return response()->json(['message' => 'This recipe already exists in your list']);
        }
        $new_list_item = new Lists;
        $new_list_item->shopping_id = $new_shopping_list[0]->id;
        $new_list_item->recipe_id = $recipe_id;
        $new_list_item->save();
        return response()->json(['message' => 'Created Shopping List']);
    }

    public function getShoppingList()
    {
        $user = Auth::user();
        $shoppingList = $user->shoppingLists->first()->items;
        foreach($shoppingList as $list){
            $recipe= $list->recipe;
            $recipe->ingredients;
        }
        return response()->json([
            'message' => 'success',
            'recipe_data' => $shoppingList
        ]);
    }
}