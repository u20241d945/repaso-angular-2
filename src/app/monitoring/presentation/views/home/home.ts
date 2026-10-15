import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { WaterQualityStore } from '../../../application/stores/water-quality.store';
import { WaterQualitySummary } from '../../components/water-quality-summary/water-quality-summary';

/**
 * Presents the GWO home view and registered water quality records.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterLink, TranslatePipe, WaterQualitySummary],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  readonly store = inject(WaterQualityStore);

  /** Loads water quality records when the route is opened. */
  ngOnInit(): void {
    this.store.load();
  }
}
