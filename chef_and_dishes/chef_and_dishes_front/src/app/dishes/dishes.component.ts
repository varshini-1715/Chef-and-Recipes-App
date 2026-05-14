import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: any[] = [];
  recipes: any[] = [];
  filteredDishes: any[] = [];
  searchTerm: string = '';

  newDish = { name: '', type: '', recipeId: 0 };

  constructor(
    private dishService: DishService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadDishes();
    this.loadRecipes();
  }

  loadDishes(): void {
    this.dishService.getAllDishes().subscribe((data: any[]) => {
      this.dishes = data;
      this.filterDishes();
    });
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data;
    });
  }

  filterDishes(): void {
    this.filteredDishes = this.dishes.filter(d =>
      d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addDish(): void {
    if (this.newDish.name && this.newDish.type && this.newDish.recipeId) {
      this.dishService.addDish(this.newDish).subscribe(() => {
        this.newDish = { name: '', type: '', recipeId: 0 };
        this.loadDishes();
      });
    }
  }

  deleteDish(id: number): void {
    this.dishService.deleteDish(id).subscribe(() => this.loadDishes());
  }

  getRecipeName(recipeId: number): string {
    const recipe = this.recipes.find(r => r.id === recipeId);
    return recipe ? recipe.name : 'Unknown';
  }
}
