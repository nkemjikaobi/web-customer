interface IUser {
  firstName?: string;
  lastName?: string;
  username: string;
  emailAddress?: string;
  phoneNumber?: string;
  password?: string;
  createdAt?: Date;
  isKongaPrime?: string;
}

export default IUser;
