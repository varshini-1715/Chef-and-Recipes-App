
import { Routes } from '@angular/router';
import { ChefsComponent } from './chefs/chefs.component';
import { DishesComponent } from './dishes/dishes.component';
import { RecipesComponent } from './recipes/recipes.component';

// Export the routes constant so it can be imported elsewhere
export const routes: Routes = [
  { path: 'chefs', component: ChefsComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '', redirectTo: '/chefs', pathMatch: 'full' }
];
