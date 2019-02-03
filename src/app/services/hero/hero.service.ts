import { Injectable } from '@angular/core';
import {Hero} from "../../models/hero";
import {HEROES} from "../../mock-heroes";
import {Observable,of} from "rxjs";
import {MessageService} from "../message/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: "root"
})
export class HeroService {

  constructor(private messageService: MessageService,private http:HttpClient) {
    this.http = http
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('http://localhost:8000/api/hero/').pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }
  log(message){
    this.messageService.add(message)
  }
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`http://localhost:8000/api/hero/${id}/`).pipe(
      tap(_ => this.log('fetched hero')),
      catchError(this.handleError('getHeroes', {id:null,name:null}))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.post(`http://localhost:8000/api/hero/${hero.id}/`,hero,httpOptions).pipe(
      tap(_ => {
        this.log('updated hero'+_.toString())
      }),
      catchError(this.handleError('getHeroes', {id:null,name:null}))
    );
  }
  deleteHero(hero: Hero): Observable<Hero> {
    return this.http.post(`http://localhost:8000/api/delete_hero/${hero.id}/`,httpOptions).pipe(
      tap(_ => {
        this.log('deleted hero'+_.toString())
      }),
      catchError(this.handleError('getHeroes', {id:null,name:null}))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(`http://localhost:8000/api/hero/`,hero,httpOptions).pipe(
      tap(_ => {
        this.log('hero Added'+_.toString())
      }),
      catchError(this.handleError('add Hero', null))
    );
  }
}
