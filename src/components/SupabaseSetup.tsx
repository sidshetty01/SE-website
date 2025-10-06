import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const SupabaseSetup = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const { toast } = useToast();

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    const createTables = async () => {
        setIsRunning(true);
        setLogs([]);

        try {
            addLog("🚀 Starting database setup...");

            // Note: Direct SQL execution requires service_role key, not anon key
            // Since we only have anon key, we'll create a minimal test record
            // to verify connection and table structure

            addLog("⚠️ Cannot create tables with anon key");
            addLog("📋 Attempting to verify existing tables...");

            // Test 1: Check workshop_registrations
            addLog("🔍 Checking workshop_registrations table...");
            const { data: workshopData, error: workshopError } = await supabase
                .from('workshop_registrations')
                .select('count', { count: 'exact', head: true });

            if (workshopError) {
                if (workshopError.code === '42P01') {
                    addLog("❌ workshop_registrations table does NOT exist");
                    addLog("📝 Table needs to be created in Supabase dashboard");
                } else {
                    addLog(`❌ Error checking workshop_registrations: ${workshopError.message}`);
                }
            } else {
                addLog("✅ workshop_registrations table exists!");
            }

            // Test 2: Check recruitment_registrations
            addLog("🔍 Checking recruitment_registrations table...");
            const { data: recruitmentData, error: recruitmentError } = await supabase
                .from('recruitment_registrations')
                .select('count', { count: 'exact', head: true });

            if (recruitmentError) {
                if (recruitmentError.code === '42P01') {
                    addLog("❌ recruitment_registrations table does NOT exist");
                    addLog("📝 Table needs to be created in Supabase dashboard");
                } else {
                    addLog(`❌ Error checking recruitment_registrations: ${recruitmentError.message}`);
                }
            } else {
                addLog("✅ recruitment_registrations table exists!");
            }

            // Test 3: Check projects table
            addLog("🔍 Checking projects table...");
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('count', { count: 'exact', head: true });

            if (projectsError) {
                if (projectsError.code === '42P01') {
                    addLog("❌ projects table does NOT exist");
                } else {
                    addLog(`❌ Error checking projects: ${projectsError.message}`);
                }
            } else {
                addLog("✅ projects table exists!");
            }

            // Test 4: Check timeline_events table
            addLog("🔍 Checking timeline_events table...");
            const { data: timelineData, error: timelineError } = await supabase
                .from('timeline_events')
                .select('count', { count: 'exact', head: true });

            if (timelineError) {
                if (timelineError.code === '42P01') {
                    addLog("❌ timeline_events table does NOT exist");
                } else {
                    addLog(`❌ Error checking timeline_events: ${timelineError.message}`);
                }
            } else {
                addLog("✅ timeline_events table exists!");
            }

            addLog("📊 Diagnosis complete!");
            addLog("⚠️ If tables don't exist, share the SQL file with the Supabase account owner");

            toast({
                title: "Diagnosis Complete",
                description: "Check the logs below for results",
            });

        } catch (error: any) {
            addLog(`❌ Unexpected error: ${error.message}`);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsRunning(false);
        }
    };

    const copySQL = () => {
        const sql = `
-- Run this SQL in Supabase SQL Editor
-- Tables needed for TSE Website

-- 1. Workshop Registrations Table
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  usn TEXT NOT NULL,
  year TEXT NOT NULL,
  department TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Recruitment Registrations Table
CREATE TABLE IF NOT EXISTS recruitment_registrations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year TEXT NOT NULL,
  department TEXT NOT NULL,
  usn TEXT NOT NULL,
  "contactNumber" TEXT NOT NULL,
  "inCollegeClub" TEXT NOT NULL CHECK ("inCollegeClub" IN ('yes', 'no')),
  "clubName" TEXT,
  skills TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  year TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Create Policies for workshop_registrations
DROP POLICY IF EXISTS "Enable insert for all users" ON workshop_registrations;
CREATE POLICY "Enable insert for all users" 
  ON workshop_registrations FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for all users" ON workshop_registrations;
CREATE POLICY "Enable select for all users" 
  ON workshop_registrations FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON workshop_registrations;
CREATE POLICY "Enable delete for authenticated users only" 
  ON workshop_registrations FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create Policies for recruitment_registrations
DROP POLICY IF EXISTS "Enable insert for all users" ON recruitment_registrations;
CREATE POLICY "Enable insert for all users" 
  ON recruitment_registrations FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for all users" ON recruitment_registrations;
CREATE POLICY "Enable select for all users" 
  ON recruitment_registrations FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON recruitment_registrations;
CREATE POLICY "Enable delete for authenticated users only" 
  ON recruitment_registrations FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create Policies for projects
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
CREATE POLICY "Enable read access for all users" 
  ON projects FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;
CREATE POLICY "Enable insert for authenticated users only" 
  ON projects FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON projects;
CREATE POLICY "Enable update for authenticated users only" 
  ON projects FOR UPDATE 
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON projects;
CREATE POLICY "Enable delete for authenticated users only" 
  ON projects FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create Policies for timeline_events
DROP POLICY IF EXISTS "Enable read access for all users" ON timeline_events;
CREATE POLICY "Enable read access for all users" 
  ON timeline_events FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON timeline_events;
CREATE POLICY "Enable insert for authenticated users only" 
  ON timeline_events FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users only" ON timeline_events;
CREATE POLICY "Enable update for authenticated users only" 
  ON timeline_events FOR UPDATE 
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON timeline_events;
CREATE POLICY "Enable delete for authenticated users only" 
  ON timeline_events FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_timestamp ON workshop_registrations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_usn ON workshop_registrations(usn);
CREATE INDEX IF NOT EXISTS idx_recruitment_registrations_timestamp ON recruitment_registrations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_recruitment_registrations_usn ON recruitment_registrations(usn);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_timeline_events_year ON timeline_events(year);
CREATE INDEX IF NOT EXISTS idx_timeline_events_date ON timeline_events(date);
    `.trim();

        navigator.clipboard.writeText(sql);
        toast({
            title: "SQL Copied! 📋",
            description: "Send this to your Supabase account owner to run in SQL Editor",
        });
    };

    return (
        <Card className="p-6 m-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🔧 Supabase Database Setup</h2>

            <div className="space-y-4 mb-6">
                <p className="text-sm text-gray-600">
                    This tool checks if the required database tables exist. Since you don't have
                    dashboard access, you'll need the Supabase account owner to run the SQL.
                </p>
            </div>

            <div className="flex gap-3 mb-6">
                <Button onClick={createTables} disabled={isRunning}>
                    {isRunning ? "🔍 Checking..." : "🔍 Check Tables"}
                </Button>
                <Button onClick={copySQL} variant="outline">
                    📋 Copy SQL for Owner
                </Button>
            </div>

            {logs.length > 0 && (
                <div className="bg-black text-green-400 p-4 rounded font-mono text-xs overflow-auto max-h-96">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1">{log}</div>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-semibold mb-2">📝 Instructions for Supabase Owner:</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Click "Copy SQL for Owner" button above</li>
                    <li>Go to Supabase Dashboard → SQL Editor</li>
                    <li>Create New Query</li>
                    <li>Paste the copied SQL</li>
                    <li>Click Run (or press Cmd+Enter)</li>
                    <li>Verify tables in Table Editor</li>
                </ol>
            </div>
        </Card>
    );
};