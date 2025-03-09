const RecipeData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Cook spaghetti until al dente, reserving some pasta water...",
    preparationTime: "25 mins",
    createdBy: "Chef Mario",
    category: "Main Course",
    cuisine: "Italian",
    mealType: "Dinner",
    dietType: "Non-Vegetarian",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino Romano cheese",
      "50g Parmesan cheese",
      "Black pepper",
      "Salt",
      "2 cloves garlic (optional)"
    ],
    nutrition: {
      calories: 450,
      protein: 20,
      fat: 15,
      carbohydrates: 55
    },
    preparationProcess: "Start by boiling a large pot of salted water...",
    videoUrl: "https://cdn.pixabay.com/video/2017/08/29/11627-231571956_tiny.mp4",
    reviews: [
      { user: "John Doe", reviewText: "Amazing recipe! So creamy and flavorful.", rating: 5 },
      { user: "Jane Smith", reviewText: "Tasted great, but needed a bit more salt.", rating: 4 }
    ]
  },
  {
    id: 2,
    title: "Vegan Buddha Bowl",
    description: "A nutritious bowl filled with quinoa, roasted vegetables...",
    preparationTime: "30 mins",
    createdBy: "Chef Lisa",
    category: "Salad",
    cuisine: "Fusion",
    mealType: "Lunch",
    dietType: "Vegan",
    ingredients: [
      "1 cup quinoa",
      "1 cup roasted sweet potatoes",
      "1/2 cup chickpeas",
      "1/2 avocado, sliced",
      "1/4 cup tahini",
      "1 tbsp lemon juice",
      "1 cup mixed greens",
      "Salt and pepper to taste"
    ],
    nutrition: {
      calories: 350,
      protein: 12,
      fat: 10,
      carbohydrates: 50
    },
    preparationProcess: "Rinse the quinoa under cold water...",
    videoUrl: "https://cdn.pixabay.com/video/2017/08/29/11627-231571956_tiny.mp4",
    reviews: [
      { user: "Mike Johnson", reviewText: "Loved it! Super healthy and delicious.", rating: 5 },
      { user: "Emma Watson", reviewText: "Could use a bit more seasoning, but still good.", rating: 4 }
    ]
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    description: "A rich and gooey chocolate dessert with a molten center...",
    preparationTime: "20 mins",
    createdBy: "Chef Emma",
    category: "Dessert",
    cuisine: "French",
    mealType: "Snack",
    dietType: "Vegetarian",
    ingredients: [
      "100g dark chocolate",
      "100g butter",
      "2 eggs",
      "50g sugar",
      "30g flour",
      "1 tsp vanilla extract",
      "Pinch of salt"
    ],
    nutrition: {
      calories: 500,
      protein: 6,
      fat: 25,
      carbohydrates: 60
    },
    preparationProcess: "Preheat your oven to 200°C...",
    videoUrl: "https://cdn.pixabay.com/video/2017/08/29/11627-231571956_tiny.mp4",
    reviews: [
      { user: "Alice Brown", reviewText: "The best lava cake I've ever had!", rating: 5 },
      { user: "David Green", reviewText: "Nice texture, but a bit too sweet for me.", rating: 4 }
    ]
  },
  {
    id: 4,
    title: "Avocado Toast",
    description: "A simple and delicious avocado toast...",
    preparationTime: "10 mins",
    createdBy: "Chef Emma",
    category: "Breakfast",
    cuisine: "American",
    mealType: "Breakfast",
    dietType: "Vegan",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "1/2 cup cherry tomatoes, halved",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
      "1 tsp lemon juice",
      "Red pepper flakes (optional)"
    ],
    nutrition: {
      calories: 300,
      protein: 5,
      fat: 20,
      carbohydrates: 30
    },
    preparationProcess: "Toast the bread slices in a toaster...",
    videoUrl: "https://cdn.pixabay.com/video/2017/08/29/11627-231571956_tiny.mp4",
    reviews: [
      { user: "Sophia Wilson", reviewText: "So simple yet so delicious!", rating: 5 },
      { user: "Liam Carter", reviewText: "Tasty, but I prefer a bit more seasoning.", rating: 4 }
    ]
  }
];

export default RecipeData;
