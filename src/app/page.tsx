'use client';

import Link from 'next/link'
import { Container, Title, Text, Button, Stack, Grid, Box } from "@mantine/core";
import { motion } from 'motion/react'
import classes from './page.module.css'

export default function Home() {
  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      {/* Hero Section */}
      <Container size="lg" py={{ base: 80, md: 100 }} px={{ base: 'md', xs: 'sm' }}>
        <Stack align="center" gap={40}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Title
                order={1}
                className={classes.title}
                ta="center"
              >
                RANKER
              </Title>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text
              size="lg"
              ta="center"
              style={{
                maxWidth: 600,
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
              }}
            >
              Create ranked lists of your favorite roller coasters, movies, and TV shows. Share them with friends and discover what matters most to you.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                href="/dashboard"
                size="lg"
                radius="8px"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </Stack>
      </Container>

      {/* Categories Section */}
      <Container size="lg" px={{ base: 'md', xs: 'sm' }}>
        <Stack gap={60}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <Title order={2} size="h2" mb="md" style={{ fontWeight: 800 }}>
              Choose Your Category
            </Title>
            <Text c="dimmed" size="lg">
              Pick what you love and start ranking
            </Text>
          </motion.div>

          <Grid gutter={{ base: 'lg', md: 'xl' }}>
            {[
              {
                emoji: '🎢',
                title: 'Roller Coasters',
                description: 'Experience the thrill! Rank your favorite roller coasters from around the world. Feel the rush of adrenaline with every twist and turn.',
                href: '/dashboard?category=coasters',
                delay: 0,
              },
              {
                emoji: '🎬',
                title: 'Movies',
                description: 'Curate your cinematic masterpiece! Rank the films that captivate you, from timeless classics to blockbuster hits.',
                href: '/dashboard?category=movies',
                delay: 0.1,
              },
              {
                emoji: '📺',
                title: 'TV Shows',
                description: 'Binge your way to a perfect list! Rank your favorite series and share your top shows with fellow enthusiasts.',
                href: '/dashboard?category=shows',
                delay: 0.2,
              },
            ].map((category, idx) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: category.delay }}
                  viewport={{ once: true }}
                >
                  <Link href={category.href} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Box
                        style={{
                          padding: '32px 24px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: 'rgba(255, 255, 255, 0.02)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          minHeight: '260px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                        className={classes.categoryCard}
                      >
                        <motion.div 
                          style={{ fontSize: '40px' }}
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {category.emoji}
                        </motion.div>
                        <Title order={3} size="h5" style={{ fontWeight: 700 }}>
                          {category.title}
                        </Title>
                        <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                          {category.description}
                        </Text>
                      </Box>
                    </motion.div>
                  </Link>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Features Section */}
      <Container size="lg" py={80} px={{ base: 'md', xs: 'sm' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Stack gap={40}>
            <motion.div>
              <Title order={2} size="h2" mb="md" style={{ fontWeight: 800 }}>
                How It Works
              </Title>
            </motion.div>

            <Grid gutter={40}>
              {[
                {
                  step: '1',
                  title: 'Search',
                  description: 'Find and add your favorite items from our database',
                },
                {
                  step: '2',
                  title: 'Rank',
                  description: 'Drag and drop to organize them in your preferred order',
                },
                {
                  step: '3',
                  title: 'Share',
                  description: 'Generate a link and share your list with friends',
                },
              ].map((feature, idx) => (
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Stack gap="md">
                      <Box
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '20px',
                        }}
                      >
                        {feature.step}
                      </Box>
                      <div>
                        <Title order={4} size="h5" style={{ fontWeight: 700 }}>
                          {feature.title}
                        </Title>
                        <Text size="sm" c="dimmed" mt="8px">
                          {feature.description}
                        </Text>
                      </div>
                    </Stack>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </motion.div>
      </Container>

      {/* Final CTA */}
      <Container size="lg" pb={80} px={{ base: 'md', xs: 'sm' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <Stack gap="md" align="center">
            <motion.div
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Title order={2} size="h3" style={{ fontWeight: 800 }}>
                Ready to get started?
              </Title>
            </motion.div>
            <Text c="dimmed">
              Create your first ranked list in seconds
            </Text>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                href="/dashboard"
                size="lg"
                radius="8px"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  fontWeight: 600,
                }}
              >
              Create Your List
            </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  )
}
