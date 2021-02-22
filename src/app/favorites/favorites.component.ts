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
    // console.log(formObject);
    console.log(this.favorites);

    if (this.filterObject === undefined) {
      return this.favorites;
    }

    return this.favorites.filter((item) => {
      let dietMatches!: boolean;
      let healthMatches!: boolean;
      // dietMatches = this.favorites.some((item) => {
      if (item.recipe.dietLabels.length !== 0) {
        for (let label of item.recipe.dietLabels) {
          console.log(label);
          console.log(this.filterObject.diet);
          if (label === this.filterObject.diet) {
            dietMatches = true;
          } else {
            dietMatches = false;
          }
        }
      }
      if (item.recipe.healthLabels.length !== 0) {
        for (let label of item.recipe.healthLabels) {
          console.log(label);
          console.log(this.filterObject.health);
          if (label === this.filterObject.health) {
            healthMatches = true;
          } else {
            healthMatches = false;
          }
        }
      }
      console.log(healthMatches);

      return (
        item.recipe.label.includes(this.filterObject.searchTerm) ||
        dietMatches ||
        healthMatches
      );
    });
  };

  // this.recipeService.getRecipes(formObject).subscribe((response: any) => {
  //   this.filteredRecipes = response;
  //   console.log(response);
  // });
  // console.log(this.filteredRecipes);
  // this.favorites = this.filteredRecipes.filter((item): any => {
  //   for (let favorite of this.favorites) {
  //     return favorite.recipe.label.includes(item.recipe.label);
  //   }
  // });
}
