import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "@app_assets/logo/png/logo-no-background.png";
import CollectionsIcon from '@mui/icons-material/Collections';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { AppProvider } from "@toolpad/core/AppProvider";
import type { Navigation, Router } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { logout } from "@app_api/User.API";
import PackageComponent from "@app_components/staff/Dashboard/ManagePackages";
import EventAlbumStatus from "@app_components/staff/Event/EventAlbumStatus";
import MyEventAssignmentsCalendar from "@app_components/staff/Event/EventAssignmentsCalendar";
import MyNotifications from "@app_components/staff/Notifications/MyNotifications";
import UserProfileUpdate from "@app_components/admin/UserProfile/UserProfileUpdate"
import { getUserIdFromToken } from "@app_api/helper/getUserIdFromToken";
import AlbumUploader from "@app_components/AlbumUploader";
import EventsSidebar from "@app_components/admin/Event/EventsSidebar";

const demoTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Dashboard Section",
  },
  {
    segment: "calendar",
    title: "Calendar",
    icon: <CalendarMonthIcon />,
  },
  {
    segment: "packages",
    title: "Packages",
    icon: <InventoryIcon />,
  },
  {
    segment: "gallery",
    title: "Gallery",
    icon: <CollectionsIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Event Section",
  },
  {
    segment: "events",
    title: "Events",
    icon: <AssignmentTurnedInIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Other",
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "profile",
    title: "My Profile",
    icon: < ManageAccountsIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  const renderContent = () => {
    const userId = getUserIdFromToken();
    switch (router.pathname) {
      case "/calendar":
        return <MyEventAssignmentsCalendar />;
      case "/packages":
        return <PackageComponent />;
      case "/events":
        return <EventAlbumStatus />;
      case "/notifications":
        return <MyNotifications />;
      case "/profile":
        return userId ? (
          <UserProfileUpdate userId={userId} />
        ) : (
          <Typography color="error" sx={{ p: 3 }}>
            Unauthorized: Invalid or missing token
          </Typography>
        );
      case "/gallery":
        return (
          <div style={{ display: 'flex', height: '100%', minHeight: 600 }}>
            <div style={{ flex: 2, padding: '2rem' }}>
              <AlbumUploader eventId={1} />
            </div>
            <div style={{ flex: 1, borderLeft: '2px solid #eee', padding: '2rem', background: '#fafafa' }}>
              <EventsSidebar />
            </div>
          </div>
        );
      default:
        return <PackageComponent />;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (router.pathname === "/logout") {
      const performLogout = async () => {
        try {
          await logout();
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

      performLogout();
    }
  }, [router.pathname, navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logo} alt="Brand Logo" style={{ height: 100 }} />,
        title: "",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {renderContent()}
        </Suspense>
      </DashboardLayout>
    </AppProvider>
  );
}
