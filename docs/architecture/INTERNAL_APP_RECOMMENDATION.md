# Internal App Recommendation

Yes: turn this into a full internal app.

The internal app should become the archive's operational source of truth: accessioning, cataloging, preservation events, private notes, donor/source tracking, review queues, media derivatives, and search indexing. The live WordPress site should remain the public museum surface until staging proves that a replacement or publishing integration is safer.

Recommended sequence:

1. Build internal accessioning and cataloging first.
2. Connect WordPress import as migration input, not the long-term database.
3. Store masters in object storage with checksums and preservation events.
4. Publish only approved public records to WordPress or to a future public Next front end.
5. Keep AI disabled by default until record permissions and source boundaries are enforced.

The public site can keep doing its job while the internal system becomes the archive's operating core.

The cloned GitHub repository is treated as legacy/export context, not the live site source. The current live site is WordPress.
