import { Contact, ContactStatusEnum, ContactTypeEnum } from '../entities/contact.entity';
import { AbstractDto } from '../../abstract/abstract.dto';
import { IdentityDto } from './identity.dto';
import { VerificationDto } from './verification.dto';
import { Fintrac } from '../entities/fintrac.entity';
import { Contract } from '../entities/contract.entity';
import { Identity } from '../entities/identity.entity';

export namespace ContactDto {

  type Avatar = { sm?: string | null; md?: string | null; lg?: string | null };
  type ProfileChecks = {
    completed_identity?: boolean | null;
    active_contract?: boolean | null;
    fintrac_verified?: boolean | null;
  };
  type Options = {
    fintrac: Fintrac;
    identity: Identity;
    contracts: Contract[];
    members: Contact[];
  };
  type Address = {
    address?: string | null;
    city?: string | null;
    province?: string | null;
    postal_code?: string | null;
    country?: string | null;
  };
  type Corporation = {
    operating_as: string;
    business_number?: string | null;
    legal_name?: string | null;
    province?: string | null;
    country?: string | null;
    principal_business?: string | null;
  };

  export class Root extends AbstractDto {
    key?: string;
    type?: ContactTypeEnum;
    status?: ContactStatusEnum;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: Address | null;
    description?: string | null;
    corporation?: Corporation | null;
    avatar?: Avatar | null;
    profile_checks?: ProfileChecks;
    identity?: IdentityDto | null;
    verifications?: VerificationDto.Root;
    fintracs?: Fintrac;
    contracts?: Contract[];
    members?: GetMembers[];

    getEntity() {
      const entity = new Contact();
      entity.type = this.type;
      entity.status = this.status;
      entity.name = this.name;
      entity.email = this.email ?? '';
      entity.phone = this.phone ?? '';
      entity.address = this.address?.address ?? '';
      entity.city = this.address?.city ?? '';
      entity.province = this.address?.province ?? '';
      entity.postal_code = this.address?.postal_code ?? '';
      entity.country = this.address?.country ?? '';
      entity.avatar_sm = this.avatar?.sm || '';
      entity.avatar_md = this.avatar?.md || '';
      entity.avatar_lg = this.avatar?.lg || '';
      entity.has_completed_identity =
        this.profile_checks?.completed_identity ?? false;
      entity.has_active_contract =
        this.profile_checks?.active_contract ?? false;
      entity.has_fintrac_score = this.profile_checks?.fintrac_verified ?? false;
      entity.corp_number = this.corporation?.business_number ?? '';
      entity.corp_legal_name = this.corporation?.legal_name ?? '';
      entity.corp_province = this.corporation?.province ?? '';
      entity.corp_country = this.corporation?.country ?? '';
      entity.principal_business = this.corporation?.principal_business ?? '';
      return entity;
    }
  }

  export function createFromEntities(entity: Contact, options?: any) {
    console.log(entity)
    const dto: Root = new Root();
    dto.key = entity.id!.toString();
    dto.type = entity.type;
    dto.status = entity.status;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.phone = entity.phone;
    dto.address = {
      address: entity.address,
      city: entity.city,
      province: entity.province,
      postal_code: entity.postal_code,
      country: entity.country,
    };
    dto.avatar = {
      sm: entity.avatar_sm ?? '',
      md: entity.avatar_md ?? '',
      lg: entity.avatar_lg ?? '',
    };
    dto.profile_checks = {
      completed_identity: entity.has_completed_identity ?? false,
      active_contract: entity.has_active_contract ?? false,
      fintrac_verified: entity.has_fintrac_score ?? false,
    };

    if (
      entity.type == ContactTypeEnum.company ||
      entity.type == ContactTypeEnum.group
    ) {
      if (entity.members?.length) {
        dto.members = entity.members.map((m) => {
          return {
            name: 'sadsad',
            type: ContactTypeEnum.group,
            status: ContactStatusEnum.active,
          } satisfies GetMembers;
        });
      }
    }

    return dto;
  }

  export type Member = Pick<Root, 'name' | 'key' | 'email' | 'phone'>;
  export type UpdateRequest = Pick<
    Root,
    'name' | 'email' | 'phone' | 'address' | 'corporation' | 'description'
  > & {
    members?: Member[];
  };


  export type GetMembers = Pick<
    Root,
    'name' | 'phone' | 'email' | 'type' | 'status'
  > &
    ProfileChecks &
    Avatar;
}