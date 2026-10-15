import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { WaterQualityItem } from '../../../domain/model/water-quality-item.entity';

/**
 * Displays the summary of one water quality record in a Material card.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-water-quality-summary',
  imports: [DatePipe, MatCardModule, TranslatePipe],
  templateUrl: './water-quality-summary.html',
  styleUrl: './water-quality-summary.css'
})
export class WaterQualitySummary {
  readonly item = input.required<WaterQualityItem>();
}
