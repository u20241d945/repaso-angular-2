import { Routes } from '@angular/router';

const home = () =>
  import('./presentation/views/home/home').then(module => module.Home);
const newWaterQualityRecord = () =>
  import('./presentation/views/new-water-quality-record/new-water-quality-record')
    .then(module => module.NewWaterQualityRecord);
const baseTitle = 'GWO Water Monitoring Platform';

/**
 * Defines the child routes owned by the monitoring bounded context.
 *
 * @author u20241d945
 */
export const monitoringRoutes: Routes = [
  { path: 'home', loadComponent: home, title: `${baseTitle} - Home` },
  {
    path: 'water-quality/new',
    loadComponent: newWaterQualityRecord,
    title: `${baseTitle} - New Water Quality Record`
  }
];
