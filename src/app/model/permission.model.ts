export class Permission {
  is_admin: boolean = false;
  user_type: string = '';
  role_id: number = 0;
  permissions: {
    can_use_biometric: boolean;
  } = {
    can_use_biometric: false
  }
}
