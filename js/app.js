class CaloriesTracker {
  #calories;
  #totalCalories;
  #meals;
  #workouts;

  constructor() {
    this.#calories = 2000;
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];
  }

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
  }
}

// Meal and Workout class to create the new meal and workout objects easily
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CaloriesTracker();

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const run = new Workout("Morning run", 300);
tracker.addWorkout(run);

console.log(tracker);
