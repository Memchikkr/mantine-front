import { NavLink as MantineLink } from '@mantine/core';
import { NavLink } from "react-router-dom";
import { IconLogout } from '@tabler/icons-react';

export const LogoutButton = () => {

    const handleLogout = () => {
        localStorage.removeItem('access_token');
    };

    return <MantineLink
        key={'/'}
        label={'Выйти'}
        component={NavLink}
        to={'/'}
        onClick={handleLogout}
        leftSection={<IconLogout size={18}/>}
        style={({ isActive }: { isActive: boolean }) => ({
            fontWeight: isActive ? "bold" : undefined,
            color: isActive ? "#1c7ed6" : undefined,
        })}
    />;
};
