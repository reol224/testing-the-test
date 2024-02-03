// client.service.ts
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Client} from './client.entity';


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {
    }

    async createClient(createClientDto: { name: string; email: string }): Promise<Client> {
        const user = new Client();
        user.name = createClientDto.name;
        user.email = createClientDto.email;
        //user.phone = createClientDto.phone;


        return this.clientRepository.save(user);
    }

    async getClients(): Promise<Client[]> {
        return await this.clientRepository.find();
    }

    async findOne(email: string): Promise<Client | null> {
        return await this.clientRepository.findOneBy({email});
    }

    async remove(id: number): Promise<void> {
        await this.clientRepository.delete(id);
    }
}
