'use server'

import { HeaderMenu } from '../dashboard/header/header'
import Dash from '../dashboard/dash'
import Coasters from './coasters/coasters'
import Movies from './movies/movies'
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/session";
import { Tabs, TabsPanel, TabsList, TabsTab, Stack} from '@mantine/core'

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
        <Tabs variant='default' defaultValue="coasters">
          <TabsList>
            <TabsTab value="coasters">Coasters</TabsTab>
            <TabsTab value="movies">Movies</TabsTab>
          </TabsList>

          <TabsPanel value="coasters" py="md">
            <Stack         
              align="center"
              justify="flex-start"
            >
              <Coasters userID={user ? user.id : ''} />
            </Stack>
          </TabsPanel>

          <TabsPanel value="movies" py="md">
            <Stack         
              align="center"
              justify="flex-start"
            >
              <Movies userID={user ? user.id : ''} />
            </Stack>
          </TabsPanel>
        </Tabs>
      </Dash>
    </div>
  )
}
