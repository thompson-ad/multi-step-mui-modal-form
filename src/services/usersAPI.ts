import { UserData } from "../utils/interfaces";
import Avatar1 from "../Assets/avatar1.png";
import Avatar2 from "../Assets/avatar1.png";

const fetchUsers = () =>
  new Promise<UserData[]>((resolve) => {
    const users = [
      {
        id: 1,
        name: "Aaron",
        avatar: Avatar1,
      },
      {
        id: 2,
        name: "George",
        avatar: Avatar1,
      },
      {
        id: 3,
        name: "Kirsten",
        avatar: Avatar2,
      },
      {
        id: 4,
        name: "Alex",
        avatar: Avatar1,
      },
      {
        id: 5,
        name: "Sarah",
        avatar: Avatar2,
      },
    ];

    setTimeout(() => resolve(users), 1000);
  });

export default fetchUsers;
