import { generateSessionToken, createSession, setSessionTokenCookie } from "@/auth/session";
import { google } from "@/auth/oauth";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic"
import type { OAuth2Tokens } from "arctic";
import { generateId } from "lucia";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const cookieStore = cookies();
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string };
	const googleUserId = claims.sub;
	const username = claims.name;

  const existingUser = await prisma.user.findUnique({
    where: {
      userID: googleUserId,
    },
  })

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		await setSessionTokenCookie(sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/dashboard"
			}
		});
	}

  const userId = generateId(15);

  await prisma.user.create({
    data: {
      id: userId,
      userID: googleUserId,
      username: username,
    },
  });

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	await setSessionTokenCookie(sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/dashboard"
		}
	});
}