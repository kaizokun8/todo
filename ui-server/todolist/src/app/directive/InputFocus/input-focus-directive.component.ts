/**
 * Created by jbe on 07/02/2022
 */

import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[myFocus]'
})

export class InputFocusDirective implements AfterViewInit {

  constructor(private input: ElementRef<HTMLInputElement>) {
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

}
