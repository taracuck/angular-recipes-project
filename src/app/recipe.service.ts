import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  q: string = 'recipe';
  appId: string = '2bbfa90b';
  appKey: string = 'dcb627cfa91673ed87b104d8e01160d8';
  limit: string = '50';
  recipeSearchUrl: string = 'https://api.edamam.com/search';

  constructor(private http: HttpClient) {}

  getRecipes = (formObject: any): any => {
    console.log(formObject);
    let params: any = {
      q: 'recipe',
      app_id: this.appId,
      app_key: this.appKey,
      to: this.limit,
    };
    if (formObject.searchTerm) {
      params.q = formObject.searchTerm;
    }
    if (formObject.diet) {
      params.diet = formObject.diet;
    }
    return this.http.get(this.recipeSearchUrl, {
      params: params,
    });
  };
}