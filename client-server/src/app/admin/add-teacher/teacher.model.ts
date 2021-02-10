export interface User {
  id: number;
  name: string;
  email?: string;
}

export interface Student {
  id: number;
  registration: number;
  user: User;
}

export interface Teacher {
  id: number;
  designation: string;
  user: User;
}
