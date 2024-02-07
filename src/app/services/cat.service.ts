import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Cat } from "@models/cat.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CatService {

    private readonly httpClient = inject(HttpClient);

    getAllCatPictures(): Observable<Array<Cat>> {
        return this.httpClient.get<Images>('../../assets/cats.json')
            .pipe(map(r => r.images));
    }
}

export type Images = { images: Cat[] };