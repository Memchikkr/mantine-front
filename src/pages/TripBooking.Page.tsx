import {
    Container,
    Group,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { BookingCard } from '@/components/BookingCard';
import { useParams } from 'react-router-dom';

type Booking = {
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

export default function TripBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string }>();

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/trips/${id}/bookings`);
            setBookings(res.data);
        } catch (err) {
            console.error('Ошибка при загрузке бронирований', err);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchBookings();
    }, []);

    return (
        <Container>
            <Title order={2} mb="md">
                Бронирования
            </Title>

            {bookings.length === 0 ? (
                <p>Бронирований пока нет.</p>
            ) : (
                <Group dir="column" gap="md">
                    {bookings.map((booking) => (<BookingCard key={booking.trip_id} booking={booking} />))}
                </Group>
            )}
        </Container>
    );
}
