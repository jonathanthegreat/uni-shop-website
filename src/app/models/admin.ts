export class Admin {
  id?: string;
  created?: string;
  updated?: string;
  lastUseTime?: string;
  phoneNumber?: string;
  email?: string;
  token?: string;
  refreshToken?: string;
  profileImageAddress?: string;
  username?: string;
  accessLevel?: number;
  fname?: string;
  lname?: string;

  setUser(user: any) {
    this.id = user.id;
    this.created = user.created || '';
    this.updated = user.updated || '';
    this.lastUseTime = user.lastUseTime || '';
    this.phoneNumber = user.phoneNumber || '';
    this.email = user.email || '';
    this.token = user.token || '';
    this.refreshToken = user.refreshToken || '';
    this.profileImageAddress = user.profileImageAddress || 'assets/media/users/default.jpg';
    this.username = user.username || [];
    this.accessLevel = user.accessLevel || '';
    this.fname = user.fname || '';
    this.lname = user.lname || '';
  }
}
