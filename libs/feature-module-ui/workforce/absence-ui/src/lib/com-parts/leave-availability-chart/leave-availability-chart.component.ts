import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IConcentriaData, ChartTypes } from '@nutela/shared/ui';
import { ILeaveEntitlement } from '@nutela/models/workforce/leave';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-absence-leave-availability-chart',
  templateUrl: './leave-availability-chart.component.html',
  styleUrls: ['./leave-availability-chart.component.scss']
})
export class LeaveAvailabilityChartComponent implements OnInit {
  @Input() public leaveEntitlements: ILeaveEntitlement[];

  carouselData: IConcentriaData[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['leaveEntitlements']) {
      if (this.leaveEntitlements) {
        this.carouselData = this.getCarouselData(this.leaveEntitlements);

        this.carouselData.sort((a, b) => a.rank - b.rank);
      }
    }
  }

  constructor(private util: UtilService) { }

  ngOnInit() {
  }

  getCarouselData(leaveEntitlements: ILeaveEntitlement[]): IConcentriaData[] {
    let list: IConcentriaData[] = [];
    let concentriaData: IConcentriaData;
    let concentriaDataType: ChartTypes;
    let concentriaItemWidth: number;
    let concentriaPercent: number;
    let concentriaAvailable: number;
    let concentriaRank: number;

    for (let item of leaveEntitlements) {
      if (item.is_annual) {
        concentriaDataType = ChartTypes.CONCENTRA;
        concentriaItemWidth = 400;
        concentriaRank = 0;
      } else {
        concentriaDataType = ChartTypes.CONCENTRI;
        concentriaItemWidth = 300;
        concentriaRank = 1;
      }

      concentriaPercent = item.total_days===0?0:Math.floor((item.used_days / item.total_days * 100));
      concentriaAvailable = (item.total_days - item.used_days);

      concentriaData = {
        headerText: item.description,
        type: concentriaDataType,
        width: concentriaItemWidth,
        percent: concentriaPercent,
        rank: concentriaRank,

        ring1Caption: "Available",
        ring2Caption: "Total",
        ring3Caption: "Used",

        dataPoint1: {
          value: concentriaAvailable,
          unitText: this.util.getNPText(concentriaAvailable, 'day', 'days', 'day')
        },
        dataPoint2: {
          value: item.total_days,
          unitText: this.util.getNPText(item.total_days, 'day', 'days', 'day')
        },
        dataPoint3: {
          value: item.used_days,
          unitText: this.util.getNPText(item.used_days, 'day', 'days', 'day')
        }
      }

      list.push(concentriaData);
    }

    return list;
  }

  isConcentra(item: IConcentriaData) {
    if (item.type === ChartTypes.CONCENTRA) {
      return true;
    } else {
      return false;
    }
  }

  customOptions: any = {
    autoWidth: true,
    loop: true,
    navText: ['', ''],
    items: '2',
    margin: 1,
    // slideBy: 'page',
    // merge: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
		// autoplaySpeed: 4000,
    dotsSpeed: 500,
    // dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    // stagePadding: 40,
    nav: true
  }
}
