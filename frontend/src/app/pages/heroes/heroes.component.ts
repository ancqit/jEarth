import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HeroLive, PublicApisService } from '../../core/public-apis.service';
import { WASTE_HEROES } from '../../data/heroes';
import { WasteHero } from '../../models/guide.model';

@Component({
  selector: 'app-heroes',
  imports: [DecimalPipe],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  private readonly publicApis = inject(PublicApisService);
  readonly heroes = WASTE_HEROES;
  readonly live = signal<Record<string, HeroLive>>({});
  readonly liveNote = signal('Loading REST Countries, World Bank CO₂, and Wikipedia…');

  ngOnInit(): void {
    const requests = Object.fromEntries(
      this.heroes.map((hero) => [hero.iso2, this.publicApis.heroLive(hero.queryName, hero.iso3, hero.wiki)]),
    );
    forkJoin(requests).subscribe((bundle) => {
      this.live.set(bundle);
      const filled = Object.values(bundle).filter((row) => row.flag || row.wiki).length;
      this.liveNote.set(
        filled
          ? `Live public data on ${filled} countries: REST Countries flags & population, World Bank CO₂ per capita, Wikipedia extracts. No API keys.`
          : 'Public country APIs did not respond. The operating notes below still stand.',
      );
    });
  }

  stats(hero: WasteHero): HeroLive | undefined {
    return this.live()[hero.iso2];
  }
}
