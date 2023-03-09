import { type GetServerSidePropsContext, type GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";

import { ClientRoutes } from "~/utils/constants/routes";
import { authOptions } from "~/utils/server/auth";

type Props = {
  [key: string]: any;
};

export const requireAuth = async (
  context: GetServerSidePropsContext,
  cb?: () => Promise<GetServerSidePropsResult<Props>>
): Promise<GetServerSidePropsResult<Props>> => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (cb) {
    return await cb();
  }

  if (!cb && !session) {
    return {
      redirect: {
        destination: `${ClientRoutes.LOGIN}?redirect=${context.req.url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
