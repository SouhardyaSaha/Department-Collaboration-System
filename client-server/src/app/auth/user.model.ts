export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
    public role: string,
  ) {}

  // get token() {
  //   if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
  //     console.log('hit');
  //     return null
  //   }
  //   return this._token
  // }
  get isAdmin(): boolean {
    return this.role === 'admin';
  }
  get isStudent(): boolean {
    return this.role === 'student';
  }
  get isTeacher(): boolean {
    return this.role === 'teacher';
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegistrationBody {
  name: string;
  password: string;
  profile: {
    registration?: number;
    designation?: string;
  };
}

export interface AuthResponseData {
  status: string;
  token: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      updatedAt: string;
      createdAt: string;
    };
  };
}
