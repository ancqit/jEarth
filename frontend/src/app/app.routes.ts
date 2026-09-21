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
    data: { book: 'guide' },
  },
  {
    path: 'style',
    loadComponent: () =>
      import('./pages/style-guide/style-guide.component').then((m) => m.StyleGuideComponent),
  },
  {
    path: 'style/components',
    loadComponent: () =>
      import('./pages/style-components/style-components.component').then(
        (m) => m.StyleComponentsComponent,
      ),
  },
  {
    path: 'style/:slug',
    loadComponent: () =>
      import('./pages/article/article.component').then((m) => m.ArticleComponent),
    data: { book: 'style' },
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
    path: 'nearby',
    loadComponent: () => import('./pages/nearby/nearby.component').then((m) => m.NearbyComponent),
  },
  {
    path: 'mushrooms',
    loadComponent: () =>
      import('./pages/mushrooms/mushrooms.component').then((m) => m.MushroomsComponent),
  },
  { path: '**', redirectTo: '' },
];
