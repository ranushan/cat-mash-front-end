import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Cat } from "@models/cat.model";
import { HttpClient } from "@angular/common/http";

// URL api
const API_URL : string = 'https://cat-mash-back-end.onrender.com/api';

@Injectable()
export class CatService {

    // INJECT SERVICES
    private readonly httpClient = inject(HttpClient);

    /**
     * Get all cats from DB
     * @returns List of Cats
     */
    getAllCatPictures(): Observable<Array<Cat>> {
        return this.httpClient.get<Array<Cat>>(`${API_URL}/cats`);
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