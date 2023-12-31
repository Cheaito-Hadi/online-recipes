<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class, 'shopping_id');
    }
}
