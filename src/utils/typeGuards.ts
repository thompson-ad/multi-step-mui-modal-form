import {
  FormAction,
  SetModalOpen,
  SetFormStatus,
  SetUserOptions,
  NextStep,
  HandleTextFieldChange,
  HandleUserSelectChange,
  UpdateUserRoles,
  SnackBarAction,
  SetSnackBarOpen,
  SetSnackBarMessage,
} from "./interfaces";
import { FormEnums, SnackBarEnums } from "./enums";
const {
  IS_OPEN,
  UPDATE_STATUS,
  OPTIONS,
  STEP,
  GROUP_NAME,
  USER_SELECT,
  USER_ROLES,
} = FormEnums;
const { IS_SNACKBAR_OPEN, SNACKBAR_MESSAGE } = SnackBarEnums;

// Form typeGuards
export function isSetModalOpen(action: FormAction): action is SetModalOpen {
  return action.type === IS_OPEN;
}

export function isNextStep(action: FormAction): action is NextStep {
  return action.type === STEP;
}

export function isUpdateGroupName(
  action: FormAction
): action is HandleTextFieldChange {
  return action.type === GROUP_NAME;
}

export function isSetUserOptions(action: FormAction): action is SetUserOptions {
  return action.type === OPTIONS;
}

export function isUpdateUserSelect(
  action: FormAction
): action is HandleUserSelectChange {
  return action.type === USER_SELECT;
}

export function isUpdateUserRoles(
  action: FormAction
): action is UpdateUserRoles {
  return action.type === USER_ROLES;
}

export function isUpdateFormStatus(
  action: FormAction
): action is SetFormStatus {
  return action.type === UPDATE_STATUS;
}

// SnackBar TypeGuards
export function isSetSnackBarOpen(
  action: SnackBarAction
): action is SetSnackBarOpen {
  return action.type === IS_SNACKBAR_OPEN;
}

export function isSetSnackBarMessage(
  action: SnackBarAction
): action is SetSnackBarMessage {
  return action.type === SNACKBAR_MESSAGE;
}
