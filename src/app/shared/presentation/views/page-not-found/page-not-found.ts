import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Presents a recovery view when the requested route does not exist.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  readonly requestedPath = inject(Router).url;
}
