import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../models/hero";
import {HeroService} from "../../services/hero/hero.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero : Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  save(){
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.location.back());
  }
  delete(){
      this.heroService.deleteHero(this.hero)
        .subscribe(() => this.location.back());
  }
}
