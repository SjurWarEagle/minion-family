import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, AfterViewInit {
  @ViewChild('all', { static: false })
  public allMinions: ElementRef;

  @ViewChild('minionArea', { static: false })
  public firstMinion: ElementRef;

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
    if (!this.firstMinion) {
      return;
    }
    // console.log('this.minions', this.firstMinion);
    const sizeMinion = this.firstMinion.nativeElement.getBoundingClientRect();
    // console.log('sizeMinion', sizeMinion);

    const size = this.allMinions.nativeElement.getBoundingClientRect();
    // console.log('allMinions size', size);
    const cols = Math.floor(size.width / sizeMinion.width);
    const rows = Math.floor(size.height / (sizeMinion.height + 60));
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
