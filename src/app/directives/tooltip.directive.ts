// src/app/directives/tooltip.directive.ts

import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle!: string;
  private tooltipEl?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  show(): void {
    if (this.tooltipEl) return;

    const tooltip = this.renderer.createElement('span');
    tooltip.innerText = this.tooltipTitle;
    this.renderer.setStyle(tooltip, 'position', 'absolute');
    this.renderer.setStyle(tooltip, 'padding', '4px 8px');
    this.renderer.setStyle(tooltip, 'background', '#333');
    this.renderer.setStyle(tooltip, 'color', '#fff');
    this.renderer.setStyle(tooltip, 'borderRadius', '4px');
    this.renderer.setStyle(tooltip, 'fontSize', '12px');
    this.renderer.appendChild(document.body, tooltip);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tipPos = tooltip.getBoundingClientRect();
    const top = hostPos.bottom + window.scrollY + 8;
    const left = hostPos.left + window.scrollX + (hostPos.width - tipPos.width) / 2;

    this.renderer.setStyle(tooltip, 'top', `${top}px`);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);

    this.tooltipEl = tooltip;
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = undefined;
    }
  }
}
