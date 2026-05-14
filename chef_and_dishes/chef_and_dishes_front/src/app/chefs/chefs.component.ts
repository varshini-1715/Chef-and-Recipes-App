import { Component, OnInit } from '@angular/core';
import { ChefService } from '../services/chef.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chefs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs: any[] = [];
  filteredChefs: any[] = [];
  searchTerm: string = '';
  newChef = { name: '', specialty: '' };

  constructor(private chefService: ChefService) {}

  ngOnInit(): void {
    this.loadChefs();
    console.log('ChefsComponent initialized');
  }

  loadChefs(): void {
    this.chefService.getAllChefs().subscribe((data: any[]) => {
      this.chefs = data;
      this.filterChefs();
    });
  }

  filterChefs(): void {
    this.filteredChefs = this.chefs.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addChef(): void {
    if(this.newChef.name && this.newChef.specialty) {
      this.chefService.addChef(this.newChef).subscribe(() => {
        this.newChef = { name: '', specialty: '' };
        this.loadChefs();
      });
    }
  }

  deleteChef(id: number): void {
    this.chefService.deleteChef(id).subscribe(() => this.loadChefs());
  }
}
