"use client";

import { useActionState } from "react";
import { createUser, RegisterFormState } from "../actions/users";

const initStateForm: RegisterFormState = {
  errors: {},
  values: {
    username: "",
    name: "",
    password: "",
    passwordConfirm: "",
  },
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(createUser, initStateForm);

  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
            />
          </label>
          {state.errors.username && (
            <p style={{ color: "red" }}>{state.errors.username}</p>
          )}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values.name} />
          </label>
          {state.errors.name && (
            <p style={{ color: "red" }}>{state.errors.name}</p>
          )}
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          {state.errors.password && (
            <p style={{ color: "red" }}>{state.errors.password}</p>
          )}
        </div>
        <div>
          <label>
            Password Confirm
            <input type="password" name="passwordConfirm" />
          </label>
          {state.errors.passwordConfirm && (
            <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
          )}
        </div>
        <div>
          <button type="submit">register</button>
        </div>
      </form>
    </div>
  );
}
