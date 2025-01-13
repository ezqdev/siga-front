
import{Usuario} from "./usuario";

export class Reservation {
    _id!: string;
    usuario!: Usuario;
    espacio:string;
    reservation_date: string;
    star_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    status: string;
    job: string;
    reservation_details: string;

    constructor() {
        this.usuario = new Usuario();
        this.espacio="";
        this.reservation_date = "";
        this.star_date = "";
        this.end_date = "";
        this.start_time = "";
        this.end_time = "";
        this.status = "";
        this.job = "";
        this.reservation_details = "";
    }
}
        