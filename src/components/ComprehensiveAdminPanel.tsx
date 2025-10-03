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
import { Shield, Users, Calendar, LogOut, Plus, Edit, Trash2, Mail, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContentManagementService, { Project, TimelineEvent } from "@/services/contentManagementService";
import CloudStorageService from "@/services/cloudStorageService";
import { RecruitmentForm, WorkshopForm } from "@/components/SimpleRegistrationForms";
import RegistrationsTab from "@/components/RegistrationsTab";

// Admin credentials
const ADMIN_USERNAME = "tse2011";
const ADMIN_PASSWORD = "SoaringEagles@2011SIT";

// Storage keys for registrations
const RECRUITMENT_STORAGE_KEY = "soaring_eagles_recruitment_data";
const WORKSHOP_STORAGE_KEY = "soaring_eagles_workshop_data";

interface ComprehensiveAdminPanelProps {
  onClose?: () => void;
}

const ComprehensiveAdminPanel = ({ onClose }: ComprehensiveAdminPanelProps = {}) => {
  const [authStep, setAuthStep] = useState<"login" | "authenticated">("login");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
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

  // Load content data
  useEffect(() => {
    if (authStep === "authenticated") {
      setProjects(contentService.getProjects());
      setTimelineEvents(contentService.getTimelineEvents());
    }
  }, [authStep]);


  // Get registration data
  const getRecruitmentData = () => JSON.parse(localStorage.getItem(RECRUITMENT_STORAGE_KEY) || "[]");
  const getWorkshopData = () => JSON.parse(localStorage.getItem(WORKSHOP_STORAGE_KEY) || "[]");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Direct login - no OTP needed
      setAuthStep("authenticated");
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Access Denied ❌",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };


  const handleLogout = () => {
    setAuthStep("login");
    setCredentials({ username: "", password: "" });
    setActiveTab("registrations");
    toast({
      title: "Logged Out 🔒",
      description: "Admin session ended.",
    });
  };


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
      
      <div className="p-6 min-h-full">{/* Removed overflow-y-auto to prevent layout issues */}

        {authStep === "login" && (
          <LoginForm 
            credentials={credentials}
            setCredentials={setCredentials}
            onSubmit={handleLogin}
            isLoading={isLoading}
          />
        )}


        {authStep === "authenticated" && (
          <AdminDashboard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            recruitmentData={recruitmentData}
            workshopData={workshopData}
            projects={projects}
            timelineEvents={timelineEvents}
            onSaveProject={handleSaveProject}
            onSaveEvent={handleSaveEvent}
            editingProject={editingProject}
            setEditingProject={setEditingProject}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            showProjectForm={showProjectForm}
            setShowProjectForm={setShowProjectForm}
            showEventForm={showEventForm}
            setShowEventForm={setShowEventForm}
            contentService={contentService}
            setProjects={setProjects}
            setTimelineEvents={setTimelineEvents}
            cloudService={cloudService}
          />
        )}
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ credentials, setCredentials, onSubmit, isLoading }: any) => (
  <>
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold">🔒 Admin Login</h2>
    </div>
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Enter Admin Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </>
);


// Main Admin Dashboard Component
const AdminDashboard = ({ 
  activeTab, setActiveTab, onLogout, recruitmentData, workshopData, 
  projects, timelineEvents, onSaveProject, onSaveEvent,
  editingProject, setEditingProject, editingEvent, setEditingEvent,
  showProjectForm, setShowProjectForm, showEventForm, setShowEventForm,
  contentService, setProjects, setTimelineEvents, cloudService
}: any) => {
  const [showRecruitmentForm, setShowRecruitmentForm] = useState(false);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const { toast } = useToast();

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

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🛡️ Admin Dashboard</h2>
        <Button onClick={onLogout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>

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

      {/* Removed Project and Timeline modals */}
    </>
  );
};


// Projects Tab Component
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

// Timeline Tab Component
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

