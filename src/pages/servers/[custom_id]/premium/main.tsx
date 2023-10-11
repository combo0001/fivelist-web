/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

import { PremiumContainer, PremiumImage, PremiumWrapper } from './style'
import PremiumBackgroundImage from '@/assets/premium-background.png'
import { TitleContainer } from './components/TitleContainer'
import { PlansContainer } from './components/PlansContainer'

export const UsersPremiumMain = (): JSX.Element => {
  const { user: clientUser } = useClientUser()

  return (
    <PageLayout>
      <Header user={clientUser} />

      <PremiumWrapper>
        <PremiumImage
          src={PremiumBackgroundImage}
          alt=""
        />

        <PremiumContainer>
          <TitleContainer />

          <PlansContainer />
        </PremiumContainer>
      </PremiumWrapper>
    </PageLayout>
  )
}
