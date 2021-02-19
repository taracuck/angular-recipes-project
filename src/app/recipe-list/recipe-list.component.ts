import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: any;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getAndSetRecipes({});
    console.log(this.recipes);
  }

  getAndSetRecipes = (formObject: any): void => {
    this.recipeService.getRecipes(formObject).subscribe((response: any) => {
      this.recipes = response;
      console.log(response);
    });
  };
}
