import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (ctx) => {
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
