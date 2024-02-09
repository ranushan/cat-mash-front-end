import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Cat } from "@models/cat.model";
import { HttpClient } from "@angular/common/http";

// URL api
const API_URL : string = 'http://localhost:8080/api';

@Injectable()
export class CatService {

    // INJECT SERVICES
    private readonly httpClient = inject(HttpClient);

    /**
     * Get all cats from DB
     * @returns List of Cats
     */
    getAllCatPictures(): Observable<Array<Cat>> {
        return  this.httpClient.get<Images>('../../assets/cats.json')
                    .pipe(map(r => r.images));
    }

    /**
     * Vote for cat picture
     * @param id Identification of cat picture
     * @returns Nothing
     */
    voteCatPicture(id: string): Observable<void> {
        return  this.httpClient.post<void>(`${API_URL}/cats`, id);
    }
}

// Util for returning all cats
type Images = { images: Cat[] };