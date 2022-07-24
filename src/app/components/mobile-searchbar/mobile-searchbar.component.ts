import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mobile-searchbar',
  templateUrl: './mobile-searchbar.component.html',
  styleUrls: ['./mobile-searchbar.component.scss']
})
export class MobileSearchbarComponent implements OnInit {

  @ViewChild('input') input: ElementRef
  @ViewChild('wrapper') wrapper: ElementRef

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (event.target !== this.input.nativeElement) {
        this.wrapper.nativeElement.classList.remove('active')
      } else {
        this.wrapper.nativeElement.classList.add('active')
      }
    })
  }

  ngOnInit(): void {
  }



}
