import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDE_ARTICLES } from '../../data/catalog';

@Component({
  selector: 'app-guide',
  imports: [RouterLink],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent {
  readonly articles = GUIDE_ARTICLES;
}