// Settings Tab Component
const SettingsTab = ({ contentService, cloudService }: any) => {
  const { toast } = useToast();
  const [isCloudEnabled, setIsCloudEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check if cloud storage is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
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
      {/* Cloud Storage Section */}
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
                <p>4. See <strong>CLOUD_SETUP_GUIDE.md</strong> for detailed instructions</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Local Data Management */}
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

      {/* Storage Information */}
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

// Project Form Component (simplified for space)
const ProjectForm = ({ project, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(project || {
    title: "", description: "", image: "", technologies: [], category: "",
    status: "planned", startDate: "", endDate: "", teamMembers: [], achievements: [],
    links: { github: "", demo: "", documentation: "" }
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(project?.image || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({...formData, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process arrays from comma-separated strings
    const processedData = {
      ...formData,
      technologies: typeof formData.technologies === 'string' 
        ? formData.technologies.split(',').map(t => t.trim()).filter(t => t)
        : formData.technologies,
      teamMembers: typeof formData.teamMembers === 'string'
        ? formData.teamMembers.split(',').map(t => t.trim()).filter(t => t)
        : formData.teamMembers,
      achievements: typeof formData.achievements === 'string'
        ? formData.achievements.split(',').map(t => t.trim()).filter(t => t)
        : formData.achievements,
    };
    
    onSave(processedData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title *</Label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required 
                placeholder="Project name"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., Drone, Robotics, AI"
              />
            </div>
          </div>
          
          <div>
            <Label>Description *</Label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required 
              placeholder="Detailed project description"
              rows={3}
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <Label>Project Image</Label>
            <div className="space-y-2">
              <Input 
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {imagePreview && (
                <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                      setFormData({...formData, image: ""});
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Start Date</Label>
              <Input 
                type="date"
                value={formData.startDate} 
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label>End Date (if completed)</Label>
            <Input 
              type="date"
              value={formData.endDate} 
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>

          <div>
            <Label>Technologies</Label>
            <Input 
              value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies} 
              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              placeholder="React, Python, Arduino (comma-separated)"
            />
          </div>

          <div>
            <Label>Team Members</Label>
            <Input 
              value={Array.isArray(formData.teamMembers) ? formData.teamMembers.join(', ') : formData.teamMembers} 
              onChange={(e) => setFormData({...formData, teamMembers: e.target.value})}
              placeholder="John Doe, Jane Smith (comma-separated)"
            />
          </div>

          <div>
            <Label>Achievements</Label>
            <Textarea 
              value={Array.isArray(formData.achievements) ? formData.achievements.join(', ') : formData.achievements} 
              onChange={(e) => setFormData({...formData, achievements: e.target.value})}
              placeholder="Awards, recognitions (comma-separated)"
              rows={2}
            />
          </div>

          {/* Links Section */}
          <div className="space-y-2">
            <Label>Project Links</Label>
            <div className="grid grid-cols-1 gap-2">
              <Input 
                value={formData.links?.github || ""} 
                onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})}
                placeholder="GitHub repository URL"
              />
              <Input 
                value={formData.links?.demo || ""} 
                onChange={(e) => setFormData({...formData, links: {...formData.links, demo: e.target.value}})}
                placeholder="Live demo URL"
              />
              <Input 
                value={formData.links?.documentation || ""} 
                onChange={(e) => setFormData({...formData, links: {...formData.links, documentation: e.target.value}})}
                placeholder="Documentation URL"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Event Form Component (simplified for space)
const EventForm = ({ event, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(event || {
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
    date: new Date().getDate().toString().padStart(2, '0'),
    title: "", description: "", category: "milestone", importance: "medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Timeline Event" : "Add New Timeline Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Year</Label>
              <Input 
                value={formData.year} 
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label>Month</Label>
              <Input 
                value={formData.month} 
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                placeholder="MM"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                placeholder="DD"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Importance</Label>
              <Select value={formData.importance} onValueChange={(value) => setFormData({...formData, importance: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComprehensiveAdminPanel;
