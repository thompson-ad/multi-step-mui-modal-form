import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MultiUserSelect from "./components/MultiUserSelect";
import UserRoleAssignTable from "./components/UserRoleAssignTable";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import fetchUsers from "./services/usersAPI";
import {
  Form,
  SnackBarInterface,
  Users,
  UserRoles,
  FormActions,
  SnackBarActions,
  FormEnums,
  FormStatus,
  SnackBarEnums,
} from "./utils";
import {
  isSetModalOpen,
  isNextStep,
  isUpdateGroupName,
  isSetUserOptions,
  isUpdateUserSelect,
  isUpdateUserRoles,
  isUpdateFormStatus,
  isSetSnackBarOpen,
  isSetSnackBarMessage,
} from "./utils/typeGuards";
const {
  IS_OPEN,
  STEP,
  OPTIONS,
  USER_SELECT,
  USER_ROLES,
  UPDATE_STATUS,
  RESET_FORM,
} = FormEnums;
const { IS_SNACKBAR_OPEN, SNACKBAR_MESSAGE, RESET_SNACKBAR } = SnackBarEnums;
const { IDLE, SENDING, SENT, ERROR } = FormStatus;

function MultiStepModalForm() {
  const initialFormState: Form = {
    isOpen: false,
    step: 1,
    groupName: "",
    options: [{ value: 0, label: "", avatar: "" }],
    userSelect: [{ value: 0, label: "", avatar: "" }],
    userRoles: [{ id: 0, name: "", role: "", isAdmin: false }],
    status: IDLE,
  };

  const initialSnackBarState: SnackBarInterface = {
    isSnackBarOpen: false,
    snackBarMessage: "",
  };

  const formReducer = (state: Form, action: FormActions): Form => {
    if (isSetModalOpen(action)) {
      return { ...state, isOpen: action.payload };
    }
    if (isNextStep(action)) {
      return { ...state, step: action.payload };
    }
    if (isUpdateGroupName(action)) {
      return { ...state, groupName: action.payload };
    }
    if (isSetUserOptions(action)) {
      return { ...state, options: action.payload };
    }
    if (isUpdateUserSelect(action)) {
      return { ...state, userSelect: action.payload };
    }
    if (isUpdateUserRoles(action)) {
      return { ...state, userRoles: action.payload };
    }
    if (isUpdateFormStatus(action)) {
      return { ...state, status: action.payload };
    } else {
      return initialFormState;
    }
  };

  const snackBarReducer = (
    state: SnackBarInterface,
    action: SnackBarActions
  ): SnackBarInterface => {
    if (isSetSnackBarOpen(action)) {
      return { ...state, isSnackBarOpen: action.payload };
    }
    if (isSetSnackBarMessage(action)) {
      return { ...state, snackBarMessage: action.payload };
    } else {
      return initialSnackBarState;
    }
  };

  // We use useReducer to handle the forms local state
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [snackBarState, snackBarDispatch] = useReducer(
    snackBarReducer,
    initialSnackBarState
  );

  // Form state helper functions
  const setModalOpen = (openStatus: boolean) =>
    formDispatch({ type: IS_OPEN, payload: openStatus });

  const setFormStatus = (status: string) =>
    formDispatch({ type: UPDATE_STATUS, payload: status });

  const setUserOptions = (options: Users[]) =>
    formDispatch({ type: OPTIONS, payload: options });

  const nextStep = () => {
    formDispatch({ type: STEP, payload: formState.step + 1 });
  };

  // Snackbar state helper function
  const updateSnackBarState = (updateCase: string) => (
    value: boolean | string
  ) => snackBarDispatch({ type: updateCase, payload: value });

  // Change handlers
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formDispatch({ type: name, payload: value });
  };

  const handleUserSelectChange = (e: Users[]) => {
    formDispatch({ type: USER_SELECT, payload: e });
  };

  const updateUserRoles = (newRows: UserRoles[]) =>
    formDispatch({ type: USER_ROLES, payload: newRows });

  const onSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    snackBarDispatch({ type: RESET_SNACKBAR });
    formDispatch({ type: RESET_FORM });
  };

  const onSnackBarCreate = (message: string) => {
    updateSnackBarState(IS_SNACKBAR_OPEN)(true);
    updateSnackBarState(SNACKBAR_MESSAGE)(message);
  };

  // handle submit for step 1 and 2
  const handleStep1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  const handleStep2Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(SENDING);

    axios({
      method: "post",
      url: "/add_user_to_organization",
      data: formState,
    })
      .then((response) => {
        setFormStatus(SENT);
        handleModalClose();
        onSnackBarCreate(`${formState.groupName} created`);
      })
      .catch((error) => {
        setFormStatus(ERROR);
        handleModalClose();
        onSnackBarCreate(`${error.message} please try again`);
      });
  };

  useEffect(() => {
    fetchUsers().then((users) => {
      const options = users.map((user) => {
        return {
          value: user.id,
          label: `${user.name}`,
          avatar: `${user.avatar}`,
        };
      });
      setUserOptions(options);
    });
  }, []);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleModalOpen}>
        Create your group
      </Button>
      <Dialog
        maxWidth="md"
        open={formState.isOpen}
        onClose={handleModalClose}
        aria-labelledby="create-a-group"
      >
        {formState.status === "SENDING" && <CircularProgress />}
        {formState.step === 1 && formState.status === "IDLE" && (
          <>
            <form onSubmit={handleStep1Submit}>
              <div style={{ display: "flex", fontSize: 24 }}>
                <DialogTitle style={{ flexGrow: 1 }} id="create-a-group">
                  <Typography variant="h4">Create a group</Typography>
                </DialogTitle>
                <Typography style={{ padding: "16px 24px" }} variant="h4">
                  {formState.step}/2
                </Typography>
              </div>
              <DialogContent dividers={true}>
                <TextField
                  required={true}
                  autoFocus={true}
                  margin="normal"
                  fullWidth={true}
                  variant="filled"
                  label="Group Name"
                  name="groupName"
                  value={formState.groupName}
                  onChange={handleTextFieldChange}
                />
                <MultiUserSelect
                  required={true}
                  isMulti={true}
                  options={formState.options}
                  value={formState.userSelect}
                  onChange={handleUserSelectChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Proceed
                </Button>
              </DialogActions>
            </form>
          </>
        )}
        {formState.step === 2 && formState.status === "IDLE" && (
          <>
            <form onSubmit={handleStep2Submit}>
              <div style={{ display: "flex", fontSize: 24 }}>
                <DialogTitle style={{ flexGrow: 1 }} id="create-a-group">
                  <Typography variant="h4">Assign Roles</Typography>
                </DialogTitle>
                <Typography style={{ padding: "16px 24px" }} variant="h4">
                  {formState.step}/2
                </Typography>
              </div>
              <DialogContent>
                <UserRoleAssignTable
                  users={
                    formState.userRoles ||
                    formState.userSelect.map(({ value, label }) => {
                      return {
                        id: value,
                        name: label,
                        role: "",
                        isAdmin: false,
                      };
                    })
                  }
                  updateUserRoles={updateUserRoles}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Create
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </Dialog>
      <Snackbar
        open={snackBarState.isSnackBarOpen}
        message={snackBarState.snackBarMessage}
        onClose={onSnackbarClose}
        autoHideDuration={3000}
      />
    </div>
  );
}

export default MultiStepModalForm;
