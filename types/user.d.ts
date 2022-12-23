declare interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

declare interface User {
  userId: string;
  userPw: string;
  pwChangeDt: string;
  role: string;
  accessToken: string | undefined;
  refreshToken: string;
}

declare interface LoginForm {
  userId: string;
  userPw: string;
  keepLoggedIn: boolean;
}

declare interface Status {
  loggedIn: boolean;
}

declare interface AuthState {
  status: Status;
  user: User | null;
}
