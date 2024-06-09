import { User } from './User';

export class ExpCertificate {
  idExpCertificate: number = 0;
  uniqueCodeCertificate: number = 0;
  institutionName: string = '';
  certificateTitle: string = '';
  user: User = new User();
}
