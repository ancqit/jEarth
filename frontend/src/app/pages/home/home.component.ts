import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDE_ARTICLES } from '../../data/catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly chapters = GUIDE_ARTICLES;
}
