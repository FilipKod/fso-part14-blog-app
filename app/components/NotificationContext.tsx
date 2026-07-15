"use client";

import React, { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotify: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showNotify = (message: string, type: NotificationType = "success") => {
    setMessage(message);
    setType(type);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <NotificationContext value={{ message, type, showNotify }}>
      {children}
    </NotificationContext>
  );
};

export const useNotification = () => useContext(NotificationContext);
