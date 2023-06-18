import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const customId = params?.custom_id as string | undefined
  let destination = '/home'

  if (customId) {
    destination = `/users/${customId}/view`
  }

  return {
    redirect: {
      permanent: false,
      destination,
    },
  }
}

export default function Servers() {
  return <></>
}
