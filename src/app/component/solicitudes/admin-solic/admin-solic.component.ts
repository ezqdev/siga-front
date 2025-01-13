import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { Reservation } from '../../../models/reservation';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-solic',
  standalone: true,
  imports: [FooterComponent, Header2Component,CommonModule],
  templateUrl: './admin-solic.component.html',
  styleUrl: './admin-solic.component.css'
})
export class AdminSolicComponent {
/* DESCOMENTAR ANTES DE PROBAR */
  /*   reservation = new Reservation();
    toastSrvc = inject(ToastrService); */


   constructor(private router: Router){
      
    }

    /* ESTO TAMBIEN ANTES DE PROBAR CON EL BACKEND Y EL DE ARRIBA COMENTARLO */
    /* constructor(private router: Router,private serviceReservation: ReservationService){
      
    } */

    
  
    volver():void{
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
