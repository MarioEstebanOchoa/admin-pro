import { Component, OnInit, Input } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficadona',
  templateUrl: './graficadona.component.html',
  styles: [
  ]
})
export class GraficadonaComponent implements OnInit {

  @Input()

  @Input() public chartLabels: Label[] = [];
  @Input() public chartData: SingleDataSet = [];
  @Input() public chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
