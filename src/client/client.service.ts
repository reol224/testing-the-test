// client.service.ts
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Client} from './client.entity';
import {ClientDto} from "./dto/client.dto";


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {
    }

    async createClient(createClientDto: ClientDto): Promise<Client> {
        const user = new Client();

        Object.assign(user, createClientDto);

        user.type = createClientDto.type || 'individual';
        user.verified = createClientDto.verified || false;
        user.verified_method = createClientDto.verified_method || 'other';
        user.status = createClientDto.status || 'missing';


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
