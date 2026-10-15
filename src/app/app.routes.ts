import { Routes } from '@angular/router';

const monitoringRoutes = () =>
  import('./monitoring/monitoring.routes').then(module => module.monitoringRoutes);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(module => module.PageNotFound);
const baseTitle = 'GWO Water Monitoring Platform';

/**
 * Defines the root navigation routes.
 *
 * @author u20241d945
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', loadChildren: monitoringRoutes },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];
