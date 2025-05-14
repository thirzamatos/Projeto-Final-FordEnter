import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Vehicle, SelectedVehicleData } from '../interfaces/Dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule, 
    FormsModule, 
    MenuComponent
  ],
})

export class DashboardComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicleFromSelect: SelectedVehicleData | null = null;
  selectedVehicleFromSearch: SelectedVehicleData | null = null;
  searchVin: string = '';
  selectedId: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.apiService.getVehicles().subscribe({
      next: (res) => {
        this.vehicles = res.vehicles;
        console.log('Vehicles loaded by select:', this.vehicles);
      },
      error: (err) => console.error(err),
    });
  }

  searchByVin() {
    console.log('Searching for VIN:', this.searchVin);
    const vin = this.searchVin.trim();
    if (!vin) return;

    this.apiService.getVehicleData(vin).subscribe({
      next: (data) => {
        this.selectedVehicleFromSearch = data;
        console.log('Vehicle data:', data);
      },
      error: () => {
        this.selectedVehicleFromSearch = null;
        alert('Veículo não encontrado!');
      },

    });
  }

  onSelectChange() {
    const selected = this.vehicles.find(v => v.id.toString() === this.selectedId);
    if (selected) {
      this.apiService.getVehicleData(selected.vin).subscribe({
        next: (data) => {
          this.selectedVehicleFromSelect = data;
          console.log('Selected vehicle data:', data);
        },
        error: () => {
          this.selectedVehicleFromSelect = null;
          alert('Erro ao buscar o veículo.');
        },
      });
    }
  }
}
