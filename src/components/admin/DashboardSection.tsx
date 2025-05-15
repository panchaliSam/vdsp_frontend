import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import logo from "@app_assets/logo/png/logo-no-background.png";
import CollectionsIcon from '@mui/icons-material/Collections';
import { AppProvider } from "@toolpad/core/AppProvider";
import type { Navigation, Router } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { logout } from "@app_api/User.API";
import PeopleComponent from "@app_components/admin/Dashboard/ManageUsers";
import PackageComponent from "@app_components/admin/Dashboard/ManagePackages";
import AdminReservationApprovals from "@app_components/admin/Approvals/ReservationApprovals";

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
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "people",
    title: "People",
    icon: <  PeopleIcon />,
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
    title: "Reservation Section",
  },
  {
    segment: "reservations",
    title: "Reservations",
    icon: <InventoryIcon />,
  },
  {
    segment: "approveReservations",
    title: "Approve Reservations",
    icon: <CheckCircleIcon />,
  },
  {
    segment: "manageReservations",
    title: "Manage Reservations",
    icon: <InventoryIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Approvals",
  },
  {
    segment: "approveReservations",
    title: "Approve Reservations",
    icon: <CheckCircleIcon />,
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
    segment: "assignEvents",
    title: "Assign Events",
    icon: <EventAvailableIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Role Section",
  },
  {
    segment: "roles",
    title: "Roles",
    icon: <CameraAltIcon />,
  },
  {
    segment: "assignroles",
    title: "Assign Roles",
    icon: <AssignmentIndIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    segment: "payments",
    title: "Payments",
    icon: <PaymentIcon />,
  },
  {
    kind: "divider",
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
    switch (router.pathname) {
      case "/people":
        return <PeopleComponent />;
      case "/packages":
        return <PackageComponent />;
      case "/approveReservations":
        return <AdminReservationApprovals />;
      default:
        return <PeopleComponent />;
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
