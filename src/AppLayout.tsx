import { Outlet, NavLink } from "react-router-dom";
import { AppShell, Group, NavLink as MantineLink } from "@mantine/core";
import {
    IconUser,
    IconCar,
    IconMap,
    IconRoad,
    IconRoadSign,
    IconCalendar,
} from "@tabler/icons-react";
import { LogoutButton } from "./components/LogoutButton";

export function AppLayout() {
    const menu = [
        { label: "Профиль", icon: <IconUser size={18} />, to: "/profile" },
        { label: "Автомобили", icon: <IconCar size={18} />, to: "/vehicles" },
        { label: "Маршруты", icon: <IconMap size={18} />, to: "/routes" },
        { label: "Мои поездки", icon: <IconRoadSign size={18} />, to: "/trips" },
        { label: "Найти поездку", icon: <IconRoad size={18} />, to: "/search/trips" },
        { label: "Бронирования", icon: <IconCalendar size={18} />, to: "/bookings" },
    ];

    return (
        <AppShell
            padding="md"
            navbar={{
                width: 220,
                breakpoint: "sm",
            }}
        >
            <AppShell.Navbar p="xs">
                {menu.map((item) => (
                    <MantineLink
                        key={item.to}
                        label={item.label}
                        component={NavLink}
                        to={item.to}
                        leftSection={item.icon ? item.icon : undefined}
                        style={({ isActive }: { isActive: boolean }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            color: isActive ? "#1c7ed6" : undefined,
                        })}
                    />
                ))}
                <Group>
                    <LogoutButton />
                </Group>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
