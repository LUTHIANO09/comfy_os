import {
    Bell,
    Search,
    ChevronDown,
    Menu,
    LogOut,
    User,
    Settings,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getCurrentUser } from "../services/authService";

import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
} from "../services/notificationService";

function Navbar({ setSidebarOpen }) {

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
      loadUser();
      loadNotifications();

      const interval = setInterval(() => {
          loadNotifications();
      }, 60000);

      return () => clearInterval(interval);

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

      setNotifications(data.notifications || []);
      setUnreadCount(data.unread || 0);

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

  const handleLogout = () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
  };


  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <button
          onClick={() => setSidebarOpen(true)}
          className="mr-4 rounded-xl p-2 hover:bg-slate-100 lg:hidden"
      >
          <Menu size={24}/>
      </button>

      {/* Search */}
      <div
          className="
              hidden
              lg:flex
              items-center
              w-[430px]
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              shadow-sm
              transition
              focus-within:border-blue-500
              focus-within:ring-4
              focus-within:ring-blue-100
          "
      >
        <Search size={18} className="text-slate-500" />

        <input
              type="text"
              placeholder="Search products, customers, invoices..."
              className="ml-3 w-full bg-transparent text-sm outline-none"
          />
      </div>

      {/* Right Side */}
      <div className="relative flex items-center gap-6">

        <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="
              relative
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-3
              shadow-sm
              transition
              hover:shadow-md
              ">
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

                  <h3 className="text-lg font-bold text-slate-900">
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

              <div className="max-h-[420px] overflow-y-auto">

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
                                    hover:bg-blue-50
                                    ${
                                        notification.is_read
                                            ? "bg-white"
                                            : "bg-blue-50"
                                    }
                                `}
                            >

                              <h4 className="font-semibold text-slate-900">
                                  {notification.title}
                              </h4>

                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                  {notification.message}
                              </p>

                          </div>

                      ))

                  )}

              </div>

              <div className="hidden xl:flex flex-col items-end">

                    <span className="text-xs uppercase tracking-widest text-slate-400">
                        Today
                    </span>

                    <span className="font-semibold text-slate-700">

                        {new Date().toLocaleDateString(undefined,{
                            weekday:"short",
                            day:"numeric",
                            month:"short",
                        })}

                    </span>

                </div>

          </div>

          )}

        <div className="relative">

            <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100"
            >

                <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-700
                    font-bold
                    text-white
                    shadow-lg">

                    {user?.full_name?.charAt(0) ||
                        user?.username?.charAt(0) ||
                        "U"}

                </div>

                <div className="hidden text-left lg:block">

                    <h4 className="text-sm font-bold text-slate-900">

                        {user?.full_name || user?.username}

                    </h4>

                    <p className="text-xs uppercase tracking-wide text-slate-400">

                        {user?.role}

                    </p>

                </div>

                <ChevronDown size={18} />

            </button>

            {showProfile && (

                <div className="absolute right-0 top-16 z-50 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

                    <button
                        className="flex w-full items-center gap-3 px-5 py-4 hover:bg-slate-100"
                    >

                        <User size={18} />

                        My Profile

                    </button>

                    <button
                        className="flex w-full items-center gap-3 px-5 py-4 hover:bg-slate-100"
                    >

                        <Settings size={18} />

                        Settings

                    </button>

                    <hr />

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;