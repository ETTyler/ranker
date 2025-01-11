'use server'

import { HeaderMenu } from '../dashboard/header/header'
import Dash from '../dashboard/dash'
import Coasters from './coasters/coasters'
import Movies from './movies/movies'
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/session";
import { Tabs, TabsPanel, TabsList, TabsTab } from '@mantine/core'

export default async function Home() {
  const { user } = await getCurrentSession();
  if (!user) {
    return redirect("/login/google")
  }
  return (
    <div style={{
      background: 'var(--mantine-color-body)',
    }}>
      <Dash>
      <Tabs variant='pills' defaultValue="coasters">
          <TabsList>
            <TabsTab value="coasters">Coasters</TabsTab>
            <TabsTab value="movies">Movies</TabsTab>
          </TabsList>

          <TabsPanel value="coasters" py="md">
            <Coasters userID={user ? user.id : ''} />
          </TabsPanel>

          <TabsPanel value="movies" py="md">
            <Movies userID={user ? user.id : ''} />
          </TabsPanel>
        </Tabs>
      </Dash>
    </div>
  )
}
