export class Auth {
  constructor(
    public token: string,
    public refreshToken: string,
    public id: string
  ) {}
}
