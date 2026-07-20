import { Bell, Search, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../services/authService";

import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
} from "../services/notificationService";

function Navbar() {

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
      loadUser();
      loadNotifications();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotifications = async () => {
      try {
          const data = await getNotifications();

          setNotifications(data.notifications);
          setUnreadCount(data.unread);

      } catch (error) {
          console.error(error);
      }
  };

  const handleReadNotification = async (notification) => {
      try {
          if (!notification.is_read) {
              await markNotificationRead(notification.id);
          }

          loadNotifications();

      } catch (error) {
          console.error(error);
      }
  };

  const handleMarkAllRead = async () => {
      try {

          await markAllNotificationsRead();

          loadNotifications();

      } catch (error) {

          console.error(error);

      }
  };


  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-3 w-96">
        <Search size={18} className="text-slate-500" />

        <input
          type="text"
          placeholder="Search products, sales..."
          className="ml-3 w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="relative flex items-center gap-6">

        <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2 transition hover:bg-slate-100"
          >
          <Bell size={22} />

          {unreadCount > 0 && (

            <span
                className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-600
                    text-xs
                    font-bold
                    text-white
                "
            >
                {unreadCount}
            </span>

        )}
        </button>

        {showNotifications && (

          <div
              className="
                  absolute
                  right-24
                  top-20
                  z-50
                  w-96
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
              "
          >

              <div className="flex items-center justify-between border-b p-4">

                  <h3 className="font-semibold text-slate-800">
                      Notifications
                  </h3>

                  {unreadCount > 0 && (

                      <button
                          onClick={handleMarkAllRead}
                          className="
                              text-sm
                              font-medium
                              text-blue-600
                              hover:text-blue-800
                          "
                      >
                          Mark all
                      </button>

                  )}

              </div>

              <div className="max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (

                      <div className="p-6 text-center text-slate-500">
                          No notifications.
                      </div>

                  ) : (

                      notifications.map((notification) => (

                          <div
                                key={notification.id}
                                onClick={() => handleReadNotification(notification)}
                                className={`
                                    cursor-pointer
                                    border-b
                                    p-4
                                    hover:bg-slate-50
                                    ${
                                        notification.is_read
                                            ? "bg-white"
                                            : "bg-blue-50"
                                    }
                                `}
                            >

                              <h4 className="font-semibold">
                                  {notification.title}
                              </h4>

                              <p className="mt-1 text-sm text-slate-600">
                                  {notification.message}
                              </p>

                          </div>

                      ))

                  )}

              </div>

          </div>

          )}

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user?.full_name?.charAt(0) ||
            user?.username?.charAt(0) ||
            "U"}
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-slate-800">
              {user?.full_name || user?.username}
            </h4>

            <p className="text-xs text-slate-500">
              {user?.role}
            </p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />

        </div>

      </div>

    </header>
  );
}

export default Navbar;