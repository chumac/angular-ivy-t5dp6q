import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[xngLet]'
})
export class LetDirective<T> {
  private _context: LetContext<T> = { xngLet: null };

  constructor(
    _viewContainer: ViewContainerRef,
    _templateRef: TemplateRef<LetContext<T>>
  ) {
    _viewContainer.createEmbeddedView(_templateRef, this._context);
  }

  @Input()
  set xngLet(value: T) {
    this._context.xngLet = value;
  }
}

interface LetContext<T> {
  xngLet: T | null;
}
