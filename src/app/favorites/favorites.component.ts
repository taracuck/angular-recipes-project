import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredRecipes: any[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getFavorites();
  }
  getFavorites = (): void => {
    this.favorites = this.recipeService.getFavorites();
  };
  toggleFavorite = (favorite: any): void => {
    console.log(favorite);
    if (this.recipeService.checkIfFavorite(favorite)) {
      this.recipeService.removeFavorite(favorite);
    } else {
      this.recipeService.addFavorite(favorite);
    }
    this.getFavorites();
  };
  getAndSetRecipes = (formObject: any): void => {
    this.filteredRecipes = this.recipeService
      .getRecipes(formObject)
      .subscribe((response: any) => {
        this.favorites = response;
        console.log(response);
      });
    console.log(this.filteredRecipes);
    this.favorites = this.filteredRecipes.filter((item): any => {
      for (let favorite of this.favorites) {
        return favorite.recipe.label === item.recipe.label;
      }
    });
  };
}
