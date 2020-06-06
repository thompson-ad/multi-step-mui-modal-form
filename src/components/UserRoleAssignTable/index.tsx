import React, { useState, useEffect } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Avatar from "@material-ui/core/Avatar";
import { columns } from "./columns";
import { UserRoles } from "../../utils";
import { fetchRoles } from "../../services/rolesAPI";

interface Props {
  users: UserRoles[];
  updateUserRoles: any;
}

const StyledTable = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderCollapse: "separate",
      border: "none",
      borderSpacing: "2px 1rem",
    },
  })
)(Table);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#fff",
      fontWeight: "bold",
    },
    body: {
      border: "none",
    },
  })
)(TableCell);

export default function UserRoleAssignTable({ users, updateUserRoles }: Props) {
  // give roles from API to component state
  const [roles, setRoles] = useState([{ roleId: 0, roleName: "" }]);

  const handleRoleChange = (
    id: number,
    event: React.ChangeEvent<{ value: unknown }>,
    cell: string
  ) => {
    const newRows = [...users];
    const index = users.findIndex((user) => user.id === id);
    const row = users[index];

    newRows[index] = {
      ...row,
      [cell]: event.target.value as string,
    };
    updateUserRoles(newRows);
  };

  const handleAdminChange = (id: number, cell: string) => {
    const newRows = [...users];
    const index = users.findIndex((user) => user.id === id);
    const row = users[index];

    newRows[index] = {
      ...row,
      [cell]: !row.isAdmin,
    };
    updateUserRoles(newRows);
  };

  useEffect(() => {
    fetchRoles().then((availableRoles) => {
      setRoles(availableRoles);
    });
  }, []);

  return (
    <StyledTable>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(({ id, name, role, isAdmin }) => {
          return (
            <TableRow key={id}>
              <StyledTableCell
                component="th"
                scope="row"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar alt={name} src={name} style={{ marginRight: 10 }} />
                {name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <FormControl>
                  <Select
                    id="role-select"
                    name="role-select"
                    value={role}
                    onChange={(e) => handleRoleChange(id, e, "role")}
                  >
                    {roles.map(({ roleName, roleId }) => (
                      <MenuItem key={roleId} value={roleName}>
                        {roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  onClick={(e) => handleAdminChange(id, "isAdmin")}
                  color={isAdmin === false ? "primary" : "default"}
                  size="medium"
                >
                  <StarIcon style={{ fontSize: "2rem" }} />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
}
