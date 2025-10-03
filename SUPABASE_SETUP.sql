-- Supabase Database Schema for Soaring Eagles
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== REGISTRATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('recruitment', 'workshop')),
  name VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  department VARCHAR(255) NOT NULL,
  usn VARCHAR(50) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  in_college_club VARCHAR(10) CHECK (in_college_club IN ('yes', 'no')),
  club_name VARCHAR(255),
  skills TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== PROJECTS TABLE ====================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'ongoing', 'planned')),
  start_date DATE,
  end_date DATE,
  team_members TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  github_link TEXT,
  demo_link TEXT,
  documentation_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== TIMELINE EVENTS TABLE ====================
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year VARCHAR(10) NOT NULL,
  month VARCHAR(20),
  date VARCHAR(10),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('achievement', 'milestone', 'event', 'competition')),
  importance VARCHAR(10) NOT NULL CHECK (importance IN ('high', 'medium', 'low')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== STORAGE BUCKET ====================
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own images" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- ==================== ROW LEVEL SECURITY ====================
-- Enable RLS on all tables
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public website)
CREATE POLICY "Public read access" ON registrations FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON projects FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON projects FOR DELETE USING (true);

CREATE POLICY "Public read access" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON timeline_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON timeline_events FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON timeline_events FOR DELETE USING (true);

-- ==================== INDEXES FOR PERFORMANCE ====================
CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(type);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_timeline_events_year ON timeline_events(year);
CREATE INDEX IF NOT EXISTS idx_timeline_events_importance ON timeline_events(importance);

-- ==================== FUNCTIONS ====================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
