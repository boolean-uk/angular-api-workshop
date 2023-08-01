import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import Environment from "@app/environment";
import Character from "@type/Character";

interface Response {
  count: number,
  next?: string,
  previous?: string,
  results: Character[]
}

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private readonly baseUrl = `${Environment.API_URL}/people`
  constructor(private readonly http: HttpClient) {}

  getAll(page?: number): Observable<Character[]> {
    const queryParam = page ? `?page=${page}` : "";
    const url = `${this.baseUrl}${queryParam}`;
    return this.http.get<Response>(url).pipe(map(r => r.results as Character[]));
  }

  getOne(id: number): Observable<Character> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Character>(url);
  }
}
