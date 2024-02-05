// group.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupDto } from './dto/group.dto';
import { Client } from './client.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(groupDto: GroupDto): Promise<Group> {
    const group = new Group();
    group.name = groupDto.name;


    if (groupDto.members) {
      group.members = groupDto.members.map((member) => {
        const client = new Client();
        client.name = member.name;
        client.email = member.email;
        client.phone = member.phone;
        client.position = member.position;
        client.type = member.type || 'individual';
        client.verified = member.verified;
        client.verified_method = member.verified_method;
        client.status = member.status || 'missing';
        client.avatar = member.avatar;


        client.groups = [group];

        return client;
      });
    }

    // Save the group and its associated members
    return this.groupRepository.save(group);
  }
}
