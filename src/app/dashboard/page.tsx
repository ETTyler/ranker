'use server'

import { HeaderMenu } from '../dashboard/header/header'
import Dash from '../dashboard/dash'
import Coasters from './coasters/coasters'
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/session";

export default async function Home() {
  const { user } = await getCurrentSession();
  if (!user) {
    return redirect("/login/google")
  }
  return (
    <div style={{
      background: 'var(--mantine-color-body)'
    }}>
      <HeaderMenu />
      <Dash>
        <Coasters userID={user ? user.id : ''} />
      </Dash>
    </div>
  )
}
