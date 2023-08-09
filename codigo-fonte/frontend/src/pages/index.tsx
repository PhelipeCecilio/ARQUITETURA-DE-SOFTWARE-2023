import nookies from 'nookies';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { api } from '../services/api';
import { Button, Container } from '@mantine/core';
import Router from 'next/router';
import { IconLogout } from '@tabler/icons';

export default function HomePage(props: any) {
  function handleLogout() {
    nookies.destroy(null, 'token');

    Router.push('/login');
  }

  return (
    <>
      <Container fluid>
        <Button leftIcon={<IconLogout />} variant="subtle" onClick={handleLogout}>
          Sair
        </Button>

      </Container>
      dashboard: {props.dashboard}
      <ColorSchemeToggle />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const cookies = nookies.get(ctx);
  const token = cookies.token;

  if (token) {
    try {
      const response = await api.get('/api/dashboard', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const dashboard = response.data;

      return { props: { dashboard: dashboard } };
    } catch (err) {
      console.log(err);
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: {},
  };
}
