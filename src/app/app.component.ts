import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarWarsService} from "@app/star-wars.service";
import Character from "@type/Character";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subs: Subscription[] = [];
  characters?: Character[];
  constructor(private readonly swService: StarWarsService) {}

  ngOnInit(): void {
    const sub = this.swService.getAll()
      .subscribe(characters => {
      this.characters = characters;
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
