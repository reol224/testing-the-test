// client.controller.ts
import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ClientService} from "./client.service";
import {Client} from "./client.entity";


@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async addClient(@Body() createClientDto: { name: string; email: string }): Promise<Client> {
        return await this.clientService.createClient(createClientDto);
    }

    @Get()
    async getClients(): Promise<Client[]> {
        return await this.clientService.getClients();
    }

    @Get(':email')
    async findOne(email: string): Promise<Client | null> {
        return await this.clientService.findOne(email);
    }

    @Delete()
    async remove(id: number): Promise<void> {
        await this.clientService.remove(id);
    }


}
