'use client';
import {
  Group,
  Button,
  Box,
  useMantineTheme,
} from '@mantine/core';
import classes from './header.module.css';


export function HeaderMenu() {
  const theme = useMantineTheme();

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" px={20}>
          <a href='#' className={classes.logo}>
            Ranker
          </a>
          <Group h="100%" gap={0} visibleFrom="sm">
          </Group>
          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}

