import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Paper,
  Loader,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from '@/api/axios';

interface User {
  id: number;
  phone_number: string;
  name: string;
  surname: string;
  username: string;
  description: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      phone_number: '',
      name: '',
      surname: '',
      username: '',
      description: '',
    },

    validate: {
      phone_number: (value: any) =>
        value.length < 10 ? 'Введите корректный номер' : null,
      name: (value: any) => (!value ? 'Введите имя' : null),
      surname: (value: any) => (!value ? 'Введите фамилию' : null),
      username: (value: any) => (!value ? 'Введите username' : null),
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get<User>('/users/me');
        form.setValues({
          phone_number: data.phone_number,
          name: data.name,
          surname: data.surname,
          username: data.username,
          description: data.description || '',
        });
      } catch (err) {
        notifications.show({
          title: 'Ошибка загрузки',
          message: 'Не удалось получить данные профиля',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await axios.put('/users/me', values);
      notifications.show({
        title: 'Успешно',
        message: 'Профиль обновлён',
        color: 'green',
      });
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить профиль',
        color: 'red',
      });
    }
  };

  if (loading) {
    return (
      <Container py="xl">
        <Loader />
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper shadow="sm" p="xl" withBorder>
        <Title order={3} mb="lg">
          Профиль
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Телефон"
              {...form.getInputProps('phone_number')}
            />
            <TextInput label="Имя" {...form.getInputProps('name')} />
            <TextInput label="Фамилия" {...form.getInputProps('surname')} />
            <TextInput label="Username" {...form.getInputProps('username')} />
            <Textarea
              label="Описание"
              autosize
              minRows={3}
              {...form.getInputProps('description')}
            />
            <Button type="submit">Сохранить</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
