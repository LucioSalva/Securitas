import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-e404',
  standalone: false,
  templateUrl: './e404.component.html',
  styleUrl: './e404.component.css'
})
export class E404Component implements OnInit, OnDestroy{

  ngOnInit() {
    document.body.classList.add('hide-navbar');
  }

  ngOnDestroy() {
    document.body.classList.remove('hide-navbar');
  }
}
