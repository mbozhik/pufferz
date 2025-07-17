import Container from '~/Global/Container'
import Hero from '~~/index/Hero'
import Collection from '~~/index/Collection'

export default function IndexPage() {
  return (
    <>
      <Hero />

      <Container>
        <Collection />
      </Container>
    </>
  )
}
