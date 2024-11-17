import { Controller, Get } from "@nestjs/common";

@Controller({})
export class PersonaController {

    @Get("/Personas")
    getPersonas() {
        return "Personas";
    }
    
}