import { MantineProvider, Container, Title, Text, Paper, Flex } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { TelegramAuth } from "../components/TelegramAuth";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
    const navigate = useNavigate();

    const handleSuccessAuth = () => {
        navigate('/profile', { replace: true });
    };
    return (
        <MantineProvider>
          <Notifications />
          <Container size="xs" py={40}>
            <Paper
              p="xl"
              shadow="sm"
              radius="md"
              withBorder
            >
              <Flex direction="column" align="center" gap="md">
                {/* Заголовок и описание */}
                <Title order={2}>Вход через Telegram</Title>
                <Text c="gray">
                  Авторизуйтесь, чтобы получить доступ к сервису
                </Text>
    
                {/* Кнопка Telegram */}
                <TelegramAuth onSuccess={handleSuccessAuth} />
    
                {/* Дополнительные элементы (опционально) */}
                <Text size="sm" c="gray" mt="md">
                  Нажимая кнопку, вы соглашаетесь с условиями сервиса
                </Text>
              </Flex>
            </Paper>
          </Container>
        </MantineProvider>
      );
    }
