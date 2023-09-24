import { getServerHelper } from '@/utils/getServerHelper'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const customId = ctx.params?.custom_id

  if (customId && typeof customId === 'string') {
    const helpers = await getServerHelper()
    const joinId = await helpers.servers.getPageJoinId.fetch({ customId })

    if (joinId) {
      return {
        redirect: {
          permanent: false,
          destination: `/servers/${joinId}`,
          revalidate: 60,
        },
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  }
}

export default function Index() {
  return <></>
}
