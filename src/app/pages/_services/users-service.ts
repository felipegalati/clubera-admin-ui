import { Injectable } from '@angular/core';
import { User } from '../_models/user-model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  /** Dados mock. Troque por HttpClient quando a API do seu sistema estiver pronta. */
  getUsers(): User[] {
    return [
      { id: 1, name: 'Ana Beatriz Souza', email: 'ana.souza@email.com', cpf: '123.456.789-09', phone: '(11) 98765-4321', birthDate: '1992-03-14', createdAt: '2024-01-15T09:42:00', status: 'active' },
      { id: 2, name: 'Carlos Eduardo Lima', email: 'carlos.lima@email.com', cpf: '234.567.890-12', phone: '(21) 99876-1234', birthDate: '1985-11-02', createdAt: '2024-02-03T14:10:00', status: 'active' },
      { id: 3, name: 'Fernanda Oliveira', email: 'fe.oliveira@email.com', cpf: '345.678.901-23', phone: '(31) 97654-3210', birthDate: '1998-07-25', createdAt: '2024-03-21T18:05:00', status: 'blocked' },
      { id: 4, name: 'João Pedro Martins', email: 'joao.martins@email.com', cpf: '456.789.012-34', phone: '(41) 98888-7766', birthDate: '1990-01-30', createdAt: '2024-04-09T11:27:00', status: 'active' },
      { id: 5, name: 'Mariana Costa', email: 'mari.costa@email.com', cpf: '567.890.123-45', phone: '(51) 99123-4567', birthDate: '2001-09-09', createdAt: '2024-05-18T20:51:00', status: 'active' },
      { id: 6, name: 'Ricardo Almeida', email: 'ricardo.almeida@email.com', cpf: '678.901.234-56', phone: '(61) 98234-5678', birthDate: '1979-05-18', createdAt: '2024-06-02T08:33:00', status: 'active' },
      { id: 7, name: 'Patrícia Gomes', email: 'patricia.gomes@email.com', cpf: '789.012.345-67', phone: '(71) 99345-6789', birthDate: '1988-12-05', createdAt: '2024-07-14T16:20:00', status: 'blocked' },
      { id: 8, name: 'Lucas Ferreira', email: 'lucas.ferreira@email.com', cpf: '890.123.456-78', phone: '(81) 98456-7890', birthDate: '1995-04-22', createdAt: '2024-08-27T13:45:00', status: 'active' },
      { id: 9, name: 'Juliana Rocha', email: 'ju.rocha@email.com', cpf: '901.234.567-89', phone: '(85) 99567-8901', birthDate: '1993-08-11', createdAt: '2024-09-30T10:12:00', status: 'active' },
      { id: 10, name: 'Rafael Mendes', email: 'rafael.mendes@email.com', cpf: '012.345.678-90', phone: '(92) 98678-9012', birthDate: '1987-02-27', createdAt: '2024-11-05T19:38:00', status: 'active' },
      { id: 11, name: 'Camila Barbosa', email: 'camila.barbosa@email.com', cpf: '112.233.445-56', phone: '(11) 97789-0123', birthDate: '2000-06-16', createdAt: '2024-12-12T07:59:00', status: 'active' },
      { id: 12, name: 'Thiago Ribeiro', email: 'thiago.ribeiro@email.com', cpf: '223.344.556-67', phone: '(21) 98890-1234', birthDate: '1991-10-03', createdAt: '2025-01-20T15:24:00', status: 'blocked' },
      { id: 13, name: 'Beatriz Carvalho', email: 'bia.carvalho@email.com', cpf: '334.455.667-78', phone: '(31) 99901-2345', birthDate: '1996-01-21', createdAt: '2025-02-25T12:08:00', status: 'active' },
      { id: 14, name: 'Gustavo Nascimento', email: 'gustavo.n@email.com', cpf: '445.566.778-89', phone: '(41) 98012-3456', birthDate: '1983-07-07', createdAt: '2025-04-01T17:46:00', status: 'active' },
      { id: 15, name: 'Larissa Pinto', email: 'larissa.pinto@email.com', cpf: '556.677.889-90', phone: '(51) 97123-4567', birthDate: '1999-03-29', createdAt: '2025-05-16T09:15:00', status: 'active' },
      { id: 16, name: 'Felipe Araújo', email: 'felipe.araujo@email.com', cpf: '667.788.990-01', phone: '(61) 99234-5678', birthDate: '1989-09-13', createdAt: '2025-06-28T21:03:00', status: 'active' },
      { id: 17, name: 'Isabela Teixeira', email: 'isabela.t@email.com', cpf: '778.899.001-12', phone: '(71) 98345-6789', birthDate: '1994-11-26', createdAt: '2025-08-07T14:37:00', status: 'blocked' },
      { id: 18, name: 'Daniel Moreira', email: 'daniel.moreira@email.com', cpf: '889.900.112-23', phone: '(81) 99456-7890', birthDate: '1982-04-08', createdAt: '2025-09-19T10:50:00', status: 'active' },
      { id: 19, name: 'Aline Cardoso', email: 'aline.cardoso@email.com', cpf: '990.011.223-34', phone: '(85) 98567-8901', birthDate: '1997-12-19', createdAt: '2025-11-03T18:29:00', status: 'active' },
      { id: 20, name: 'Bruno Correia', email: 'bruno.correia@email.com', cpf: '101.112.223-45', phone: '(92) 99678-9012', birthDate: '1986-08-31', createdAt: '2026-01-12T08:14:00', status: 'active' },
    ];
  }
}