import CircularGallery from '~/Module/CircularGallery'

export default function HeroGallery() {
  return (
    <div style={{height: '600px', position: 'relative'}}>
      <CircularGallery bend={3} textColor="#7f7f7f" borderRadius={0.05} />
    </div>
  )
}
