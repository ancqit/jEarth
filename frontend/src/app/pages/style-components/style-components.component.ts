import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Live Components chapter — mirrors brand book #components
 * (preview/index.html#components): buttons, form, card, footer, map chrome.
 */
@Component({
  selector: 'app-style-components',
  imports: [RouterLink],
  templateUrl: './style-components.component.html',
  styleUrl: './style-components.component.scss',
})
export class StyleComponentsComponent {
  readonly year = new Date().getFullYear();
}
