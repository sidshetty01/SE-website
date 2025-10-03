-- FIX: Create separate tables for workshop and recruitment registrations
-- Run this in your Supabase SQL Editor to fix the "failed to submit" error

-- Drop the old single registrations table if it exists and you haven't used it yet
-- DROP TABLE IF EXISTS registrations CASCADE;

-- ==================== WORKSHOP REGISTRATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  usn VARCHAR(50) NOT NULL,
  year VARCHAR(50) NOT NULL,
  department VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== RECRUITMENT REGISTRATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS recruitment_registrations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  department VARCHAR(255) NOT NULL,
  usn VARCHAR(50) NOT NULL,
  contactNumber VARCHAR(20) NOT NULL,
  inCollegeClub VARCHAR(10) NOT NULL CHECK (inCollegeClub IN ('yes', 'no')),
  clubName VARCHAR(255),
  skills TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== ROW LEVEL SECURITY ====================
-- Enable RLS on both tables
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (needed for form submissions)
-- Workshop Registrations Policies
CREATE POLICY "Public read workshop registrations" 
  ON workshop_registrations FOR SELECT 
  USING (true);

CREATE POLICY "Public insert workshop registrations" 
  ON workshop_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public delete workshop registrations" 
  ON workshop_registrations FOR DELETE 
  USING (true);

-- Recruitment Registrations Policies
CREATE POLICY "Public read recruitment registrations" 
  ON recruitment_registrations FOR SELECT 
  USING (true);

CREATE POLICY "Public insert recruitment registrations" 
  ON recruitment_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public delete recruitment registrations" 
  ON recruitment_registrations FOR DELETE 
  USING (true);

-- ==================== INDEXES FOR PERFORMANCE ====================
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_timestamp 
  ON workshop_registrations(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_workshop_registrations_usn 
  ON workshop_registrations(usn);

CREATE INDEX IF NOT EXISTS idx_recruitment_registrations_timestamp 
  ON recruitment_registrations(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_recruitment_registrations_usn 
  ON recruitment_registrations(usn);

-- ==================== DONE ====================
-- Tables created successfully!
-- Now your registration forms should work without errors.
