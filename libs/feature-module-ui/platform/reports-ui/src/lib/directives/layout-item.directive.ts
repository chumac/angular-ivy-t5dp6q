import {
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { BarChartComponent } from '../components/report-dashboard/comp-cards/bar-chart/bar-chart.component';
import { PieChartComponent } from '../components/report-dashboard/comp-cards/pie-chart/pie-chart.component';
import { LineChartComponent } from '../components/report-dashboard/comp-cards/line-chart/line-chart.component';
const components = {
  barchart: BarChartComponent,
  piechart: PieChartComponent,
  linechart: LineChartComponent
};
@Directive({
  selector: '[appLayoutItem]'
})
export class LayoutItemDirective implements OnChanges {
  @Input() componentRef: string;
  component: ComponentRef<any>;

  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }
  ngOnChanges(): void {
    const component = components[this.componentRef];

    if (component) {
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
    }
  }
}
