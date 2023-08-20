<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function addComment(Request $request)
    {
        $new_comment = new Comment;
        $new_comment->user_id = Auth::id();
        $new_comment->recipe_id = $request->recipe_id;
        $new_comment->comment = $request->comment;
        if ($new_comment->save()) {
            return response()->json([
                "message" => "Comment added",
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'message' => 'Failed to add comment',
                'status' => 'error'
            ]);
        }
    }

    public function getComments(Request $request)
    {
        $recipe = Recipe::where('id', $request->id)->first();
        foreach ($recipe->comments as $comment) {
            $comment->user = User::where('id', $comment->user_id)->pluck('name')->first();
        }
        return response()->json(['comments' => $recipe->comments]);
    }
}
