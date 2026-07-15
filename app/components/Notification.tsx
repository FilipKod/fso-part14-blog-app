"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      className={`py-2.5 px-4 mb-2.5 rounded-md text-white ${type === "success" ? "bg-green-800" : "bg-red-800"}`}
    >
      {message}
    </div>
  );
}
