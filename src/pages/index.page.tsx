import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
