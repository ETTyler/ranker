import Image from 'next/image'
import styles from '../page.module.css'
import { HeaderMenu } from '../dashboard/header/header'
import Coaster from '../dashboard/components/coaster'
import { Container } from '@mantine/core'

export default function Home() {
  return (
    <>
      <HeaderMenu />
      <Container p={30}>
        <Coaster />
      </Container>
    </>
  )
}
