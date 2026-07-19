BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE publication_status AS ENUM ('draft', 'review', 'approved', 'restricted', 'published');
CREATE TYPE review_status AS ENUM ('needs_metadata', 'in_review', 'approved');
CREATE TYPE access_level AS ENUM ('public', 'reading_room', 'restricted');
CREATE TYPE record_type AS ENUM ('photograph', 'artifact', 'audio', 'document', 'video', 'oral_history');

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  display_name text NOT NULL,
  role_id uuid NOT NULL REFERENCES roles(id),
  disabled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  description text NOT NULL
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE accessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accession_number text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  source text,
  donor_name text,
  provenance text,
  received_on date,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE collection_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accession_id uuid REFERENCES accessions(id),
  stable_identifier text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  record_type record_type NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  date_label text,
  start_date date,
  end_date date,
  start_year integer,
  end_year integer,
  approximate_date boolean NOT NULL DEFAULT false,
  physical_description text,
  format text,
  dimensions text,
  duration_seconds integer,
  rights_holder text,
  rights_statement text NOT NULL DEFAULT 'Rights status not yet determined.',
  usage_restrictions text NOT NULL DEFAULT '',
  credit_line text,
  storage_location text,
  condition_note text,
  preservation_notes text,
  internal_notes text,
  public_notes text,
  access_level access_level NOT NULL DEFAULT 'restricted',
  publication_status publication_status NOT NULL DEFAULT 'draft',
  review_status review_status NOT NULL DEFAULT 'needs_metadata',
  source_system text NOT NULL,
  source_identifier text,
  source_path text,
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id),
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL UNIQUE,
  sort_name text,
  biography text,
  privacy_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE radio_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_sign text NOT NULL,
  frequency text,
  band text,
  city text,
  notes text,
  UNIQUE (call_sign, frequency)
);

CREATE TABLE station_brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  station_id uuid REFERENCES radio_stations(id),
  start_year integer,
  end_year integer,
  rights_note text
);

CREATE TABLE programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE,
  description text,
  start_year integer,
  end_year integer
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date_label text,
  start_date date,
  end_date date,
  description text
);

CREATE TABLE places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  city text,
  region text,
  country text DEFAULT 'United States',
  latitude numeric,
  longitude numeric
);

CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL UNIQUE,
  vocabulary text NOT NULL DEFAULT 'local'
);

CREATE TABLE keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL UNIQUE
);

CREATE TABLE record_people (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  person_id uuid NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  relationship text NOT NULL DEFAULT 'associated',
  PRIMARY KEY (record_id, person_id, relationship)
);

CREATE TABLE record_organizations (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  relationship text NOT NULL DEFAULT 'associated',
  PRIMARY KEY (record_id, organization_id, relationship)
);

CREATE TABLE record_programs (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, program_id)
);

CREATE TABLE record_events (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, event_id)
);

CREATE TABLE record_subjects (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, subject_id)
);

CREATE TABLE record_keywords (
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  keyword_id uuid NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, keyword_id)
);

CREATE TABLE record_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  target_record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (source_record_id <> target_record_id)
);

CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  role text NOT NULL,
  original_filename text NOT NULL,
  storage_key text NOT NULL UNIQUE,
  mime_type text NOT NULL,
  byte_size bigint NOT NULL,
  sha256 text NOT NULL,
  width integer,
  height integer,
  duration_seconds integer,
  color_profile text,
  technical_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  access_level access_level NOT NULL DEFAULT 'restricted',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE media_derivatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  derivative_type text NOT NULL,
  storage_key text NOT NULL UNIQUE,
  mime_type text NOT NULL,
  byte_size bigint NOT NULL,
  sha256 text NOT NULL,
  generation_tool text NOT NULL,
  operation_log jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE preservation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid REFERENCES collection_objects(id) ON DELETE CASCADE,
  media_asset_id uuid REFERENCES media_assets(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  outcome text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  performed_by uuid REFERENCES users(id),
  performed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  status review_status NOT NULL DEFAULT 'needs_metadata',
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transcript_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transcript_id uuid NOT NULL REFERENCES transcripts(id) ON DELETE CASCADE,
  start_seconds numeric NOT NULL,
  end_seconds numeric NOT NULL,
  text text NOT NULL,
  speaker_label text,
  confidence numeric,
  CHECK (end_seconds >= start_seconds)
);

CREATE TABLE oral_history_interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid REFERENCES collection_objects(id),
  interview_date date,
  interviewer text,
  summary text,
  consent_status text NOT NULL DEFAULT 'unknown'
);

CREATE TABLE exhibits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  publication_status publication_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE exhibit_records (
  exhibit_id uuid NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
  record_id uuid NOT NULL REFERENCES collection_objects(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (exhibit_id, record_id)
);

CREATE TABLE public_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  related_accession_number text,
  message text NOT NULL,
  consent_to_contact boolean NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  assigned_to uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE research_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  request_text text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  assigned_to uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid REFERENCES collection_objects(id) ON DELETE CASCADE,
  suggestion_type text NOT NULL,
  suggestion_text text NOT NULL,
  source_record_ids uuid[] NOT NULL DEFAULT '{}',
  model_name text,
  prompt_hash text,
  status text NOT NULL DEFAULT 'pending_review',
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX collection_objects_public_idx ON collection_objects (publication_status, access_level);
CREATE INDEX collection_objects_accession_idx ON collection_objects (accession_id);
CREATE INDEX collection_objects_year_idx ON collection_objects (start_year, end_year);
CREATE INDEX collection_objects_deleted_idx ON collection_objects (deleted_at);
CREATE INDEX media_assets_record_idx ON media_assets (record_id);
CREATE INDEX transcript_segments_text_idx ON transcript_segments USING gin (to_tsvector('english', text));
CREATE INDEX public_submissions_status_idx ON public_submissions (status, created_at);
CREATE INDEX audit_events_entity_idx ON audit_events (entity_type, entity_id, created_at);

INSERT INTO roles (name, description) VALUES
  ('owner', 'Archive owner with full administrative control.'),
  ('administrator', 'System and user administrator.'),
  ('archivist', 'Senior collection manager with publication authority.'),
  ('cataloger', 'Creates and edits catalog records.'),
  ('volunteer', 'Assists with assigned metadata and review tasks.'),
  ('reviewer', 'Reviews records, transcripts, OCR, and public submissions.'),
  ('read_only_researcher', 'Internal read-only research access.');

INSERT INTO permissions (key, description) VALUES
  ('records:read', 'Read internal records according to role and access level.'),
  ('records:create', 'Create accessions and collection objects.'),
  ('records:review', 'Review metadata, transcripts, OCR, and AI suggestions.'),
  ('records:publish', 'Publish approved public records.'),
  ('records:delete', 'Soft-delete and recover records.'),
  ('media:upload', 'Upload and stage media assets.'),
  ('media:approve_derivatives', 'Approve access derivatives.'),
  ('submissions:review', 'Review public submissions.'),
  ('system:admin', 'Manage system configuration and users.');

COMMIT;
