import IUser from "dto/Authentication/IUser";

export interface IUseLoginState {
  errorMessage: string;
  onChange: () => void;
  onSubmit: () => void;
  IsSubmitting: boolean;

  handleRemoveLoginNotification: (className: string) => void;
  authenticatedUser: IUser | null;
}
