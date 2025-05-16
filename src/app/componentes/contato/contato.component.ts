import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Contato } from '../interfaces/Contato';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  post(form: NgForm): void {
    if (form.valid) {
      const data: Contato = form.value;

      // Salvar no Local Storage
      this.salvarNoLocalStorage(data);

      // Mensagem de confirmação
      this.enviar(data);

      // ✅ Limpar o formulário
      form.resetForm();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  }

  enviar(data: Contato): void {
    alert(`Obrigado sr(a) ${data.nome}, os seus dados foram encaminhados com sucesso.`);
  }

  salvarNoLocalStorage(data: Contato): void {
    const contatosSalvos: Contato[] = JSON.parse(localStorage.getItem('contatos') || '[]');
    contatosSalvos.push(data);
    localStorage.setItem('contatos', JSON.stringify(contatosSalvos));
  }
}
