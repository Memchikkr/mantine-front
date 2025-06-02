import { Card, Text, Group, Button } from '@mantine/core';

type RouteCardProps = {
    route: {
        id: number;
        start_address: string;
        start_latitude: number;
        start_longitude: number;
        stop_address: string;
        stop_latitude: number;
        stop_longitude: number;
    };
    rightSection?: React.ReactNode;
};

export const RouteCard = ({ route, rightSection }: RouteCardProps) => {
    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Group justify="space-between" mb="xs" align="flex-start">
                <div>
                    <Text size="lg" fw={600}>
                        {route.start_address} → {route.stop_address}
                    </Text>
                </div>
                {rightSection}
            </Group>

            <Text size="s" component='a' c={"blue"}
                href={`https://yandex.ru/maps/?ll=${route.start_longitude}%2C${route.start_latitude}&mode=search&sll=${route.start_longitude}%2C${route.start_latitude}&text=${route.start_latitude}%2C${route.start_longitude}&z=13.46`}>
                📍 {route.start_latitude}, {route.start_longitude}
            </Text>
            <Text size="s" component='a' c={"blue"}
                href={`https://yandex.ru/maps/?ll=${route.stop_longitude}%2C${route.stop_latitude}&mode=search&sll=${route.stop_longitude}%2C${route.stop_latitude}&text=${route.stop_latitude}%2C${route.stop_longitude}&z=13.46`}>
                🏁 {route.stop_latitude}, {route.stop_longitude}
            </Text>
        </Card >
    );
};
