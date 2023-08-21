import React from 'react'
import './styles.css'
import ShoppingListCard from '../../components/ShoppingListCard'

function ShoppingList() {

  const dummyData = [
    {
      recipeName: 'Chocolate Chip Cookies',
      ingredients: ['2 cups all-purpose flour', '1 cup chocolate chips', '1/2 cup butter', '1/2 cup sugar', '1/2 cup brown sugar', '1 egg', '1 tsp vanilla extract', '1/2 tsp baking soda']
    },
    {
      recipeName: 'Spaghetti Bolognese',
      ingredients: ['1 pound ground beef', '1 onion', '2 cloves garlic', '1 can diced tomatoes', '1/2 cup tomato sauce', '1 tsp dried oregano', 'Salt and pepper to taste']
    }
  ];
  return (
    <div>
    {dummyData.map((recipe, index) => (
      <ShoppingListCard key={index} item={recipe} />
    ))}
  </div>
  )
}

export default ShoppingList