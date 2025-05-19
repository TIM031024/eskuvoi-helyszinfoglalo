import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
  standalone: true
})
export class AutoScrollDirective implements AfterViewInit, OnDestroy {
  private observer!: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver(() => this.scrollToBottom());
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  private scrollToBottom() {
    const nativeEl = this.el.nativeElement;
    nativeEl.scrollTop = nativeEl.scrollHeight;
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
