import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const runtimeConfig = useRuntimeConfig();
const prisma = new PrismaClient();

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: runtimeConfig.apiRouteSecret,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: useRuntimeConfig().public.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.googleClientSecret,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(`redirect callback is invoked url=${url} baseUrl=${baseUrl}`);

      if (!url) url = "/";

      // Allows relative callback URLs
      if (url.startsWith("/") || url.startsWith("./")) {
        const result = new URL(url, baseUrl).toString();
        console.log(`redirectin to "${result}"`)
        return result;
      }
      // Replace localhost:3000 or similar with the provided
      // authentication url (reflects the hostname inside docker)
      else {
        const result = new URL(new URL(url).pathname, baseUrl).toString();
        console.log(`redirectin to "${result}"`)
        return result;
      }
    },
    session({ session, token }) {
      console.log(`session callback is invoked session=${session} token=${token}`);
      session.user.id = token.id;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
  },
  events: {
    createUser: async (message) => {
      await prisma.workspace.create({
        data: {
          name: "My workspace",
          users: {
            connect: {
              id: message.user.id,
            },
          },
        },
      });
    },
  },
});
