import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STYLE_ARTICLES } from '../../data/style-guide';

@Component({
  selector: 'app-style-guide',
  imports: [RouterLink],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss',
})
export class StyleGuideComponent implements OnInit {
  readonly articles = STYLE_ARTICLES;
  readonly rawUrl = signal('/style.md');

  ngOnInit(): void {
    /* index only */
  }
}
