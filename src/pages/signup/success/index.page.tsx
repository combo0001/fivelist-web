import { Back, Background, Box, Header } from '@/components/Auth'
import { Button, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { DescriptionContainer } from './style'

// eslint-disable-next-line no-undef
export default function Success(): JSX.Element {
  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <DescriptionContainer>
          <Header title={'Confirmação enviado por e-mail'} />

          <Text weight={'bold'} size={'sm'} color={'$colors$primary600'}>
            Parabéns você ganhou 5 pontos, {' '}
            <Text as={'span'} weight={'bold'} size={'sm'}>
              preencha seu perfil para conquistar mais pontos.
            </Text>
          </Text>
        </DescriptionContainer>

        <Link href={'/'} legacyBehavior>
          <Button size={'lg'}>Acessar minha conta</Button>
        </Link>
      </Box>
    </Background>
  )
}
