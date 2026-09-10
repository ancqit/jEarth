import { Component } from '@angular/core';
import { WASTE_HEROES } from '../../data/heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  readonly heroes = WASTE_HEROES;
}
