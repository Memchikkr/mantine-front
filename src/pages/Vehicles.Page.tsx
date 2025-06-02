import React from 'react';
import axios from '@/api/axios';
import { useForm } from '@mantine/form';
import {
    Button,
    Container,
    TextInput,
    Title,
    ActionIcon,
    Group,
    Loader,
    Notification,
    Paper,
} from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { VehicleCard } from '@/components/VehicleCard';

interface Vehicle {
    id: number;
    user_id: number;
    brand: string;
    license_plate: string;
}

export function VehiclesPage() {
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const form = useForm({
        initialValues: {
            brand: '',
            license_plate: '',
        },
        validate: {
            brand: (value: any) => (value.trim().length === 0 ? 'Введите марку' : null),
            license_plate: (value: any) =>
                value.trim().length === 0 ? 'Введите номер' : null,
        },
    });

    const fetchVehicles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/vehicles');
            setVehicles(res.data);
        } catch (e) {
            setError('Ошибка при загрузке автомобилей');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchVehicles();
    }, []);

    const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        try {
            await axios.post(
                '/vehicles',
                {
                    brand: values.brand,
                    license_plate: values.license_plate,
                },
            );
            form.reset();
            fetchVehicles();
        } catch (e) {
            setError('Ошибка при добавлении автомобиля');
        }
    };

    const handleDelete = async (id: number) => {
        setError(null);
        try {
            await axios.delete(`/vehicles/${id}`);
            setVehicles((vs) => vs.filter((v) => v.id !== id));
        } catch (e) {
            setError('Ошибка при удалении автомобиля');
        }
    };

    return (
        <Container>
            <Title order={2} mb="md">
                Автомобили
            </Title>
            <Paper withBorder p="md" mb="xl">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group grow mb="md">
                        <TextInput
                            label="Марка"
                            placeholder="BMW"
                            {...form.getInputProps('brand')}
                            required
                        />
                        <TextInput
                            label="Номер"
                            placeholder="М798КМ136"
                            {...form.getInputProps('license_plate')}
                            required
                        />
                    </Group>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" leftSection={<IconPlus size={16} />} fullWidth>
                            Добавить автомобиль
                        </Button>
                     </Group>
                </form>
            </Paper>

            {error && (
                <Notification color="red" mt="md" onClose={() => setError(null)}>
                    {error}
                </Notification>
            )}

            {loading ? (
                <Loader mt="xl" />
            ) : vehicles.length === 0 ? (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    Автомобили не найдены
                </div>
            ) : (
                <Group dir="column" gap="md">
                    {vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle}
                            rightSection={
                                <Group gap="xs">
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => handleDelete(vehicle.id)}
                                    >
                                        <IconTrash size={18} />
                                    </ActionIcon>
                                </Group>
                            } />
                    ))}
                </Group>
            )}
        </Container>
    );
}
