import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

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
  @Output() favoriteEvent = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) {}

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
  sendFavoriteEvent = (recipe: any): void => {
    this.favoriteEvent.emit(recipe);
  };
  checkIfFavorite = (recipe: any): boolean => {
    return this.recipeService.checkIfFavorite(recipe);
  };
}
