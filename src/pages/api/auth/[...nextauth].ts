import NextAuth from "next-auth/next";

import { authOptions } from "~/utils/server/auth";

export default NextAuth(authOptions);
