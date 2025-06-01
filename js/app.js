'use strict';

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

    this._displayCaloriesLimit();
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this.#totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimit = document.getElementById('calories-limit');
    caloriesLimit.innerHTML = this.#calories;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this.#meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    console.log(consumed);
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this.#workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');
    const remaining = this.#calories - this.#totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  // This method is used to display the calories progress
  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this.#totalCalories / this.#calories) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  //   This private method is used to render the component anytime something changes
  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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

const breakfast = new Meal('Breakfast', 200);
tracker.addMeal(breakfast);

const run = new Workout('Morning run', 300);
tracker.addWorkout(run);

console.log(tracker);
