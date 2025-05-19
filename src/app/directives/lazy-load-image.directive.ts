import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]',
  standalone: true
})
export class LazyLoadImageDirective implements OnInit {
  @Input() appLazyLoadImage?: string;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    if (!this.appLazyLoadImage) {
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = this.el.nativeElement;
          img.src = this.appLazyLoadImage!;
          this.observer.disconnect();
        }
      });
    });
    this.observer.observe(this.el.nativeElement);
  }
}
