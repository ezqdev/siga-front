import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlBase: string = "";
  constructor(private http: HttpClient) {}


  //crear Reservaciones
  postReservation(reservation: Reservation): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
    }

    let body = JSON.stringify(reservation); // Serializa el JSON

    return this.http.post(this.urlBase + "reservation/", body, httpOption);
  }



   //Servicio para ver las reservacines
   getReservation(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "reservation/", httpOption);
  }


  //servicio Modificar Reservation
  putReservation(reservation: Reservation): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
        .append('_id', reservation._id)
    }

    let body = JSON.stringify(reservation);

    return this.http.put(this.urlBase + "reservation/" + reservation._id, body, httpOption);
  }


    //servicio Eliminar Reservation
    deleteReservation(_id: string): Observable<any> {
      const httpOption = {
        headers: new HttpHeaders({
  
        }),
        params: new HttpParams()
          .append('_id', _id)
      }
  
      return this.http.delete(this.urlBase + "reservation/" + _id, httpOption);
    }


}
