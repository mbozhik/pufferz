import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Collection from '~~/index/Collection'
import Faq from '~~/index/Faq'

export default function IndexPage() {
  return (
    <>
      <Hero />

      <Container>
        <Collection />
        <Faq />
      </Container>
    </>
  )
}
