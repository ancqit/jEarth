import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide/guide.component').then((m) => m.GuideComponent),
  },
  {
    path: 'guide/:slug',
    loadComponent: () =>
      import('./pages/article/article.component').then((m) => m.ArticleComponent),
  },
  {
    path: 'sort',
    loadComponent: () => import('./pages/sort-lab/sort-lab.component').then((m) => m.SortLabComponent),
  },
  {
    path: 'heroes',
    loadComponent: () => import('./pages/heroes/heroes.component').then((m) => m.HeroesComponent),
  },
  {
    path: 'mushrooms',
    loadComponent: () =>
      import('./pages/mushrooms/mushrooms.component').then((m) => m.MushroomsComponent),
  },
  { path: '**', redirectTo: '' },
];
