import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User, UserStatus } from '../_models/user-model';
import { UsersService } from '../_services/users-service';

interface Toast {
  id: number;
  message: string;
  type: 'blocked' | 'activated';
}

const TOAST_DURATION_MS = 5000;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGES_WITHOUT_GAPS = 7;

const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const digitsOnly = (value: string): string => value.replace(/\D/g, '');

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private readonly usersService = inject(UsersService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly detailsDialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('detailsDialog');

  protected readonly users = signal<User[]>(this.usersService.getUsers());
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly selectedId = signal<number | null>(null);
  protected readonly selectedUser = computed(
    () => this.users().find((user) => user.id === this.selectedId()) ?? null,
  );

  protected readonly toasts = signal<Toast[]>([]);
  private nextToastId = 0;
  private readonly toastTimers = new Set<ReturnType<typeof setTimeout>>();

  protected readonly showCpf = signal(false);
  protected readonly cpfDisplay = computed(() => {
    const cpf = this.selectedUser()?.cpf ?? '';
    return this.showCpf() ? cpf : cpf.replace(/\d/g, '*');
  });

  private readonly query = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  protected readonly filteredUsers = computed(() => {
    const term = normalize(this.query().trim());
    const digits = digitsOnly(term);
    if (!term) {
      return this.users();
    }
    return this.users().filter(
      (user) =>
        normalize(user.name).includes(term) ||
        normalize(user.email).includes(term) ||
        (digits.length > 0 &&
          (digitsOnly(user.cpf).includes(digits) || digitsOnly(user.phone).includes(digits))),
    );
  });

  /* ---------- Paginação ---------- */
  protected readonly pageSizeOptions = [5, 10, 20];
  protected readonly pageSizeControl = new FormControl(DEFAULT_PAGE_SIZE, { nonNullable: true });
  private readonly pageSize = toSignal(this.pageSizeControl.valueChanges, {
    initialValue: DEFAULT_PAGE_SIZE,
  });

  /** Volta para a página 1 sempre que a pesquisa ou o tamanho da página mudar. */
  private readonly currentPage = linkedSignal({
    source: () => ({ query: this.query(), size: this.pageSize() }),
    computation: () => 1,
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize())),
  );

  protected readonly page = computed(() => Math.min(this.currentPage(), this.totalPages()));

  protected readonly pagedUsers = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });

  protected readonly range = computed(() => {
    const total = this.filteredUsers().length;
    const start = total === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1;
    return { start, end: Math.min(this.page() * this.pageSize(), total) };
  });

  /** Números das páginas a exibir; `null` representa reticências. */
  protected readonly pageItems = computed<(number | null)[]>(() => {
    const total = this.totalPages();
    const current = this.page();

    if (total <= MAX_PAGES_WITHOUT_GAPS) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    const numbers = [...new Set([1, current - 1, current, current + 1, total])]
      .filter((n) => n >= 1 && n <= total)
      .sort((a, b) => a - b);

    const items: (number | null)[] = [];
    numbers.forEach((n, index) => {
      const previous = numbers[index - 1];
      if (previous !== undefined && n - previous === 2) {
        items.push(previous + 1);
      } else if (previous !== undefined && n - previous > 2) {
        items.push(null);
      }
      items.push(n);
    });
    return items;
  });

  protected goToPage(target: number): void {
    this.currentPage.set(Math.min(Math.max(1, target), this.totalPages()));
  }

  constructor() {
    this.destroyRef.onDestroy(() => this.toastTimers.forEach((timer) => clearTimeout(timer)));
  }

  protected toggleBlock(id: number): void {
    const target = this.users().find((user) => user.id === id);
    if (!target) {
      return;
    }

    const nextStatus: UserStatus = target.status === 'active' ? 'blocked' : 'active';
    this.users.update((list) =>
      list.map((user) => (user.id === id ? { ...user, status: nextStatus } : user)),
    );

    this.showToast(
      nextStatus === 'blocked'
        ? { type: 'blocked', message: `${target.name} foi bloqueado.` }
        : { type: 'activated', message: `${target.name} foi ativado.` },
    );
  }

  protected dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  private showToast(toast: Omit<Toast, 'id'>): void {
    const id = this.nextToastId++;
    this.toasts.update((list) => [...list, { ...toast, id }]);

    const timer = setTimeout(() => {
      this.toastTimers.delete(timer);
      this.dismissToast(id);
    }, TOAST_DURATION_MS);
    this.toastTimers.add(timer);
  }

  protected initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }

  protected toggleCpf(): void {
    this.showCpf.update((visible) => !visible);
  }

  protected openDetails(id: number): void {
    this.selectedId.set(id);
    this.showCpf.set(false);
    this.detailsDialog().nativeElement.showModal();
  }

  protected closeDetails(): void {
    this.detailsDialog().nativeElement.close();
  }

  /** Fecha ao clicar no fundo escurecido (fora do card). */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeDetails();
    }
  }

  /** Disparado ao fechar por botão, Esc ou fundo. */
  protected onDialogClosed(): void {
    this.selectedId.set(null);
    this.showCpf.set(false);
  }
}