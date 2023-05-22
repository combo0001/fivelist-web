import { GetServerSideProps } from 'next'

export default function Index() {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  }
}
