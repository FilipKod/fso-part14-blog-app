import { createUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>

      <form action={createUser}>
        <div>
          <label>
            Username
            <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </div>
        <div>
          <button type="submit">register</button>
        </div>
      </form>
    </div>
  );
}
