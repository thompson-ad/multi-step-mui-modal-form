export interface Form {
  isOpen: boolean;
  step: number;
  groupName: string;
  options: Users[];
  userSelect: Users[];
  userRoles: UserRoles[];
  status: string;
}

export interface SnackBarInterface {
  isSnackBarOpen: boolean;
  snackBarMessage: string;
}

export interface UserData {
  id: number;
  name: string;
  avatar: string;
}

export interface Users {
  value: number;
  label: string;
  avatar: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface UserRoles {
  id: number;
  name: string;
  role: string;
  isAdmin: boolean;
}

// FormDispatch Action Types
export interface FormAction {
  type: string;
}

export interface SetModalOpen extends FormAction {
  payload: boolean;
}

export interface NextStep extends FormAction {
  payload: number;
}

export interface HandleTextFieldChange extends FormAction {
  payload: string;
}

export interface SetUserOptions extends FormAction {
  payload: Users[];
}

export interface HandleUserSelectChange extends FormAction {
  payload: Users[];
}

export interface UpdateUserRoles extends FormAction {
  payload: UserRoles[];
}

export interface SetFormStatus extends FormAction {
  payload: string;
}

export type FormActions =
  | FormAction
  | SetModalOpen
  | NextStep
  | HandleTextFieldChange
  | SetUserOptions
  | HandleUserSelectChange
  | UpdateUserRoles
  | SetFormStatus;

// SnackBarDispatch Action Types
export interface SnackBarAction {
  type: string;
}

export interface SetSnackBarOpen extends SnackBarAction {
  payload: boolean;
}

export interface SetSnackBarMessage extends SnackBarAction {
  payload: string;
}

export type SnackBarActions =
  | SnackBarAction
  | SetSnackBarOpen
  | SetSnackBarMessage;
