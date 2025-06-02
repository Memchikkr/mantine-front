import {
    Button,
    Container,
    Group,
    Paper,
    TextInput,
    Title,
    ActionIcon,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { IconPlus, IconTrash } from '@tabler/icons-react';
  import { useEffect, useState } from 'react';
  import axios from '@/api/axios';
import { RouteCard } from '@/components/RouteCard';
  
  type Route = {
    id: number;
    start_address: string;
    start_latitude: number;
    start_longitude: number;
    stop_address: string;
    stop_latitude: number;
    stop_longitude: number;
  };
  
  export default function RoutesPage() {
    const [routes, setRoutes] = useState<Route[]>([]);
  
    const form = useForm({
      initialValues: {
        start_address: '',
        start_latitude: '',
        start_longitude: '',
        stop_address: '',
        stop_latitude: '',
        stop_longitude: '',
      },
  
      validate: {
        start_address: (v: any) => (v ? null : 'Введите начальный адрес'),
        stop_address: (v: any) => (v ? null : 'Введите конечный адрес'),
        start_latitude: (v: any) => (isNaN(+v) ? 'Число' : null),
        start_longitude: (v: any) => (isNaN(+v) ? 'Число' : null),
        stop_latitude: (v: any) => (isNaN(+v) ? 'Число' : null),
        stop_longitude: (v: any) => (isNaN(+v) ? 'Число' : null),
      },
    });
  
    const fetchRoutes = async () => {
      try {
        const res = await axios.get('/routes');
        setRoutes(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке маршрутов', err);
      }
    };
  
    const handleAdd = async (values: typeof form.values) => {
      try {
        await axios.post('/routes', {
          start_address: values.start_address,
          start_latitude: parseFloat(values.start_latitude),
          start_longitude: parseFloat(values.start_longitude),
          stop_address: values.stop_address,
          stop_latitude: parseFloat(values.stop_latitude),
          stop_longitude: parseFloat(values.stop_longitude),
        });
        form.reset();
        fetchRoutes();
      } catch (err) {
        console.error('Ошибка при добавлении маршрута', err);
      }
    };
  
    const handleDelete = async (id: number) => {
      try {
        await axios.delete(`/routes/${id}`);
        setRoutes((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        console.error('Ошибка при удалении маршрута', err);
      }
    };
  
    useEffect(() => {
      fetchRoutes();
    }, []);
  
    return (
      <Container>
        <Title order={2} mb="md">
          Маршруты
        </Title>
  
        <Paper withBorder p="md" mb="xl">
          <form onSubmit={form.onSubmit(handleAdd)}>
            <Group grow mb="md">
              <TextInput label="Откуда" {...form.getInputProps('start_address')} required/>
              <TextInput label="Широта" {...form.getInputProps('start_latitude')} required/>
              <TextInput label="Долгота" {...form.getInputProps('start_longitude')} required/>
            </Group>
            <Group grow>
              <TextInput label="Куда" {...form.getInputProps('stop_address')} required/>
              <TextInput label="Широта" {...form.getInputProps('stop_latitude')} required/>
              <TextInput label="Долгота" {...form.getInputProps('stop_longitude')} required/>
            </Group>
            <Group justify="flex-end" mt="md">
              <Button type="submit" leftSection={<IconPlus size={16} />} fullWidth>Добавить</Button>
            </Group>
          </form>
        </Paper>
  
        {routes.length === 0 ? (
          <p>Маршрутов пока нет.</p>
        ) : (
          <Group dir="column" gap="md">
                    {routes.map((route) => (
                        <RouteCard key={route.id} route={route}
                            rightSection={
                                <Group gap="xs">
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => handleDelete(route.id)}
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
