import { Body, Controller, Delete, NotAcceptableException, Param, Post } from '@nestjs/common';
import { ContactService } from '../../services/contact.service';
import { MemberDto } from '../dtos/member.dto';
import { ContactDto } from '../dtos/contact.dto';
import { MemberService } from '../../services/member.service';


@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
  ) {}

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() memberDto: MemberDto[],
  ): Promise<MemberDto[]> {
    try {
      return await this.memberService.add(
        id,
        memberDto,
      );
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException("Members couldn't be added to the contact");
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.memberService.delete(id);
  }
}
