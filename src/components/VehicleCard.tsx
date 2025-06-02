import { Card, Text, Group, Button } from '@mantine/core';

type VehicleCardProps = {
    vehicle: {
        id: number;
        brand: string;
        license_plate: string;
    };
    rightSection?: React.ReactNode;
};

export const VehicleCard = ({ vehicle, rightSection }: VehicleCardProps) => {
    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Group justify="space-between" mb="xs" align="flex-start">
                <div>
                    <Text size="l" fw={600}>
                        Автомобиль №{vehicle.id}
                    </Text>
                </div>
                {rightSection}
            </Group>

            <Text size="s">
                🚗 {vehicle.brand}
            </Text>
            <Text size="sm">🆔 {vehicle.license_plate}</Text>
        </Card >
    );
};
