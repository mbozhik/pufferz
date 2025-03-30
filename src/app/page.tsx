import Container from '~/Global/Container'
import Hero from '~~/index/Hero'

export default function IndexPage() {
  return (
    <>
      <Hero />

      <Container>
        <div className="py-40 text-center">other content</div>
      </Container>
    </>
  )
}
