import { Role } from "../utils/interfaces";
export const fetchRoles = () =>
  new Promise<Role[]>((resolve) => {
    const roles = [
      {
        roleId: 11,
        roleName: "Marketing Manager",
      },
      {
        roleId: 22,
        roleName: "Designer",
      },
      {
        roleId: 33,
        roleName: "Legal Ops",
      },
    ];

    setTimeout(() => resolve(roles), 1000);
  });
