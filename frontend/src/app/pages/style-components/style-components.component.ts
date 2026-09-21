import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Legacy path — send visitors to the brand book Components section. */
@Component({
  selector: 'app-style-components',
  template: '',
})
export class StyleComponentsComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    void this.router.navigateByUrl('/style#components');
  }
}
