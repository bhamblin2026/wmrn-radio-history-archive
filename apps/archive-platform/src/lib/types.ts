export type PublicationStatus = "draft" | "review" | "approved" | "restricted" | "published";
export type RecordType = "photograph" | "artifact" | "audio" | "document" | "video" | "oral_history";

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface ArchiveRecord {
  id: string;
  slug: string;
  stableIdentifier: string;
  accessionNumber: string;
  title: string;
  description: string;
  dateLabel: string;
  startYear?: number;
  endYear?: number;
  approximateDate: boolean;
  type: RecordType;
  collection: string;
  mediaFormats: string[];
  people: string[];
  programs: string[];
  institutions: string[];
  stations: string[];
  events: string[];
  subjects: string[];
  keywords: string[];
  source: string;
  donor?: string;
  provenance: string;
  rightsHolder?: string;
  rightsStatement: string;
  restrictions: string;
  creditLine: string;
  physicalLocation?: string;
  digitalLocation?: string;
  condition: string;
  preservationNotes: string;
  accessLevel: "public" | "reading_room" | "restricted";
  publicationStatus: PublicationStatus;
  reviewStatus: "needs_metadata" | "in_review" | "approved";
  featuredImage?: string;
  mediaUrl?: string;
  transcriptSegments?: TranscriptSegment[];
  relatedRecordIds: string[];
  sourceSystem: "wordpress" | "legacy_github_export" | "sample_seed";
  sourcePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  q?: string;
  type?: string;
  collection?: string;
  person?: string;
  station?: string;
  decade?: string;
  rights?: string;
  yearFrom?: number;
  yearTo?: number;
  sort?: "relevance" | "date_asc" | "date_desc" | "title_asc";
}
