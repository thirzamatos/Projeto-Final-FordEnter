export interface Contato {
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipoContato: string;
  tipoMensagem: string;
  mensagem: string;
  termos: boolean;
  newsletter?: boolean;
}