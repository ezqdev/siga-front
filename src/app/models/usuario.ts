import { Rol } from "./rol";
import{Position} from "./posicion";

export class Usuario {
    _id!: string;
    name: string;
    email: string;
    password: string;
    rol: Rol;
    position:Position;

    constructor() {
        this.name = "";
        this.email = "";
        this.password = "";
        this.position = new Position();
        this.rol = new Rol();
    }
}
