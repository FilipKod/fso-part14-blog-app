"use client";

import { useFormStatus } from "react-dom";

export default function SubmitTokenButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`rounded-md py-2 px-5 text-white ${pending ? "cursor-not-allowed bg-gray-700" : "cursor-pointer bg-blue-700"}`}
      disabled={pending}
    >
      {pending ? "Loading..." : "Generate New Token"}
    </button>
  );
}
