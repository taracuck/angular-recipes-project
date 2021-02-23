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
  filterObject: any;

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

  setFilterObject = (filterBy: any): void => {
    this.filterObject = filterBy;
  };

  filterFavorites = (): any[] => {
    if (this.filterObject === undefined) {
      return this.favorites;
    }
    return this.favorites.filter((item) => {
      let dietMatches!: boolean;
      let healthMatches!: boolean;

      // diet label
      if (
        item.recipe.dietLabels.length === 0 ||
        this.filterObject.diet === null
      ) {
        dietMatches = true;
      } else {
        dietMatches = item.recipe.dietLabels.some((label: any) => {
          return label
            .toLowerCase()
            .includes(this.filterObject.diet.toLowerCase());
        });
      }
      // health label
      if (
        item.recipe.healthLabels.length === 0 ||
        this.filterObject.health === null
      ) {
        healthMatches = true;
      } else {
        healthMatches = item.recipe.healthLabels.some((label: any) => {
          return label
            .toLowerCase()
            .includes(this.filterObject.health.toLowerCase());
        });
      }
      if (this.filterObject.searchTerm === null) {
        return dietMatches && healthMatches;
      } else {
        return (
          item.recipe.label
            .toLowerCase()
            .includes(this.filterObject.searchTerm.toLowerCase()) &&
          dietMatches &&
          healthMatches
        );
      }
    });
  };
}
