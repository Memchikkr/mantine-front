import { Card, Text, Group, Button } from '@mantine/core';

type BookingCardProps = {
    booking: {
        trip_id: number;
        user_id: number;
        booking_time: string;
        is_approved: boolean;
        departure_time: string;
        arrival_time: string;
        price: number;
        is_completed: boolean;
        driver_id: number;
        phone_number: string;
        tg_username: string;
        start_address: string;
        start_latitude: number;
        start_longitude: number;
        stop_address: string;
        stop_latitude: number;
        stop_longitude: number;
        brand: string;
        license_plate: string;
    };
    rightSection?: React.ReactNode;
};

export const BookingCard = ({ booking, rightSection }: BookingCardProps) => {
    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Group justify="space-between" mb="xs" align="flex-start">
                <div>
                    <Text size="lg" fw={600}>
                        {booking.start_address} → {booking.stop_address}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {new Date(booking.departure_time).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        –{' '}
                        {new Date(booking.arrival_time).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                    <Text size="sm" c="dimmed">
                        🕘Время бронирования: {new Date(booking.booking_time).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                    {booking.is_approved && (<Text size="xs" fw={600}>
                        ✅Бронь подтверждена
                    </Text>)}
                    {!booking.is_approved && (
                        <Text size="xs" fw={600}>
                        ❌Бронь не подтверждена
                    </Text>)}
                </div>

                {rightSection}
            </Group>

            <Text size="sm" mt="xs">
                🚗 {booking.brand} ({booking.license_plate})
            </Text>
            {booking.tg_username && (
                <Text size="sm" component="a" href={`https://t.me/${booking.tg_username}`} c='lightblue'>
                    ✍Telegram: @{booking.tg_username}
                </Text>
            )
            }
            {
                booking.phone_number && (
                    <Text size="sm">📱Телефон: {booking.phone_number}</Text>
                )
            }

            {booking.is_completed && (<Text size="sm">✅🛣Поездка завершена</Text>)}
            {!booking.is_completed && (<Text size="sm">🕓🛣Поездка в процессе</Text>)}
        </Card >
    );
};
