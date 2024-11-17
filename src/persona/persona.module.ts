import {Module} from '@nestjs/common';
import {PersonaController} from './persona.controller';

@Module({
    imports: [],
    controllers: [PersonaController],
    providers: []
})
export class PersonaModule {
    
}