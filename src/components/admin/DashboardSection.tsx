import React, { useEffect, useState } from "react";
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import logo from "@app_assets/logo/png/logo-no-background.png";
import CollectionsIcon from '@mui/icons-material/Collections';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
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
import RoleComponent from "@app_components/admin/Role/ManageRoles";
import StaffRoleAssign from "@app_components/admin/Role/ManageStaffRoles";
import EventAlbumStatus from "@app_components/admin/Event/EventAlbumStatus";
import EventStaffAssign from "@app_components/admin/Event/EventStaffAssign";
import DashboardStats from "@app_components/admin/DashboardStat/DashboardStats";
import AddHoliday from "@app_components/admin/Holiday/AddHoliday";
import UserProfileUpdate from "@app_components/admin/UserProfile/UserProfileUpdate"
import { getUserIdFromToken } from "@app_api/helper/getUserIdFromToken";
import AlbumUploader from "../AlbumUploader";
import EventsSidebar from "./Event/EventsSidebar";
import { getAlbumByEventId } from "@app_api/AlbumApi";
import type { AlbumDto } from "@app_api/AlbumApi";

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
    segment: "holiday",
    title: "Holiday",
    icon: <HomeRepairServiceIcon />,
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

  // --- Album & Event selection state ---
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [album, setAlbum] = useState<AlbumDto | null>(null);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [albumError, setAlbumError] = useState<string | null>(null);

  // Fetch album when event changes
  useEffect(() => {
    if (selectedEventId) {
      setAlbumLoading(true);
      setAlbumError(null);
      getAlbumByEventId(selectedEventId)
        .then(setAlbum)
        .catch(() => setAlbumError("Failed to load album."))
        .finally(() => setAlbumLoading(false));
    } else {
      setAlbum(null);
    }
  }, [selectedEventId]);

  const renderContent = () => {
    const userId = getUserIdFromToken();

    switch (router.pathname) {
      case "/dashboard":
        return <DashboardStats />;
      case "/people":
        return <PeopleComponent />;
      case "/holiday":
        return <AddHoliday />;
      case "/packages":
        return <PackageComponent />;
      case "/approveReservations":
        return <AdminReservationApprovals />;
      case "/roles":
        return <RoleComponent />;
      case "/assignroles":
        return <StaffRoleAssign />;
      case "/events":
        return <EventAlbumStatus />;
      case "/assignEvents":
        return <EventStaffAssign />;
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
              <AlbumUploader eventId={selectedEventId} album={album} />
              {albumLoading && <div>Loading album…</div>}
              {albumError && <div style={{ color: 'red' }}>{albumError}</div>}
            </div>
            <div style={{ flex: 1, borderLeft: '2px solid #eee', padding: '2rem', background: '#fafafa' }}>
              <EventsSidebar selectedId={selectedEventId} onSelect={setSelectedEventId} />
            </div>
          </div>
        );
      default:
        return <DashboardStats />;
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
