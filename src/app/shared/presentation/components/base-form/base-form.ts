import { FormGroup } from '@angular/forms';

/**
 * Provides reusable validation helpers for reactive form views.
 *
 * @author u20241d945
 */
export abstract class BaseForm {
  /** Indicates whether a control is invalid after user interaction. */
  protected isInvalidControl(form: FormGroup, controlName: string): boolean {
    const control = form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}
