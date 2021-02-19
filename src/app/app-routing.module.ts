import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/recipe-list', pathMatch: 'full' }, // redirect to `first-c
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 pag
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
