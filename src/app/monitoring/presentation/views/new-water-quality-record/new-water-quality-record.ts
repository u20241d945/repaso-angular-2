import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { WaterQualityStore } from '../../../application/stores/water-quality.store';
import { WaterMonitoringStation, WaterType } from '../../../domain/model/water-monitoring-station.entity';
import { WaterQualityItem } from '../../../domain/model/water-quality-item.entity';
import { CreateWaterQualityItemRequest } from '../../../infrastructure/requests/create-water-quality-item.request';
import { MonitoringApiService } from '../../../infrastructure/services/monitoring-api.service';
import { RegionalOperatorStore } from '../../../../water/application/stores/regional-operator.store';
import { WATER_REGION_BY_TYPE } from '../../../../water/domain/model/water-region';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';

/**
 * Presents the form used to register an international water quality record.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-new-water-quality-record',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslatePipe
  ],
  templateUrl: './new-water-quality-record.html',
  styleUrl: './new-water-quality-record.css'
})
export class NewWaterQualityRecord extends BaseForm implements OnInit {
  private readonly api = inject(MonitoringApiService);
  private readonly waterQualityStore = inject(WaterQualityStore);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly operatorStore = inject(RegionalOperatorStore);
  readonly stations = signal<WaterMonitoringStation[]>([]);
  readonly indicators = signal<WaterQualityItem | null>(null);
  readonly loadingIndicators = signal(false);
  readonly saving = signal(false);
  readonly waterTypes: WaterType[] = [
    'river',
    'lake',
    'groundwater',
    'rainwater',
    'glacier',
    'desalination'
  ];

  readonly form = new FormGroup({
    waterType: new FormControl<WaterType | ''>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    operatorId: new FormControl<number | null>(null, Validators.required)
  });

  readonly validIndicators = computed(() => this.indicators()?.isValid ?? false);

  /** Loads selectable stations and regional operators. */
  ngOnInit(): void {
    this.operatorStore.load();
    this.api.getStations()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(stations => this.stations.set(stations));

    this.form.controls.waterType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(waterType => this.loadIndicators(waterType));
  }

  /** Returns the water region associated with the selected water type. */
  associatedRegion(): string {
    const waterType = this.form.controls.waterType.value;
    return waterType ? WATER_REGION_BY_TYPE[waterType] : '';
  }

  /** Indicates whether the current form can be submitted. */
  canCreate(): boolean {
    return this.form.valid && this.validIndicators() && !this.saving();
  }

  /** Creates a validated water quality record and returns to Home. */
  create(): void {
    this.form.markAllAsTouched();
    if (!this.canCreate()) return;

    const waterType = this.form.controls.waterType.value as WaterType;
    const operatorId = this.form.controls.operatorId.value as number;
    const operator = this.operatorStore.findById(operatorId);
    const station = this.stations().find(item => item.waterType === waterType);
    const indicators = this.indicators();

    if (!operator || !station || !indicators) return;

    const request: CreateWaterQualityItemRequest = {
      stationId: station.id,
      waterType,
      regionCode: operator.regionCode,
      regionName: operator.regionName,
      consumptionLevel: indicators.consumptionLevel,
      qualityIndex: indicators.qualityIndex,
      year: indicators.year,
      registeredAt: new Date().toISOString()
    };

    this.saving.set(true);
    this.waterQualityStore.create(request)
      .pipe(
        finalize(() => this.saving.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.snackBar.open(this.translate.instant('new-record.create-success'), undefined, {
            duration: 2500
          });
          void this.router.navigateByUrl('/home');
        },
        error: () => this.snackBar.open(this.translate.instant('new-record.create-error'), undefined, {
          duration: 3500
        })
      });
  }

  /** Discards the form and returns to Home. */
  cancel(): void {
    void this.router.navigateByUrl('/home');
  }

  /** Loads automatic indicators from the simulated backend. */
  private loadIndicators(waterType: WaterType | ''): void {
    this.indicators.set(null);
    if (!waterType) return;

    this.loadingIndicators.set(true);
    this.api.getLatestIndicators(waterType)
      .pipe(
        finalize(() => this.loadingIndicators.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(indicators => this.indicators.set(indicators));
  }
}
