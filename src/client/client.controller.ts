// client.controller.ts
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';
import { GroupDto } from './dto/group.dto';
import { GroupService } from './group.service';

@Controller('contact')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly groupService: GroupService,
  ) {}

  @Post()
  async addClient(@Body() createClientDto: ClientDto): Promise<Client> {
    return await this.clientService.createClient(createClientDto);
  }

  // @Post('/group')
  // async addGroup(@Body() createGroupDto: GroupDto): Promise<Group> {
  //     return await this.clientService.createGroup(createGroupDto);
  // }

  @Post('/group')
  async createGroup(
    @Body() groupDto: GroupDto,
  ): Promise<{ data: {}; success: boolean }> {
    try {
      const createdGroup = await this.groupService.createGroup(groupDto);
      return { success: true, data: createdGroup };
    } catch (error) {
      // Handle error appropriately (e.g., log or return error response)
      console.error(error);

      // Return a predefined empty group or error state
      return {
        data: {
          /* empty or default values */
        },
        success: false,
      };
    }
  }

  // @Post('/org')
  // async addOrg(@Body() createOrgDto: GroupDto): Promise<Group> {
  //     return await this.clientService.createOrg(createOrgDto);
  // }

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
