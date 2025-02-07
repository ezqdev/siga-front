import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { Reservation } from '../../../models/reservation';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-solic',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule],
  templateUrl: './admin-solic.component.html',
  styleUrl: './admin-solic.component.css'
})
export class AdminSolicComponent {
  /* DESCOMENTAR ANTES DE PROBAR */
  /*   reservation = new Reservation();
    toastSrvc = inject(ToastrService); */

  reservations: any;

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  /* ESTO TAMBIEN ANTES DE PROBAR CON EL BACKEND Y EL DE ARRIBA COMENTARLO */
  /* constructor(private router: Router,private serviceReservation: ReservationService){

  } */

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/reservation`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.reservations = response.data;
        console.log('reservations', this.reservations)
      }
    });
  }


  approveOrReject(reservationId: any, approve: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.put(`${environment.apiUrl}/reservation/${reservationId}/changeStatus`,
      {
        status: approve
      },
      { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        if(response.statusCode === 200){
          this.getReservations()
        }
      }
    });
  }

  volver(): void {
    this.router.navigate(['admin']);
  }


  /* AL PROBAR LOS SERVICIOS DESCOMENTAR */

  /*
  verReservationes(): void {
    this.serviceReservation.getReservation().subscribe(
      result => {
        this.reservation = result.reverse();
      },
      (error) => {
        console.log(error);
      })
  }


  modificarReservation() {
    this.serviceReservation.putReservation(this.reservation).subscribe(
      (result)=>{
        this.toastSrvc.success("Reservacion modificado con éxito.");
        this.router.navigate(['home'])
      },
      error => {
        alert("Error: " + error);
      });

  }

eliminarLocal(_id: string) {
  this.serviceReservation.deleteReservation(_id).subscribe(
    (result: any) => {
      this.toastSrvc.success("Local eliminado con éxito.", "Operación exitosa");
      this.verReservationes();

    }, (error: any) => {
      console.log(error);
    }
  )
} */



}
