import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
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
