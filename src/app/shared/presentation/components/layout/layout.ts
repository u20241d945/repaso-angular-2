import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';

/**
 * Composes the shared application shell and routed content.
 *
 * @author u20241d945
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {}
