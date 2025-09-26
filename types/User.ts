import Post from "./Post";

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  Posts?: Post[]
}