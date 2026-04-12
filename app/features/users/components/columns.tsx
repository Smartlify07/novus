import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { User } from '@/types';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

export const userTableColumns = [
  columnHelper.accessor(
    (row) => {
      return row.firstName + row.lastName;
    },
    {
      header: 'User',
      id: 'user',
      cell: ({ row }) => {
        const firstName = row.original.firstName;
        const lastName = row.original.lastName;
        const email = row.original.email;
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <h1 className="font-medium text-sm capitalize">
                {firstName} {lastName}
              </h1>
              <h3 className="text-muted-foreground text-xs">{email}</h3>
            </div>
          </div>
        );
      },
    },
  ),
  columnHelper.accessor(
    (row) => {
      return row.isActive;
    },
    {
      header: '',
      id: 'isActive',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className=" self-end flex shrink min-w-0  text-right">
            <Switch className="ml-auto" defaultChecked={user.isActive} />
          </div>
        );
      },
    },
  ),
];
