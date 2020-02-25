import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('all', { static: false })
  public allMinions: ElementRef;

  public svgContent: string;

  public nrMinions = [];

  public ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  @HostListener('window:resize')
  public recalc(): void {
    const size = this.allMinions.nativeElement.getBoundingClientRect();
    // console.log('allMinions', size);
    const heightOfMinionDisplay = 230 + 20; //icon+name
    const widthOfMinionDisplay = 210; //icon+name
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
    this.loadImage();
    this.recalc();
  }

  private async loadImage(): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    // noinspection UnnecessaryLocalVariableJS
    const content = await this.http
      .get('./assets/minions-svgrepo-com.svg', {
        headers,
        responseType: 'text'
      })
      .toPromise();
    // console.log('content=', content);
    this.svgContent = content;
  }
}
