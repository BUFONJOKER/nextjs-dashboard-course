import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import postgres from "postgres";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
    throw new Error("POSTGRES_URL is not configured.");
}

const sql = postgres(databaseUrl, { ssl: "require" });

async function getUser(email: string): Promise<User | null> {
    try {
        const result = await sql<User[]>`
            SELECT * FROM users WHERE email = ${email}
        `;
        return result[0] || null;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user from the database.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);
                if (parsedCredentials.success) {

                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (isPasswordValid) return user;
                }
                return null;
			},
		}),
	],
});
