import { 
  ComponentFactoryResolver, 
  ComponentRef, 
  Directive, 
  ElementRef, 
  Injector, 
  Input,
  ApplicationRef, 
  HostListener,
  EmbeddedViewRef,
  OnDestroy} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {

  @Input() tooltip = '';

  @Input() tooltipDelay = 1000;

  private tooltipShowTimer: ReturnType<typeof setTimeout> | null = null;

  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) { 
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null)  {
      const componentFactory = 
        this.componentFactoryResolver.resolveComponentFactory(
          TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = 
        (this.componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.tooltipShowTimer = setTimeout(() => {
        this.setTooltipComponentProperties();
      }, this.tooltipDelay);
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      const {left, right, bottom} = 
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
      this.componentRef.instance.visible = true;
      this.tooltipShowTimer = null;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      if (this.tooltipShowTimer) {
        clearTimeout(this.tooltipShowTimer);
        this.tooltipShowTimer = null;
      }
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

}
