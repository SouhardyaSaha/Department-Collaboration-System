export interface SessionPostBody {
  session: string;
}

export interface Session {
  id: number;
  session: string;
  createdAt: Date;
  updatedAt: Date;
  routine_uri: string;
}

export interface SessionResponseBody {
  status: string;
  data: {
    sessions: Session[];
  };
}
