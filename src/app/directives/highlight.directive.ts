import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  // 스타일에 클래스 highlight가 이미 정해져있을 때
  //   @HostListener('mouseenter')
  //   onMouseEnter() {
  //     (this.el.nativeElement as HTMLElement).classList.add('highlight');
  //   }

  //   @HostListener('mouseleave')
  //   onMouseLeve() {
  //     (this.el.nativeElement as HTMLElement).classList.remove('highlight');
  //   }

  // 여기서 바로 정할 때
  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('gold');
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    (this.el.nativeElement as HTMLElement).style.backgroundColor = color;
  }
}
