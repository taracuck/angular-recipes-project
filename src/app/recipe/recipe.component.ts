import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  @Input() recipeRef: any;
  recipeCalories!: number;
  recipeLabels!: string[];
  recipeIngredients!: any[];
  showRecipe: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.getCalories();
    this.getLabels();
    this.getIngredients();
  }

  getCalories = () => {
    this.recipeCalories = Math.round(this.recipeRef.recipe.calories);
  };

  getLabels = () => {
    this.recipeLabels = this.recipeRef.recipe.dietLabels;
  };

  getIngredients = () => {
    this.recipeIngredients = this.recipeRef.recipe.ingredients;
  };

  setShowRecipe = (): void => {
    this.showRecipe = !this.showRecipe;
  };
}
