import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContentManagementService, { Project, TimelineEvent } from "@/services/contentManagementService";
import CloudStorageService from "@/services/cloudStorageService";
import RegistrationsTab from "@/components/RegistrationsTab";

// Storage keys for registrations
const RECRUITMENT_STORAGE_KEY = "soaring_eagles_recruitment_data";
const WORKSHOP_STORAGE_KEY = "soaring_eagles_workshop_data";

interface ComprehensiveAdminPanelProps {
  onClose?: () => void;
}

const ComprehensiveAdminPanel = ({ onClose }: ComprehensiveAdminPanelProps = {}) => {
  // ❌ REMOVED: authStep state - no longer needed
  // ❌ REMOVED: credentials state - no longer needed
  // ❌ REMOVED: isLoading state - no longer needed
  const [activeTab, setActiveTab] = useState("registrations");
  
  // Content management states
  const [projects, setProjects] = useState<Project[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const { toast } = useToast();
  const contentService = ContentManagementService.getInstance();
  const cloudService = CloudStorageService.getInstance();

  // Load content data on mount
  useEffect(() => {
    setProjects(contentService.getProjects());
    setTimelineEvents(contentService.getTimelineEvents());
  }, []);

  // Get registration data
  const getRecruitmentData = () => JSON.parse(localStorage.getItem(RECRUITMENT_STORAGE_KEY) || "[]");
  const getWorkshopData = () => JSON.parse(localStorage.getItem(WORKSHOP_STORAGE_KEY) || "[]");

  // ❌ REMOVED: handleLogin function - authentication handled by Supabase
  // ❌ REMOVED: handleLogout function - handled in Admin.tsx

  // Project management functions
  const handleSaveProject = (projectData: any) => {
    try {
      if (editingProject) {
        contentService.updateProject(editingProject.id, projectData);
        toast({ title: "Project Updated! ✅", description: "Project has been updated successfully." });
      } else {
        contentService.addProject(projectData);
        toast({ title: "Project Added! ✅", description: "New project has been added successfully." });
      }
      setProjects(contentService.getProjects());
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save project.", variant: "destructive" });
    }
  };

  // Timeline event management functions
  const handleSaveEvent = (eventData: any) => {
    try {
      if (editingEvent) {
        contentService.updateTimelineEvent(editingEvent.id, eventData);
        toast({ title: "Event Updated! ✅", description: "Timeline event has been updated successfully." });
      } else {
        contentService.addTimelineEvent(eventData);
        toast({ title: "Event Added! ✅", description: "New timeline event has been added successfully." });
      }
      setTimelineEvents(contentService.getTimelineEvents());
      setShowEventForm(false);
      setEditingEvent(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save event.", variant: "destructive" });
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      contentService.deleteProject(id);
      setProjects(contentService.getProjects());
      toast({ title: "Project Deleted", description: "Project has been removed successfully." });
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this timeline event?")) {
      contentService.deleteTimelineEvent(id);
      setTimelineEvents(contentService.getTimelineEvents());
      toast({ title: "Event Deleted", description: "Timeline event has been removed successfully." });
    }
  };

  const recruitmentData = getRecruitmentData();
  const workshopData = getWorkshopData();

  return (
    <div className="relative w-full min-h-full bg-background">
      {/* Close button */}
      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <div className="p-6 min-h-full">
        {/* ✅ REMOVED: Login form conditional rendering */}
        {/* ✅ REMOVED: authStep === "login" check */}
        
        {/* ✅ ALWAYS SHOW: Admin dashboard (no auth check needed - handled by ProtectedRoute) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <RegistrationsTab />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsTab contentService={contentService} cloudService={cloudService} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// ❌ REMOVED: LoginForm component - no longer needed

// ❌ REMOVED: AdminDashboard wrapper component - no longer needed

// ProjectsTab Component (keep as is - but you removed it already)
const ProjectsTab = ({ projects, onEdit, onDelete, onAdd }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Manage Projects</h3>
      <Button onClick={onAdd} className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
        <Plus className="w-4 h-4 mr-2" />
        Add New Project
      </Button>
    </div>
    
    {projects.length === 0 ? (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No projects yet. Add your first project!</p>
        </CardContent>
      </Card>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project: Project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);

// TimelineTab Component (keep as is)
const TimelineTab = ({ events, onEdit, onDelete, onAdd }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Manage Timeline Events</h3>
      <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
        <Plus className="w-4 h-4 mr-2" />
        Add New Event
      </Button>
    </div>
    {events.length === 0 ? (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No timeline events yet. Add your first event!</p>
        </CardContent>
      </Card>
    ) : (
      <div className="space-y-4">
        {events.map((event: TimelineEvent) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{event.year}</Badge>
                    <Badge variant="secondary">{event.category}</Badge>
                    <Badge variant={event.importance === 'high' ? 'destructive' : event.importance === 'medium' ? 'default' : 'secondary'}>
                      {event.importance}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(event)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              {event.month && event.date && (
                <p className="text-xs text-muted-foreground mt-2">
                  Date: {event.year}-{event.month}-{event.date}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);

// Settings Tab Component (keep as is)
const SettingsTab = ({ contentService, cloudService }: any) => {
  const { toast } = useToast();
  const [isCloudEnabled, setIsCloudEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    setIsCloudEnabled(!!(supabaseUrl && supabaseKey));
  }, []);

  const handleExport = () => {
    const data = contentService.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soaring_eagles_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast({ title: "Data Exported", description: "Backup file has been downloaded." });
  };

  const handleSyncToCloud = async () => {
    if (!isCloudEnabled) {
      toast({
        title: "Cloud Storage Not Configured",
        description: "Please set up your Supabase credentials first.",
        variant: "destructive"
      });
      return;
    }

    setIsSyncing(true);
    try {
      const result = await cloudService.syncLocalToCloud();
      toast({
        title: result.success ? "Sync Successful! ☁️" : "Sync Failed ❌",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Sync Error",
        description: "Failed to sync data to cloud storage.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ☁️ Cloud Storage
            {isCloudEnabled ? (
              <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
            ) : (
              <Badge variant="destructive">Not Configured</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCloudEnabled ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleSyncToCloud} 
                  disabled={isSyncing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSyncing ? "Syncing..." : "Sync to Cloud"}
                </Button>
                <Button variant="outline" disabled>
                  Load from Cloud (Coming Soon)
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Sync your local registration data and projects to cloud storage for backup and multi-device access.
              </p>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Setup Cloud Storage</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Enable cloud storage to backup your data and access it from anywhere.
              </p>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>1. Create a free Supabase account at <strong>supabase.com</strong></p>
                <p>2. Create a new project and get your credentials</p>
                <p>3. Add them to your <code>.env</code> file</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleExport} variant="outline">
            Export All Data
          </Button>
          <p className="text-sm text-muted-foreground">
            Export all projects and timeline events as a backup file.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Current Storage:</p>
              <p className="text-muted-foreground">Browser Local Storage</p>
            </div>
            <div>
              <p className="font-semibold">Cloud Status:</p>
              <p className={isCloudEnabled ? "text-green-600" : "text-red-600"}>
                {isCloudEnabled ? "✅ Ready" : "❌ Not Configured"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Keep ProjectForm and EventForm as they are...
// (I'm skipping them to save space - they're unchanged)

export default ComprehensiveAdminPanel;