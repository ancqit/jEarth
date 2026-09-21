import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { STYLE_ARTICLES } from '../../data/style-guide';

@Component({
  selector: 'app-style-guide',
  imports: [RouterLink],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss',
})
export class StyleGuideComponent implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);

  readonly articles = STYLE_ARTICLES;
  readonly rawUrl = signal('/style.md');
  readonly year = new Date().getFullYear();

  readonly swatches = [
    { name: 'Forest', hex: '#194b31', meta: '#194b31 · 25 75 49' },
    { name: 'Forest mid', hex: '#17633e', meta: '#17633e · 23 99 62' },
    { name: 'Forest bright', hex: '#1f7a4c', meta: '#1f7a4c · 31 122 76' },
    { name: 'Forest deep', hex: '#103d29', meta: '#103d29 · 16 61 41' },
    { name: 'Gold', hex: '#f3d782', meta: '#f3d782 · 243 215 130' },
    { name: 'Gold soft', hex: '#f7e9b8', meta: '#f7e9b8 · 247 233 184' },
    { name: 'Gold deep', hex: '#d4b75e', meta: '#d4b75e · 212 183 94' },
    { name: 'Gold ink', hex: '#8a6f1f', meta: '#8a6f1f · 138 111 31' },
    { name: 'Paper', hex: '#f4f0e6', meta: '#f4f0e6 · 244 240 230' },
    { name: 'Paper deep', hex: '#ebe4d4', meta: '#ebe4d4 · 235 228 212' },
    { name: 'Surface', hex: '#fffdf8', meta: '#fffdf8 · 255 253 248' },
    { name: 'Ink', hex: '#0f1f17', meta: '#0f1f17 · 15 31 23' },
    { name: 'Ink soft', hex: '#3d5248', meta: '#3d5248 · 61 82 72' },
    { name: 'Mute', hex: '#6b7c72', meta: '#6b7c72 · 107 124 114' },
    { name: 'Danger', hex: '#92400e', meta: '#92400e · 146 64 14' },
    { name: 'Paper (website)', hex: '#f5f3ee', meta: '#f5f3ee shell only' },
  ];

  ngOnInit(): void {
    /* brand book index */
  }

  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      queueMicrotask(() => {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
}
