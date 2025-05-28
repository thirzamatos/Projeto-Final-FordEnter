import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { MenuComponent } from '../menu/menu.component';
import { Contato } from '../interfaces/Contato';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    MenuComponent,
    FooterComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  showSuccessMessage = false;
  showErrorMessage = false;
  submittedName = '';

  post(form: NgForm): void {

    console.log('Formulário enviado:');

    if (form.valid) {
      const data: Contato = form.value;

      // Salvar no Local Storage
      this.salvarNoLocalStorage(data);
      this.enviar(data);

      //Limpar o formulário
      form.resetForm();
    } else {
      this.showErrorMessage = true;
      setTimeout(() => this.closeMessage(), 5000);
    }
  }

  enviar(data: Contato): void {
    this.submittedName = data.nome;
    this.showSuccessMessage = true;
    setTimeout(() => this.closeMessage(), 7000);
  }

  closeMessage(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  salvarNoLocalStorage(data: Contato): void {
    const contatosSalvos: Contato[] = JSON.parse(localStorage.getItem('contatos') || '[]');
    contatosSalvos.push(data);
    localStorage.setItem('contatos', JSON.stringify(contatosSalvos));
  }


}
