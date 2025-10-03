import { supabase } from '@/integrations/supabase/client';

export interface CloudRegistrationData {
  id?: string;
  type: 'recruitment' | 'workshop';
  name: string;
  year: string;
  department: string;
  usn: string;
  contactNumber: string;
  email?: string;
  inCollegeClub?: 'yes' | 'no';
  clubName?: string;
  skills?: string;
  timestamp: string;
  created_at?: string;
}

export interface CloudProject {
  id?: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'ongoing' | 'planned';
  start_date?: string;
  end_date?: string;
  team_members: string[];
  achievements?: string[];
  github_link?: string;
  demo_link?: string;
  documentation_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CloudTimelineEvent {
  id?: string;
  year: string;
  month?: string;
  date?: string;
  title: string;
  description: string;
  category: 'achievement' | 'milestone' | 'event' | 'competition';
  importance: 'high' | 'medium' | 'low';
  created_at?: string;
  updated_at?: string;
}

export class CloudStorageService {
  private static instance: CloudStorageService;

  static getInstance(): CloudStorageService {
    if (!CloudStorageService.instance) {
      CloudStorageService.instance = new CloudStorageService();
    }
    return CloudStorageService.instance;
  }

  // ==================== REGISTRATION DATA ====================
  
  async saveRegistration(data: CloudRegistrationData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{
          type: data.type,
          name: data.name,
          year: data.year,
          department: data.department,
          usn: data.usn,
          contact_number: data.contactNumber,
          email: data.email,
          in_college_club: data.inCollegeClub,
          club_name: data.clubName,
          skills: data.skills,
          timestamp: data.timestamp
        }]);

      if (error) {
        console.error('Error saving registration:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error saving registration:', error);
      return false;
    }
  }

  async getRegistrations(type?: 'recruitment' | 'workshop'): Promise<CloudRegistrationData[]> {
    try {
      let query = supabase.from('registrations').select('*').order('created_at', { ascending: false });
      
      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching registrations:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        type: item.type,
        name: item.name,
        year: item.year,
        department: item.department,
        usn: item.usn,
        contactNumber: item.contact_number,
        email: item.email,
        inCollegeClub: item.in_college_club,
        clubName: item.club_name,
        skills: item.skills,
        timestamp: item.timestamp,
        created_at: item.created_at
      })) || [];
    } catch (error) {
      console.error('Error fetching registrations:', error);
      return [];
    }
  }

  // ==================== PROJECT DATA ====================

  async saveProject(project: CloudProject): Promise<boolean> {
    try {
      const projectData = {
        title: project.title,
        description: project.description,
        image_url: project.image_url,
        technologies: project.technologies,
        category: project.category,
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        team_members: project.team_members,
        achievements: project.achievements || [],
        github_link: project.github_link,
        demo_link: project.demo_link,
        documentation_link: project.documentation_link,
        updated_at: new Date().toISOString()
      };

      let result;
      if (project.id) {
        // Update existing project
        result = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);
      } else {
        // Create new project
        result = await supabase
          .from('projects')
          .insert([projectData]);
      }

      if (result.error) {
        console.error('Error saving project:', result.error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    }
  }

  async getProjects(): Promise<CloudProject[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        technologies: item.technologies || [],
        category: item.category,
        status: item.status,
        start_date: item.start_date,
        end_date: item.end_date,
        team_members: item.team_members || [],
        achievements: item.achievements || [],
        github_link: item.github_link,
        demo_link: item.demo_link,
        documentation_link: item.documentation_link,
        created_at: item.created_at,
        updated_at: item.updated_at
      })) || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  // ==================== IMAGE UPLOAD ====================

  async uploadImage(file: File, folder: string = 'projects'): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  async deleteImage(url: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const folder = urlParts[urlParts.length - 2];
      const filePath = `${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // ==================== TIMELINE EVENTS ====================

  async saveTimelineEvent(event: CloudTimelineEvent): Promise<boolean> {
    try {
      const eventData = {
        year: event.year,
        month: event.month,
        date: event.date,
        title: event.title,
        description: event.description,
        category: event.category,
        importance: event.importance,
        updated_at: new Date().toISOString()
      };

      let result;
      if (event.id) {
        // Update existing event
        result = await supabase
          .from('timeline_events')
          .update(eventData)
          .eq('id', event.id);
      } else {
        // Create new event
        result = await supabase
          .from('timeline_events')
          .insert([eventData]);
      }

      if (result.error) {
        console.error('Error saving timeline event:', result.error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error saving timeline event:', error);
      return false;
    }
  }

  async getTimelineEvents(): Promise<CloudTimelineEvent[]> {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('year', { ascending: false });

      if (error) {
        console.error('Error fetching timeline events:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        year: item.year,
        month: item.month,
        date: item.date,
        title: item.title,
        description: item.description,
        category: item.category,
        importance: item.importance,
        created_at: item.created_at,
        updated_at: item.updated_at
      })) || [];
    } catch (error) {
      console.error('Error fetching timeline events:', error);
      return [];
    }
  }

  async deleteTimelineEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('timeline_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting timeline event:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error deleting timeline event:', error);
      return false;
    }
  }

  // ==================== SYNC WITH LOCAL STORAGE ====================

  async syncLocalToCloud(): Promise<{ success: boolean; message: string }> {
    try {
      // Sync registrations
      const localRecruitment = JSON.parse(localStorage.getItem('soaring_eagles_recruitment_data') || '[]');
      const localWorkshop = JSON.parse(localStorage.getItem('soaring_eagles_workshop_data') || '[]');

      for (const item of localRecruitment) {
        await this.saveRegistration({ ...item, type: 'recruitment' });
      }

      for (const item of localWorkshop) {
        await this.saveRegistration({ ...item, type: 'workshop' });
      }

      return { success: true, message: 'Local data synced to cloud successfully!' };
    } catch (error) {
      console.error('Error syncing to cloud:', error);
      return { success: false, message: 'Failed to sync data to cloud.' };
    }
  }
}

export default CloudStorageService;
