class CaloriesTracker {
  #calories;
  #totalCalories;
  #meals;
  #workouts;

  constructor() {
    this.#calories = 8000;
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];

    this._displayCaloriesLimit();
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  //   Public Methods/ APIs //
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    this._render();
  }

  //   Private Methods //
  _displayTotalCalories() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerHTML = this.#totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimit = document.getElementById("calories-limit");
    caloriesLimit.innerHTML = this.#calories;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");
    const consumed = this.#meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    console.log(consumed);
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");
    const burned = this.#workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const remaining = this.#calories - this.#totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
  }

  //   This private method is used to render the component anytime something changes
  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
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
