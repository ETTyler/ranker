'use client';

import Link from 'next/link'
import { Container, Title, Image, Badge, Text, Button, Group, Stack, Grid, ThemeIcon, Box, Paper, rgba } from "@mantine/core";
import { motion } from 'motion/react'
import classes from './page.module.css'
import listPic from '../../public/undraw_advanced-customization_7ms4.svg'
import { HeaderMenu } from './dashboard/header/header';

export default function Home() {
  return (
    <Container
    bg="var(--mantine-color-body)"
    px={0}
    py={{
      base: 'calc(var(--mantine-spacing-lg) * 2)',
      xs: 'calc(var(--mantine-spacing-lg) * 2)',
      lg: 'calc(var(--mantine-spacing-lg) * 3)',
    }}
    fluid
  >
    <Container size="xl">
      <Stack align="center" gap="sm">
        <motion.div
          initial={{ opacity: 0.0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
        </motion.div>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
        >
          <Title className={classes?.title} order={1} size="h1">
            Ranker
          </Title>
          </motion.div>
        <motion.div
          initial={{ opacity: 0.0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
          viewport={{ once: true }}
        >
          <Text c="dimmed" fz="xl" ta="center" mb="md" style={{ textWrap: 'balance' }}>
            Create a ranked list of your favourite rollercoasters.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button component={Link} href="/dashboard" radius="md" size="lg" className={classes.cta}>
              Get started
            </Button>
          </motion.div>
        </motion.div>
      </Stack>
    </Container>
    <Container size="xl" mt="calc(var(--mantine-spacing-xl) * 2)" px={0}>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true }}
      >
          <Image 
            src={listPic.src} 
            width={100}
            alt="Illustration of a person searching for a rollercoaster"
          />
      </motion.div>
    </Container>
  </Container>
  )
}
