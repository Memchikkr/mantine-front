import { Card, Text, Group, Button } from '@mantine/core';

type TripCardProps = {
    trip: {
        id: number;
        driver_id: number;
        departure_time: string;
        arrival_time: string;
        seats_count: number;
        available_seats: number;
        bookings_count: number;
        price: number;
        is_completed: boolean;
        start_address: string;
        start_latitude: number;
        start_longitude: number;
        stop_address: string;
        stop_latitude: number;
        stop_longitude: number;
        brand: string;
        license_plate: string;
        name: string;
        surname: string;
        phone_number?: string;
        tg_username?: string;
        description?: string;
    };
    showBook?: (tripId: number) => void;
    onBook?: (tripId: number) => void;
    rightSection?: React.ReactNode;
};

export const TripCard = ({ trip, onBook, showBook, rightSection }: TripCardProps) => {
    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Group justify="space-between" mb="xs" align="flex-start">
                <div>
                    <Text size="lg" fw={600} component='a' href={`https://yandex.ru/maps/?mode=routes&rtext=${trip.start_latitude}%2C${trip.start_longitude}~${trip.stop_latitude}%2C${trip.stop_longitude}&rtt=auto`}>
                        {trip.start_address} → {trip.stop_address}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {new Date(trip.departure_time).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        –{' '}
                        {new Date(trip.arrival_time).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                    <Text size="xs" fw={600}>
                        Доступно {trip.available_seats} мест из {trip.seats_count}
                    </Text>
                </div>

                {rightSection}
            </Group>

            <Text size="sm" mt="xs">
                🚗 {trip.brand} ({trip.license_plate})
            </Text>
            <Text size="sm">👤 {trip.name} {trip.surname}</Text>
            {trip.tg_username && (
                <Text size="sm" component="a" href={`https://t.me/${trip.tg_username}`} c='lightblue'>
                    ✍Telegram: @{trip.tg_username}
                </Text>
            )
            }
            {
                trip.phone_number && (
                    <Text size="sm">📱Телефон: {trip.phone_number}</Text>
                )
            }
            {
                trip.description && (
                    <Text size="sm" c="dimmed" mt={4}>
                        📋{trip.description}
                    </Text>
                )
            }

            {
                onBook && (
                    <Group justify="flex-end" mt="md">
                        {!trip.is_completed && trip.available_seats > 0 ? (
                            <Button size="xs" onClick={() => onBook(trip.id)}>
                                Забронировать
                            </Button>
                        ) : (
                            <Button size="xs" disabled>
                                {trip.is_completed ? 'Завершена' : 'Нет мест'}
                            </Button>
                        )}
                    </Group>
                )
            }
            {
                showBook && (
                    <Group justify="flex-end" mt="md">
                        {(
                            <Button size="xs" onClick={() => showBook(trip.id)}>
                                Показать бронирования
                            </Button>
                        )}
                    </Group>
                )
            }
        </Card >
    );
};
