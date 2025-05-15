import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent
  ],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent {
  carArr: Car[] = [];

  SetCarToCompare(el: HTMLInputElement, carClass: Car): void {
    if (carClass instanceof Car) {
      if (el.checked) {
        if (this.carArr.length >= 2) {
          alert("Você só pode comparar 2 carros por vez");
          el.checked = false;
          return;
        }
        this.carArr.push(carClass);
      } else {
        const index = this.GetCarArrPosition(this.carArr, carClass);
        if (index !== -1) {
          this.carArr.splice(index, 1);
        }
      }
    } else {
      throw "You need to set a Car instance";
    }
  }

  GetCarArrPosition(arr: Car[], carClass: Car): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].nome === carClass.nome) return i;
    }
    return -1;
  }

  ShowCompare(): void {
    if (this.carArr.length < 2) {
      alert("Precisa marcar 2 carros para apresentar a comparação");
      return;
    }

    this.UpdateCompareTable();
    document.getElementById("compare")!.style.display = "block";
    document.getElementById("overlay")!.style.display = "block";
  }

  HideCompare(): void {
    document.getElementById("compare")!.style.display = "none";
    document.getElementById("overlay")!.style.display = "none";
  }

  UpdateCompareTable(): void {
    const car1 = this.carArr[0];
    const car2 = this.carArr[1];

    if (!car1 || !car2) {
      console.error("Car data is missing.");
      return;
    }

    const setInnerText = (id: string, text: string) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
    };

    const setImage = (id: string, src: string, alt: string) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `<img src="${src}" alt="${alt}" style="width:100px;">`;
    };

    setImage("compare_image_0", car1.image, car1.nome);
    setImage("compare_image_1", car2.image, car2.nome);

    setInnerText("compare_modelo_0", car1.nome);
    setInnerText("compare_modelo_1", car2.nome);

    setInnerText("compare_alturacacamba_0", `${car1.alturaCacamba} mm`);
    setInnerText("compare_alturacacamba_1", `${car2.alturaCacamba} mm`);

    setInnerText("compare_alturaveiculo_0", `${car1.alturaVeiculo} mm`);
    setInnerText("compare_alturaveiculo_1", `${car2.alturaVeiculo} mm`);

    setInnerText("compare_alturasolo_0", `${car1.alturaSolo} mm`);
    setInnerText("compare_alturasolo_1", `${car2.alturaSolo} mm`);

    setInnerText("compare_capacidadecarga_0", `${car1.capacidadeCarga} kg`);
    setInnerText("compare_capacidadecarga_1", `${car2.capacidadeCarga} kg`);

    setInnerText("compare_motor_0", car1.motor);
    setInnerText("compare_motor_1", car2.motor);

    setInnerText("compare_potencia_0", `${car1.potencia} cv`);
    setInnerText("compare_potencia_1", `${car2.potencia} cv`);

    setInnerText("compare_volumecacamba_0", `${car1.volumeCacamba} L`);
    setInnerText("compare_volumecacamba_1", `${car2.volumeCacamba} L`);

    setInnerText("compare_roda_0", `${car1.roda}`);
    setInnerText("compare_roda_1", `${car2.roda}`);
    
    setInnerText("compare_preco_0", `R$ ${car1.preco.toLocaleString('pt-BR')}`);
    setInnerText("compare_preco_1", `R$ ${car2.preco.toLocaleString('pt-BR')}`);

    // Limpa os checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => (checkbox as HTMLInputElement).checked = false);

    this.carArr = [];
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
