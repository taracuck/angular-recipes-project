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
      if (
        item.recipe.dietLabels.length !== 0 &&
        item.recipe.dietLabels !== null
      ) {
        dietMatches = item.recipe.dietLabels.some((label: any) => {
          console.log(label);
          console.log(this.filterObject.diet);
          return label.toLowerCase() === this.filterObject.diet.toLowerCase();
        });
      }
      if (
        item.recipe.healthLabels.length !== 0 &&
        item.recipe.healthLabels !== null
      ) {
        healthMatches = item.recipe.healthLabels.some((item: any) => {
          return item.toLowerCase() === this.filterObject.health.toLowerCase();
        });
      }
      // if there is a search term
      if (this.filterObject.searchTerm.length > 0) {
        // if both selects have been chosen
        console.log('search term entered');
        if (this.filterObject.diet !== '' && this.filterObject.health !== '') {
          console.log('both selects chosen');
          return (
            item.recipe.label.includes(this.filterObject.searchTerm) &&
            dietMatches &&
            healthMatches
          );
          // if only diet select has been chosen
        } else if (
          this.filterObject.diet !== '' &&
          this.filterObject.health === ''
        ) {
          console.log('only diet select chosen');
          return (
            item.recipe.label.includes(this.filterObject.searchTerm) &&
            dietMatches
          );
          // if only health select has been chosen
        } else if (
          this.filterObject.diet === '' &&
          this.filterObject.health !== ''
        ) {
          console.log('only health select chosen');
          return (
            item.recipe.label.includes(this.filterObject.searchTerm) &&
            healthMatches
          );
        } else {
          return item.recipe.label.includes(this.filterObject.searchTerm);
        }
        // no search term entered
      } else {
        console.log('search term not entered');
        // if both selects have been chosen
        if (this.filterObject.diet !== '' && this.filterObject.health !== '') {
          console.log('both selects chosen');
          return dietMatches && healthMatches;
          // if only diet select has been chosen
        } else if (
          this.filterObject.diet !== '' &&
          this.filterObject.health === ''
        ) {
          console.log('only diet select chosen');
          return dietMatches;
          // if only health select has been chosen
        } else if (
          this.filterObject.diet === '' &&
          this.filterObject.health !== ''
        ) {
          console.log('only health select chosen');
          return healthMatches;
        }
      }
    });
  };
}
