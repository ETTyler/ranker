'use server'

import { HeaderMenu } from '../dashboard/header/header'
import Dash from '../dashboard/dash'
import Coasters from './coasters/coasters'
import { lucia, validateRequest } from '../../auth'
import { redirect } from "next/navigation";
import { getCurrentSession } from "../../../src/auth/session";

export default async function Home() {
  const { user } = await getCurrentSession();

  return (
    <div style={{
      height: '100vh',
    }}>
      <HeaderMenu />
      <Dash>
        <Coasters userID={user ? user.id : ''} />
      </Dash>
    </div>
  )
}
