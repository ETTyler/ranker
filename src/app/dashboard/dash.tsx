import { Stack } from '@mantine/core'

export default function Dash({
    children,
  }: {
    children: React.ReactNode
  }) {

  return (
    <>
      <Stack 
        p={20}
        align="center"
        justify="flex-start"
        w='100vw'
      >
        {children}
      </Stack>
    </>
  )
}
