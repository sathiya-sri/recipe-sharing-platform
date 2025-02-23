const RecipeData = [
    {
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      preparationTime: "25 mins",
      createdBy: "Chef Mario",
      category: "Main Course",
      cuisine: "Italian",
      mealType: "Dinner",
      diet: "Non-Vegetarian",
      nutrition: {
        calories: 450,
        protein: 20,
        fat: 15,
        carbohydrates: 55
      },
      comments: [
        { user: "Alice", text: "Can I use bacon instead of pancetta?", createdAt: "2025-02-18T12:30:00Z" }
      ],
      reviews: [
        { user: "Bob", rating: 5, reviewText: "Delicious and easy to make!", createdAt: "2025-02-17T18:45:00Z" }
      ]
    },
    {
      title: "Vegan Buddha Bowl",
      description: "A nutritious bowl filled with quinoa, roasted vegetables, avocado, and tahini dressing.",
      preparationTime: "30 mins",
      createdBy: "Chef Lisa",
      category: "Salad",
      cuisine: "Fusion",
      mealType: "Lunch",
      diet: "Vegan",
      nutrition: {
        calories: 350,
        protein: 12,
        fat: 10,
        carbohydrates: 50
      },
      comments: [
        { user: "Charlie", text: "Can I add tofu for more protein?", createdAt: "2025-02-15T14:20:00Z" }
      ],
      reviews: [
        { user: "David", rating: 4, reviewText: "Super healthy! A bit more seasoning would be great.", createdAt: "2025-02-16T10:00:00Z" }
      ]
    },
    {
      title: "Chocolate Lava Cake",
      description: "A rich and gooey chocolate dessert with a molten center.",
      preparationTime: "20 mins",
      createdBy: "Chef Emma",
      category: "Dessert",
      cuisine: "French",
      mealType: "Snack",
      diet: "Vegetarian",
      nutrition: {
        calories: 500,
        protein: 6,
        fat: 25,
        carbohydrates: 60
      },
      comments: [
        { user: "Eve", text: "How do I ensure the center stays molten?", createdAt: "2025-02-14T09:30:00Z" }
      ],
      reviews: [
        { user: "Frank", rating: 5, reviewText: "Absolutely divine! Perfect texture and taste.", createdAt: "2025-02-13T20:15:00Z" }
      ]
    },
    {
      title: "Chocolate Lava Cake",
      description: "A rich and gooey chocolate dessert with a molten center.",
      preparationTime: "20 mins",
      createdBy: "Chef Emma",
      category: "Dessert",
      cuisine: "French",
      mealType: "Snack",
      diet: "Vegetarian",
      nutrition: {
        calories: 500,
        protein: 6,
        fat: 25,
        carbohydrates: 60
      },
      comments: [
        { user: "Eve", text: "How do I ensure the center stays molten?", createdAt: "2025-02-14T09:30:00Z" }
      ],
      reviews: [
        { user: "Frank", rating: 5, reviewText: "Absolutely divine! Perfect texture and taste.", createdAt: "2025-02-13T20:15:00Z" }
      ]
    }
  ];
  

  
  export default RecipeData; // If using in a module-based project
  