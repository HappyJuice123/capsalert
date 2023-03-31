import { createContext, useState } from "react";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notificationsList, setNotificationsList] = useState([]);

  return (
    <NotificationsContext.Provider
      value={{ notificationsList, setNotificationsList }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
