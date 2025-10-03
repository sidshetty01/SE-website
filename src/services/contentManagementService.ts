// Content Management Service for Projects and Timeline
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  status: "completed" | "ongoing" | "planned";
  startDate: string;
  endDate?: string;
  teamMembers: string[];
  achievements?: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  month?: string;
  date?: string;
  title: string;
  description: string;
  icon?: string;
  category: "achievement" | "milestone" | "event" | "competition";
  importance: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
}

export class ContentManagementService {
  private static instance: ContentManagementService;
  
  // Storage keys
  private readonly PROJECTS_STORAGE_KEY = "soaring_eagles_projects";
  private readonly TIMELINE_STORAGE_KEY = "soaring_eagles_timeline_events";

  static getInstance(): ContentManagementService {
    if (!ContentManagementService.instance) {
      ContentManagementService.instance = new ContentManagementService();
    }
    return ContentManagementService.instance;
  }

  // Project Management
  getProjects(): Project[] {
    const projects = localStorage.getItem(this.PROJECTS_STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const projects = this.getProjects();
    projects.push(newProject);
    localStorage.setItem(this.PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(this.PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    return projects[index];
  }

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (filteredProjects.length === projects.length) return false;
    
    localStorage.setItem(this.PROJECTS_STORAGE_KEY, JSON.stringify(filteredProjects));
    return true;
  }

  // Timeline Management
  getTimelineEvents(): TimelineEvent[] {
    const events = localStorage.getItem(this.TIMELINE_STORAGE_KEY);
    const timelineEvents = events ? JSON.parse(events) : [];
    
    // Sort by year, month, date
    return timelineEvents.sort((a: TimelineEvent, b: TimelineEvent) => {
      const dateA = new Date(`${a.year}-${a.month || '01'}-${a.date || '01'}`);
      const dateB = new Date(`${b.year}-${b.month || '01'}-${b.date || '01'}`);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  }

  addTimelineEvent(event: Omit<TimelineEvent, 'id' | 'createdAt' | 'updatedAt'>): TimelineEvent {
    const newEvent: TimelineEvent = {
      ...event,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const events = this.getTimelineEvents();
    events.push(newEvent);
    
    // Sort events after adding
    const sortedEvents = events.sort((a, b) => {
      const dateA = new Date(`${a.year}-${a.month || '01'}-${a.date || '01'}`);
      const dateB = new Date(`${b.year}-${b.month || '01'}-${b.date || '01'}`);
      return dateB.getTime() - dateA.getTime();
    });
    
    localStorage.setItem(this.TIMELINE_STORAGE_KEY, JSON.stringify(sortedEvents));
    return newEvent;
  }

  updateTimelineEvent(id: string, updates: Partial<TimelineEvent>): TimelineEvent | null {
    const events = this.getTimelineEvents();
    const index = events.findIndex(e => e.id === id);
    
    if (index === -1) return null;
    
    events[index] = {
      ...events[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Re-sort after update
    const sortedEvents = events.sort((a, b) => {
      const dateA = new Date(`${a.year}-${a.month || '01'}-${a.date || '01'}`);
      const dateB = new Date(`${b.year}-${b.month || '01'}-${b.date || '01'}`);
      return dateB.getTime() - dateA.getTime();
    });
    
    localStorage.setItem(this.TIMELINE_STORAGE_KEY, JSON.stringify(sortedEvents));
    return events[index];
  }

  deleteTimelineEvent(id: string): boolean {
    const events = this.getTimelineEvents();
    const filteredEvents = events.filter(e => e.id !== id);
    
    if (filteredEvents.length === events.length) return false;
    
    localStorage.setItem(this.TIMELINE_STORAGE_KEY, JSON.stringify(filteredEvents));
    return true;
  }

  // Utility functions
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get default project structure (for form reference)
  getProjectTemplate(): Partial<Project> {
    return {
      title: "",
      description: "",
      image: "",
      technologies: [],
      category: "",
      status: "planned",
      startDate: new Date().toISOString().split('T')[0],
      teamMembers: [],
      achievements: [],
      links: {
        github: "",
        demo: "",
        documentation: ""
      }
    };
  }

  // Get default timeline event structure
  getTimelineEventTemplate(): Partial<TimelineEvent> {
    return {
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
      date: new Date().getDate().toString().padStart(2, '0'),
      title: "",
      description: "",
      category: "milestone",
      importance: "medium"
    };
  }

  // Export data for backup
  exportData(): { projects: Project[], timelineEvents: TimelineEvent[] } {
    return {
      projects: this.getProjects(),
      timelineEvents: this.getTimelineEvents()
    };
  }

  // Import data from backup
  importData(data: { projects?: Project[], timelineEvents?: TimelineEvent[] }): void {
    if (data.projects) {
      localStorage.setItem(this.PROJECTS_STORAGE_KEY, JSON.stringify(data.projects));
    }
    if (data.timelineEvents) {
      localStorage.setItem(this.TIMELINE_STORAGE_KEY, JSON.stringify(data.timelineEvents));
    }
  }
}

export default ContentManagementService;
