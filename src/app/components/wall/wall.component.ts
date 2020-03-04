import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit, AfterViewInit {
  @ViewChild('all', { static: false })
  public allMinions: ElementRef;

  public minionSizeToUse: number = 200;

  public pixelHeight: number = 768;
  public pixelWidth: number = 1024;
  public nrMinionsHeight: number = 5;
  public nrMinionsWidth: number = 5;
  public svgContent: string;

  public nrMinions = [1];

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.loadImage().then(() => {
      this.recalc();
    });
  }

  constructor(private http: HttpClient) {}

  @HostListener('window:resize')
  public recalc(): void {
    if (!this.allMinions || !this.allMinions.nativeElement) {
      return;
    }
    const size = this.allMinions.nativeElement.getBoundingClientRect();
    this.pixelHeight = size.height;
    this.pixelWidth = size.width;
    // console.log('allMinions size', size);
    this.nrMinionsWidth = Math.floor(size.width / this.minionSizeToUse);
    this.nrMinionsHeight = Math.floor(size.height / this.minionSizeToUse);
    const cnt = this.nrMinionsWidth * this.nrMinionsHeight;
    // console.log('cols', cols);
    // console.log('rows', rows);
    // console.log('cnt', cnt);
    setTimeout(() => {
      this.nrMinions = Array(cnt)
        .fill(0)
        .map((x, i) => i);
    });
  }

  private async loadImage(): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    // noinspection UnnecessaryLocalVariableJS
    const content = await this.http
      .get('./assets/minions-svgrepo-com.svg', {
        headers,
        responseType: 'text',
      })
      .toPromise();
    // console.log('content=', content);
    this.svgContent = content;
  }
}
