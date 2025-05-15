import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  cars: Car[] = [
    new Car('XL Cabine Simples 2.2 Diesel 4X4 MT 2022', 183850, 511, 1821, 232, 1234, '2.2', 160, 1420, 'Aço Estampado 16', 'http://localhost:4200/img/XL_Cabine.png'),
    new Car('XLS 2.2 Diesel 4X4 AT 2022', 220690, 511, 1821, 232, 1076, '2.2', 160, 1180, 'Aço Estampado 16', 'http://localhost:4200/img/xls2.2.png'),
    new Car('Storm 3.2 Diesel 4X4 AT 2022', 222790, 511, 1821, 232, 1040, '3.2', 200, 1180, 'Liga Leve 17', 'http://localhost:4200/img/storm.png')
  ];

  selectedCarsSet: Set<string> = new Set();
  selectedCar1: Car | null = null;
  selectedCar2: Car | null = null;
  showCompareFlag = false;

  SetCarToCompare(event: Event): void {
    const el = event.target as HTMLInputElement;
    const carName = el.getAttribute('data-car-name');
    if (!carName) return;

    if (el.checked) {
      if (this.selectedCarsSet.size >= 2) {
        alert("Você só pode comparar 2 carros por vez");
        el.checked = false;
        return;
      }
      this.selectedCarsSet.add(carName);
    } else {
      this.selectedCarsSet.delete(carName);
    }
  }

  ShowCompare(): void {
    if (this.selectedCarsSet.size < 2) {
      alert("Precisa marcar 2 carros para apresentar a comparação");
      return;
    }

    const selectedCars = this.cars.filter(car => this.selectedCarsSet.has(car.nome));
    this.selectedCar1 = selectedCars[0];
    this.selectedCar2 = selectedCars[1];
    this.showCompareFlag = true;

    this.cdr.detectChanges(); // força atualização da tela
  }

  HideCompare(): void {
    this.showCompareFlag = false;
    this.selectedCar1 = null;
    this.selectedCar2 = null;
    this.selectedCarsSet.clear();
  }
}

class Car {
  constructor(
    public nome: string,
    public preco: number,
    public alturaCacamba: number,
    public alturaVeiculo: number,
    public alturaSolo: number,
    public capacidadeCarga: number,
    public motor: string,
    public potencia: number,
    public volumeCacamba: number,
    public roda: string,
    public image: string
  ) {}
}
