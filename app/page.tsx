import Gallery from '@/components/Gallery/Gallery';

export default function Page() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}>
      <Gallery />
    </div>
  );
}
