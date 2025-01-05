import {
  Group,
  Button,
  Box,
} from '@mantine/core';
import classes from './header.module.css';
import { redirect } from "next/navigation";
import { getCurrentSession, invalidateSession, deleteSessionTokenCookie } from '@/auth/session';

interface ActionResult {
  error: string | null;
}

async function logout(): Promise<ActionResult> {
  "use server";
  const {session} = await getCurrentSession();
  if (!session) {
    return {
      error: "You are not logged in"
    }
  }

  await invalidateSession(session.id)
  await deleteSessionTokenCookie()
  return redirect("/")
}

const Logout = ( {user}: {user: {username: string}} ) => { 
  return (
    <>
      {user.username}
      <form action={logout}>
        <Button type="submit">Log out</Button>
      </form>
    </>
  )
}

const Login = () => {
  return (
    <a href="/login/google">
      <Button>Log in</Button>
    </a>
  )
}
  
export async function HeaderMenu() {
  const { user } = await getCurrentSession();
		return (
      <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" px={20}>
          <a href='/' className={classes.logo}>
            Ranker
          </a>
          <Group h="100%" gap={0}>
          </Group>
          <Group>
            {user 
              ? <Logout user={user}/> 
              : <Login />
            }
          </Group>
        </Group>
      </header>
    </Box>
    )
}

