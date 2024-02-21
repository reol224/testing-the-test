import { Fintrac } from '../entities/fintrac.entity';
import { AbstractDto } from '../../abstract/abstract.dto';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { FintracRisk } from '../entities/fintrac_risk.entity';
import { FintracVerification, FintracVerificationTypeEnum } from '../entities/fintrac_verification.entity';

export namespace FintracDto {
  type FintracVerification = {
    type?: FintracVerificationTypeEnum;
    credit_bureau?: string;
    credit_reference?: string;
    other_requested_at?: Date;
    other_method?: string;
    other_failed_reason?: string;
  };

  type ThirdParty = {
    relationship?: string;
    reason?: string;
    name?: string;
    address?: string;
    occupation?: string;
    corp_number?: string;
    jurisdiction?: string;
    dob?: string;
  };

  export class Root extends AbstractDto{
    key?: string;
    purpose?: string;
    purpose_notes?: string;
    purpose_other?: string;
    third_party?: boolean;
    tp_relationship?: ThirdParty;
    tp_reason?: ThirdParty;
    tp_name?: ThirdParty;
    tp_address?: ThirdParty;
    tp_occupation?: ThirdParty;
    tp_corp_number?: ThirdParty;
    tp_jurisdiction?: ThirdParty;
    tp_dob?: ThirdParty;
    pep_flagged?: boolean;
    pep_description?: string;
    fintrac_risk?: FintracRisk;
    fintrac_verification?: FintracVerification;
    getEntity(): AbstractEntity {
      const entity = new Fintrac();
      entity.id = parseInt(this.key ?? '');
      entity.purpose = this.purpose;
      entity.purpose_notes = this.purpose_notes;
      entity.purpose_other = this.purpose_other;
      entity.third_party = this.third_party;
      entity.tp_relationship = this.tp_relationship?.relationship;
      entity.tp_reason = this.tp_reason?.reason;
      entity.tp_name = this.tp_name?.name;
      entity.tp_address = this.tp_address?.address;
      entity.tp_occupation = this.tp_occupation?.occupation;
      entity.tp_corp_number = this.tp_corp_number?.corp_number;
      entity.tp_jurisdiction = this.tp_jurisdiction?.jurisdiction;
      entity.tp_dob = this.tp_dob?.dob;
      entity.pep_flagged = this.pep_flagged;
      entity.pep_description = this.pep_description;

      return entity;
    }
  }

  export function createFromEntities(entity: Fintrac, options?: any) {
    const dto: Root = new Root();
    dto.key = entity.id!.toString();
    dto.purpose = entity.purpose;
    dto.purpose_notes = entity.purpose_notes;
    dto.purpose_other = entity.purpose_other;
    dto.third_party = entity.third_party;
    dto.tp_relationship = {
      relationship: entity.tp_relationship,
    };
    dto.tp_reason = {
      reason: entity.tp_reason,
    };
    dto.tp_name = {
      name: entity.tp_name,
    };
    dto.tp_address = {
      address: entity.tp_address,
    };
    dto.tp_occupation = {
      occupation: entity.tp_occupation,
    };
    dto.tp_corp_number = {
      corp_number: entity.tp_corp_number,
    };
    dto.tp_jurisdiction = {
      jurisdiction: entity.tp_jurisdiction,
    };
    dto.tp_dob = {
      dob: entity.tp_dob,
    };
    dto.pep_flagged = entity.pep_flagged;
    dto.pep_description = entity.pep_description;
    dto.fintrac_risk = entity.fintrac_risk;
    dto.fintrac_verification = {
      type: FintracVerificationTypeEnum?.other,
      credit_bureau: entity.fintrac_verification?.credit_bureau,
      credit_reference: entity.fintrac_verification?.credit_reference,
      other_requested_at: entity.fintrac_verification?.other_requested_at,
      other_method: entity.fintrac_verification?.other_method,
      other_failed_reason: entity.fintrac_verification?.other_failed_reason,
    };

    return dto;
  }

  export type UpdateRequest = Pick<
    FintracDto.Root,
    | 'purpose'
    | 'purpose_notes'
    | 'purpose_other'
    | 'third_party'
    | 'tp_relationship'
    | 'tp_reason'
    | 'tp_name'
    | 'tp_address'
    | 'tp_occupation'
    | 'tp_corp_number'
    | 'tp_jurisdiction'
    | 'tp_dob'
    | 'pep_flagged'
    | 'pep_description'
  > & {
    fintrac_risk?: FintracRisk;
    fintrac_verification?: FintracVerification;
  };

}

