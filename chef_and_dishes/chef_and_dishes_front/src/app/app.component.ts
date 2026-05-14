import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChefsComponent } from './chefs/chefs.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ChefsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
