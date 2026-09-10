import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GithubRepo, PublicApisService, WikiSummary } from '../../core/public-apis.service';
import { GUIDE_ARTICLES } from '../../data/catalog';

@Component({
  selector: 'app-guide',
  imports: [RouterLink],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent implements OnInit {
  private readonly publicApis = inject(PublicApisService);
  readonly articles = GUIDE_ARTICLES;
  readonly wiki = signal<WikiSummary | null>(null);
  readonly repos = signal<GithubRepo[]>([]);

  ngOnInit(): void {
    this.publicApis.wiki('Source_separation').subscribe((row) => this.wiki.set(row));
    this.publicApis
      .githubRepos('waste segregation compost recycling')
      .subscribe((rows) => this.repos.set(rows));
  }
}
