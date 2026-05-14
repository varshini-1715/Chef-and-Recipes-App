import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchTerm: string = '';
  newRecipe = { name: '' };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data;
      this.filterRecipes();
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter(r =>
      r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addRecipe(): void {
    if(this.newRecipe.name) {
      this.recipeService.addRecipe(this.newRecipe).subscribe(() => {
        this.newRecipe.name = '';
        this.loadRecipes();
      });
    }
  }

  deleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id).subscribe(() => this.loadRecipes());
  }
}
