import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GithubRepo, PublicApisService, WikiSummary, WeatherNow } from '../../core/public-apis.service';
import { GUIDE_ARTICLES } from '../../data/catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly publicApis = inject(PublicApisService);
  readonly chapters = GUIDE_ARTICLES;
  readonly wiki = signal<WikiSummary | null>(null);
  readonly climate = signal<WeatherNow | null>(null);
  readonly repos = signal<GithubRepo[]>([]);

  ngOnInit(): void {
    this.publicApis.wiki('Waste_management').subscribe((row) => this.wiki.set(row));
    this.publicApis.climate(12.9716, 77.5946).subscribe((row) => this.climate.set(row));
    forkJoin({
      waste: this.publicApis.githubRepos('topic:recycling topic:waste-management'),
      compost: this.publicApis.githubRepos('compost mushroom cultivation'),
    }).subscribe(({ waste, compost }) => {
      const seen = new Set<number>();
      const merged: GithubRepo[] = [];
      for (const repo of [...waste, ...compost]) {
        if (seen.has(repo.id)) {
          continue;
        }
        seen.add(repo.id);
        merged.push(repo);
      }
      this.repos.set(merged.slice(0, 8));
    });
  }
}
