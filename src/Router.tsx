import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from './pages/Auth.Page';
import ProfilePage from './pages/Profile.Page';
import { AppLayout } from './AppLayout';
import { VehiclesPage } from './pages/Vehicles.Page';
import RoutesPage from './pages/Routes.Page';
import TripsPage from './pages/Trips.Page';
import SearchTripsPage from './pages/SearchTrips.Page';
import BookingsPage from './pages/Booking.Page';
import TripBookingsPage from './pages/TripBooking.Page';

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <AuthPage /> },
        ],
    },
    {
        element: <AppLayout />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/vehicles", element: <VehiclesPage /> },
          { path: "/routes", element: <RoutesPage /> },
          { path: "/trips", element: <TripsPage /> },
          { path: "/search/trips", element: <SearchTripsPage /> },
          { path: "/bookings", element: <BookingsPage /> },
          { path: "/trips/:id/bookings", element: <TripBookingsPage /> },
        ],
      },
]);
