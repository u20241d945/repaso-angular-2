import { Component, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * Displays the GWO brand, primary navigation, and language selector.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  private readonly translate = inject(TranslateService);
  readonly currentLanguage = signal<'en' | 'es'>('en');

  /** Changes the language used by the interface. */
  selectLanguage(language: 'en' | 'es'): void {
    this.currentLanguage.set(language);
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
