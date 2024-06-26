import {
  Group,
  Button,
  Box,
} from '@mantine/core';
import classes from './header.module.css';
import { lucia, validateRequest } from "../../../auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { log } from 'console';

interface ActionResult {
  error: string | null;
}

async function logout(): Promise<ActionResult> {
  "use server";
  const {session} = await validateRequest();
  if (!session) {
    return {
      error: "You are not logged in"
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect("/dashboard")
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
    <a href="/login/github">
      <Button>Log in</Button>
    </a>
  )
}
  
export async function HeaderMenu() {
  const { user } = await validateRequest();
		return (
      <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" px={20}>
          <a href='#' className={classes.logo}>
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

