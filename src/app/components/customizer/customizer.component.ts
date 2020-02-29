import { Component, OnInit } from '@angular/core';
import { DnaRandomizerService } from '../../services/dna-randomizer.service';
import { MinionDna } from '../../model/minion-dna';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {
  public currentMinionDna: MinionDna;
  public svgContent: string;

  constructor(private dnaRandomizerService: DnaRandomizerService, private http: HttpClient) {}

  public ngOnInit(): void {
    this.loadImage().then(() => {
      this.dnaRandomizerService.generateMinion().then(dna => {
        this.currentMinionDna = dna;
      });
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

  public updateMinionDna(dna: MinionDna): void {
    setTimeout(() => {
      //generate new reference, so that change detection is triggered
      this.currentMinionDna = JSON.parse(JSON.stringify(dna));
    });
  }
}
