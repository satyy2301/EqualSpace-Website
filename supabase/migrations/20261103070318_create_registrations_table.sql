/*
# Create early-access registrations table

1. New Tables
- `registrations`: one row per early-access sign-up from the landing page.
  - `id` (uuid, primary key)
  - `full_name` (text, required)
  - `email` (text, required, unique, stored lowercase)
  - `city` (text, required)
  - `gender` (text, optional)
  - `interested_in` (text, optional)
  - `relationship_intention` (text, required)
  - `is_adult` (boolean, must be true: 18+ confirmation)
  - `accepted_terms` (boolean, must be true: privacy and terms acceptance)
  - `created_at` (timestamp, defaults to now)

2. Security
- Row level security is enabled.
- Visitors (anon) and signed-in users can only INSERT rows. There is no read, update, or delete access from the browser, so registrants' details cannot be listed by visitors.
- Table grants are limited to INSERT for anon and authenticated.

3. Important notes
- Email uniqueness is enforced by the database, so duplicate sign-ups are rejected at the data layer.
- Check constraints ensure the age and terms confirmations are always true.
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 3 AND 254),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  gender text,
  interested_in text,
  relationship_intention text NOT NULL CHECK (char_length(relationship_intention) BETWEEN 1 AND 120),
  is_adult boolean NOT NULL DEFAULT false CHECK (is_adult = true),
  accepted_terms boolean NOT NULL DEFAULT false CHECK (accepted_terms = true),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON registrations TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
