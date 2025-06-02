import {
    Button,
    Container,
    Group,
    NumberInput,
    Paper,
    TextInput,
    Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import axios from '@/api/axios';
import { showNotification } from '@mantine/notifications';
import { TripCard } from '@/components/TripCard';

type Trip = {
    id: number;
    departure_time: string;
    arrival_time: string;
    seats_count: number;
    price: number;
    is_completed: boolean;
    name: string;
    surname: string;
    phone_number: string;
    tg_username: string;
    description: string;
    start_address: string;
    start_latitude: number;
    start_longitude: number;
    stop_address: string;
    stop_latitude: number;
    stop_longitude: number;
    brand: string;
    license_plate: string;
    bookings_count: number;
    available_seats: number;
    driver_id: number;
};

const SearchTripsPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    const form = useForm({
        initialValues: {
            from: '',
            to: '',
            date: '',
            min_seats: null as number | null,
            max_price: null as number | null,
        },
    });

    const fetchTrips = async (values: typeof form.values) => {
        const userRes = await axios.get('/users/me');
        setUserId(userRes.data.id);
        setLoading(true);
        try {
            const params: Record<string, any> = {};
            if (values.from) params.from = values.from;
            if (values.to) params.to = values.to;
            if (values.date) params.date = values.date.toString().split('T')[0];
            if (values.min_seats !== null) params.min_seats = values.min_seats;
            if (values.max_price !== null) params.max_price = values.max_price;

            const { data } = await axios.get('/trips', { params });
            setTrips(data);
        } catch {
            showNotification({
                title: 'Ошибка',
                message: 'Не удалось загрузить поездки',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (tripId: number) => {
        try {
            await axios.post(`/trips/${tripId}/bookings`);
            showNotification({
                title: 'Успех',
                message: 'Поездка забронирована',
                color: 'green',
            });
            fetchTrips(form.values);
        } catch {
            showNotification({
                title: 'Ошибка',
                message: 'Не удалось забронировать поездку',
                color: 'red',
            });
        }
    };

    return (
        <Container>
            <Title order={2} mb="md">
                Поиск и бронирование поездок
            </Title>

            <Paper withBorder p="md" mb="xl">
                <form
                    onSubmit={form.onSubmit((values) => {
                        fetchTrips(values);
                    })}
                >
                    <Group grow mb="md">
                        <TextInput
                            label="Откуда"
                            placeholder="Город отправления"
                            {...form.getInputProps('from')}
                        />
                        <TextInput label="Куда" placeholder="Город назначения" {...form.getInputProps('to')} />
                        <DatePickerInput
                            style={{ width: '100%' }}
                            label="Дата события"
                            {...form.getInputProps('date')}
                            value={form.values.date ? new Date(form.values.date) : null}
                            onChange={(value: any) => {
                                form.setFieldValue('date', value ? value.toString() : null);
                            }}
                        />
                    </Group>

                    <Group grow mb="md">
                        <NumberInput
                            label="Мин. кол-во мест"
                            min={0}
                            {...form.getInputProps('min_seats')}
                        />
                        <NumberInput
                            label="Макс. цена"
                            min={0}
                            {...form.getInputProps('max_price')}
                        />
                    </Group>

                    <Group align="right">
                        <Button type="submit" fullWidth loading={loading}>
                            Найти поездки
                        </Button>
                    </Group>
                </form>
            </Paper>

            {trips.length > 0 && (
                <Group dir="column" gap="md">
                    {trips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} 
                        onBook={trip.driver_id !== userId ? handleBook : undefined} />
                    ))}
                </Group>
            )}
        </Container>
    );
};

export default SearchTripsPage;
