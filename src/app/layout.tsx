import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { HeaderMenu } from './dashboard/header/header';

import { createMantineTheme } from './lib/create-mantine-theme';

const meta: Metadata = {
  title: 'Ranker',
  description: 'Create a ranked list of your favourite roller coasters.',
}

const theme = createMantineTheme({
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "Inter, sans-serif",
  baseHue: 250,
  baseSaturation: 30,
  colors: {
    primary: [
      "#ecefff",
      "#d5dafb",
      "#a9b1f1",
      "#7a87e9",
      "#5362e1",
      "#3a4bdd",
      "#2c40dc",
      "#1f32c4",
      "#182cb0",
      "#0a259c",
    ],
    secondary: [
      "#e1f8ff",
      "#cbedff",
      "#9ad7ff",
      "#64c1ff",
      "#3aaefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0079cd",
      "#0068b6",
    ],
    tertiary: [
      "#ecf4ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc0",
      "#5f7cb7",
      "#5474b4",
      "#44639f",
      "#3a5890",
      "#2c4b80",
    ],
  },
})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='dark' theme={theme}>
          <Notifications />
          <HeaderMenu />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
