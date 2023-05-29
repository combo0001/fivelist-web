import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const hash = params?.hash as string | undefined
  let destination = '/home'

  if (hash) {
    destination = `/servers/${hash}/view`
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
