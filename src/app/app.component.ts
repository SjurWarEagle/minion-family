import { Component, OnInit } from '@angular/core';
import { faTh, faTools, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public minionWallIcon = faTh;
  public minionCustomizerIcon = faTools;
  public export = faCloudDownloadAlt;
  public loading = false;

  public ngOnInit(): void {}

  constructor() {}

  public downloadAsImage() {
    this.loading = true;
    html2canvas(document.getElementById('areaToExport')).then(canvas => {
      let link = document.createElement('a');
      link.download = 'minion.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.loading = false;
    });
  }
}
