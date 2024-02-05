// group.dto.ts
export class GroupDto {
  name!: string;
  members: Array<{
    name: string;
    phone: string;
    email: string;
    position: string;
    type: 'individual' | 'organization' | 'group';
    verified: boolean;
    verified_method: 'remote' | 'government_id' | 'credit' | 'other';
    status: 'verified' | 'rejected' | 'manually_verified' | 'missing';
    avatar: {
      sm: string;
      md: string;
      lg: string;
    };
  }>;
}
