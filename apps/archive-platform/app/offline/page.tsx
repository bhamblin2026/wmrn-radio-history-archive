export default function OfflinePage() {
  return (
    <section className="section" aria-labelledby="offline-heading">
      <p className="eyebrow">Offline Access</p>
      <h1 id="offline-heading">Saved archive pages remain available</h1>
      <p>
        The PWA caches the app shell and selected public record pages. Restricted media and private derivatives are never cached for public offline use.
      </p>
      <p>When connection returns, search indexes, submission queues, and health checks refresh automatically.</p>
    </section>
  );
}
