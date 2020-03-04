import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent implements OnInit {
  public pixelHeight: number = 768;
  public pixelWidth: number = 1024;
  public nrMinionsHeight: number = 5;
  public nrMinionsWidth: number = 5;
  public svgContent: string;

  constructor(private http: HttpClient) {}

  public resetMinions(): void {
    //todo
  }

  public ngOnInit(): void {
    this.loadImage().then(() => {
      //
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
