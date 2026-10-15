import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { RegionalOperator } from '../../domain/model/regional-operator.entity';
import { RegionalOperatorApiService } from '../../infrastructure/services/regional-operator-api.service';

/**
 * Manages regional operator state with Angular Signals.
 *
 * @author u20241d945
 */
@Injectable({ providedIn: 'root' })
export class RegionalOperatorStore {
  private readonly api = inject(RegionalOperatorApiService);
  private readonly operatorsSignal = signal<RegionalOperator[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);

  readonly operators = this.operatorsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly hasError = this.errorSignal.asReadonly();

  /** Loads regional operators from DummyJSON. */
  load(): void {
    if (this.operatorsSignal().length > 0 || this.loadingSignal()) return;
    this.loadingSignal.set(true);
    this.errorSignal.set(false);
    this.api.getAll()
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: operators => this.operatorsSignal.set(operators),
        error: () => this.errorSignal.set(true)
      });
  }

  /** Finds one operator by its identifier. */
  findById(id: number): RegionalOperator | undefined {
    return this.operatorsSignal().find(operator => operator.id === id);
  }
}
