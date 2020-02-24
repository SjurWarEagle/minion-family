import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('all', {static: false})
  public allMinions: ElementRef;

  public nrMinions = [];

  public ngOnInit(): void {
  }

  @HostListener('window:resize')
  public recalc(): void {
    const size = this.allMinions.nativeElement.getBoundingClientRect();
    // console.log('allMinions', size);
    const heightOfMinionDisplay = 230 + 20;//icon+name
    const widthOfMinionDisplay = 210;//icon+name
    const cols = Math.floor(size.width / widthOfMinionDisplay);
    const rows = Math.floor(size.height / heightOfMinionDisplay);
    const cnt = cols * rows;
    // console.log('cols', cols);
    // console.log('rows', rows);
    // console.log('cnt', cnt);
    setTimeout(() => {
      this.nrMinions = Array(cnt)
        .fill(0)
        .map((x, i) => i);
    });
  }

  public ngAfterViewInit(): void {
    this.recalc();
  }

}
