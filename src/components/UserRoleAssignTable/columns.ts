interface Column {
    id: 'users' | 'roles' | 'admin'
    label: string;
    minWidth?: number;
    align?: 'left'
  }

export const columns: Column[] = [
{
    id: 'users',
    label: 'Users',
    minWidth: 250,
    align: 'left'
},
{
    id: 'roles',
    label: 'Roles',
    minWidth: 200,
    align: 'left'
},
{
    id: 'admin',
    label: 'Admin',
    minWidth: 50,
    align: 'left'
}
];
