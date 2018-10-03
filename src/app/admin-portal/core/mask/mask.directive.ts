import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { text } from '@angular/core/src/render3/instructions';


@Directive({
  selector: '[bMask]'
})
export class MaskDirective implements OnInit {
  @Input() bMask: Observable<boolean>;
  @Input() bMessages: {[key: string]: string} = {};
  defaultMessage = 'Operation in progress';
  maskEl: any;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.bMask) {
      this.bMask.subscribe((busy) => this.mask(busy));
    }
  }

  mask (busy) {
    this.removeMask();
    if (busy) {
      this.addMask(busy);
    }
  }

  removeMask () {
    if (this.maskEl) {
      this.renderer.removeChild(this.el.nativeElement, this.maskEl);
      this.maskEl = null;
    }
  }
  addMask (busy: string) {
    const maskEl = this.maskEl = this.renderer.createElement('div');
    const messageEl = this.renderer.createElement('div');
    this.renderer.addClass(messageEl, 'mask-msg');
    const textEl = this.renderer.createText(this.bMessages[busy] || this.defaultMessage);
    const spinner = this.renderer.createElement('i');
    this.renderer.addClass(spinner, 'fa');
    this.renderer.addClass(spinner, 'fa-spin');
    this.renderer.addClass(spinner, 'fa-cog');

    this.renderer.appendChild(messageEl, spinner);
    this.renderer.appendChild(messageEl, textEl);
    this.renderer.appendChild(maskEl, messageEl);
    this.renderer.addClass(this.el.nativeElement, 'mask-parent');
    this.renderer.addClass(maskEl, 'mask');
    this.renderer.appendChild(this.el.nativeElement, maskEl);
  }
}
