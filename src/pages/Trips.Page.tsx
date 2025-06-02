import {
    ActionIcon,
    Button,
    Container,
    Group,
    NumberInput,
    Paper,
    Select,
    Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCheck, IconTrash, Icon, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { TripCard } from '@/components/TripCard';
import { useNavigate } from 'react-router-dom';

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

type Route = {
    id: number;
    start_address: string;
    stop_address: string;
};

type Vehicle = {
    id: number;
    brand: string;
    license_plate: string;
};

const TripsPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            route_id: '',
            vehicle_id: '',
            departure_time: '',
            arrival_time: '',
            seats_count: 1,
            price: 0,
        },
        validate: {
            route_id: (v: any) => (v ? null : 'Выберите маршрут'),
            vehicle_id: (v: any) => (v ? null : 'Выберите автомобиль'),
            departure_time: (v: any) => (v ? null : 'Укажите время отправления'),
            arrival_time: (v: any) => (v ? null : 'Укажите время прибытия'),
        },
    });

    const fetchAll = async () => {
        const [routesRes, vehiclesRes, userRes] = await Promise.all([
            axios.get('/routes'),
            axios.get('/vehicles'),
            axios.get('/users/me'),
        ]);
        setRoutes(routesRes.data);
        setVehicles(vehiclesRes.data);
        setUserId(userRes.data.id);
        const tripsRes = await axios.get<Trip[]>(`/users/${userRes.data.id}/trips`);
        const uniqueTrips = Array.from(
            new Map(tripsRes.data.map((t: any) => [t.id, t])).values()
        );
        setTrips(uniqueTrips);
    };

    const handleAdd = async (values: typeof form.values) => {
        await axios.post('/trips', {
            route_id: parseInt(values.route_id),
            vehicle_id: parseInt(values.vehicle_id),
            departure_time: new Date(values.departure_time).toISOString(),
            arrival_time: new Date(values.arrival_time).toISOString(),
            seats_count: values.seats_count,
            price: values.price,
        });
        form.reset();
        fetchAll();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`/trips/${id}`);
        setTrips((prev) => prev.filter((t) => t.id !== id));
    };

    const handleComplete = async (id: number) => {
        await axios.post(`/trips/${id}/complete`);
        fetchAll();
    };

    const handleShowBookings = (tripId: number) => {
        navigate(`/trips/${tripId}/bookings`);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Container>
            <Title order={2} mb="md">
                Поездки
            </Title>

            <Paper withBorder p="md" mb="xl">
                <form onSubmit={form.onSubmit(handleAdd)}>
                    <Group grow mb="md">
                        <Select
                            label="Маршрут"
                            data={routes.map((r) => ({
                                value: r.id.toString(),
                                label: `${r.start_address} → ${r.stop_address}`,
                            }))}
                            {...form.getInputProps('route_id')}
                            required
                        />
                        <Select
                            label="Автомобиль"
                            data={vehicles.map((v) => ({
                                value: v.id.toString(),
                                label: `${v.brand} (${v.license_plate})`,
                            }))}
                            {...form.getInputProps('vehicle_id')}
                            required
                        />
                    </Group>

                    <Group grow mb="md">
                        <DateTimePicker
                            label="Отправление"
                            value={form.values.departure_time ? new Date(form.values.departure_time) : null}
                            onChange={(value) =>
                                form.setFieldValue('departure_time', value?.toString() || '')
                            }
                            error={form.errors.departure_time}
                            required
                        />
                        <DateTimePicker
                            label="Прибытие"
                            value={form.values.arrival_time ? new Date(form.values.arrival_time) : null}
                            onChange={(value) =>
                                form.setFieldValue('arrival_time', value?.toString() || '')
                            }
                            error={form.errors.arrival_time}
                            required
                        />
                    </Group>

                    <Group grow>
                        <NumberInput
                            label="Кол-во мест"
                            {...form.getInputProps('seats_count')}
                            min={1}
                            required
                        />
                        <NumberInput
                            label="Цена"
                            prefix="₽ "
                            {...form.getInputProps('price')}
                            min={0}
                            step={50}
                            required
                        />
                    </Group>

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" leftSection={<IconPlus size={16} />} fullWidth>Создать поездку</Button>
                    </Group>
                </form>
            </Paper>

            <Group dir="column" gap="md">
                {trips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        showBook={handleShowBookings}
                        rightSection={
                            <Group gap="xs">
                                {!trip.is_completed && (
                                    <ActionIcon
                                        color="blue"
                                        variant="subtle"
                                        onClick={() => handleComplete(trip.id)}
                                    >
                                        <IconCheck size={18} />
                                    </ActionIcon>
                                )}
                                {trip.is_completed && (
                                    <IconCheck size={18} color='red' />
                                )}
                                <ActionIcon
                                    color="red"
                                    variant="subtle"
                                    onClick={() => handleDelete(trip.id)}
                                >
                                    <IconTrash size={18} />
                                </ActionIcon>
                            </Group>
                        }
                    />
                ))}
            </Group>
        </Container>
    );
};

export default TripsPage;
