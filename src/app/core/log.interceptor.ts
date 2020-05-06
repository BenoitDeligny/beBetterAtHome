import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export  class  LogInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.urlWithParams); // J'affiche l'url avec les params
        // Je passe la requête à la suite des interceptors cachés d'angular
        // Et je retourne ce résultat pour que la requête ait bien lieu
        return  next.handle(req);
}

}
