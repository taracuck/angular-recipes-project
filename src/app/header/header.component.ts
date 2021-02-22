import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Output() tabClickEvent = new EventEmitter<string>();
  clicked: string = 'home';
  homeTab: string = 'home';
  favoritesTab: string = 'favorites';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  changeClicked = (tab: string): void => {
    this.recipeService.setClicked(tab);
  };

  checkClicked = (tab: string): boolean => {
    return this.recipeService.getClicked() === tab;
  };
}
