export type UserStatus = 'active' | 'blocked';

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  /** Formato ISO (yyyy-MM-dd) */
  birthDate: string;
  /** Data e hora do cadastro no sistema principal (ISO: yyyy-MM-ddTHH:mm:ss) */
  createdAt: string;
  status: UserStatus;
}