import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Users, Search, Download, RefreshCw, Trash2, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkshopRegistration {
  id?: number;
  name: string;
  usn: string;
  year: string;
  department: string;
  phoneNumber: string;
  email: string;
  timestamp: string;
}

interface RecruitmentRegistration {
  id?: number;
  name: string;
  year: string;
  department: string;
  usn: string;
  contactNumber: string;
  inCollegeClub: "yes" | "no";
  clubName?: string;
  skills: string;
  timestamp: string;
}

const RegistrationsTab = () => {
  const [workshopRegistrations, setWorkshopRegistrations] = useState<WorkshopRegistration[]>([]);
  const [recruitmentRegistrations, setRecruitmentRegistrations] = useState<RecruitmentRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch workshop registrations from Supabase
  const fetchWorkshopRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('workshop_registrations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      
      setWorkshopRegistrations(data || []);
      toast({
        title: "Data Loaded ✅",
        description: `Loaded ${data?.length || 0} workshop registrations`,
      });
    } catch (error) {
      console.error("Error fetching workshop registrations:", error);
      toast({
        title: "Error Loading Data",
        description: "Failed to fetch workshop registrations from cloud.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recruitment registrations from Supabase
  const fetchRecruitmentRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('recruitment_registrations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      
      setRecruitmentRegistrations(data || []);
      toast({
        title: "Data Loaded ✅",
        description: `Loaded ${data?.length || 0} recruitment registrations`,
      });
    } catch (error) {
      console.error("Error fetching recruitment registrations:", error);
      toast({
        title: "Error Loading Data",
        description: "Failed to fetch recruitment registrations from cloud.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchWorkshopRegistrations();
    fetchRecruitmentRegistrations();
  }, []);

  // Delete registration
  const handleDelete = async (id: number, type: 'workshop' | 'recruitment') => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;

    try {
      const table = type === 'workshop' ? 'workshop_registrations' : 'recruitment_registrations';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      if (type === 'workshop') {
        await fetchWorkshopRegistrations();
      } else {
        await fetchRecruitmentRegistrations();
      }

      toast({
        title: "Deleted Successfully ✅",
        description: "Registration has been removed.",
      });
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete registration.",
        variant: "destructive",
      });
    }
  };

  // Export to CSV
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "No registrations to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: "Export Successful ✅",
      description: "CSV file has been downloaded.",
    });
  };

  // Filter registrations based on search
  const filterWorkshopData = workshopRegistrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterRecruitmentData = recruitmentRegistrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {workshopRegistrations.length + recruitmentRegistrations.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Workshop Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {workshopRegistrations.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Recruitment Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {recruitmentRegistrations.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, USN, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchWorkshopRegistrations();
              fetchRecruitmentRegistrations();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs for different registration types */}
      <Tabs defaultValue="workshop" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workshop" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Workshop Registrations
            <Badge variant="secondary">{filterWorkshopData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="recruitment" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Recruitment Registrations
            <Badge variant="secondary">{filterRecruitmentData.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Workshop Registrations Tab */}
        <TabsContent value="workshop">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lift-Off Workshop Registrations</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(filterWorkshopData, 'workshop_registrations')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filterWorkshopData.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No workshop registrations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>USN</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterWorkshopData.map((reg, index) => (
                        <TableRow key={reg.id || index}>
                          <TableCell className="font-medium">{reg.name}</TableCell>
                          <TableCell>{reg.usn}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{reg.year}</Badge>
                          </TableCell>
                          <TableCell>{reg.department}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {reg.phoneNumber}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {reg.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(reg.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => reg.id && handleDelete(reg.id, 'workshop')}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recruitment Registrations Tab */}
        <TabsContent value="recruitment">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recruitment Registrations 2025-26</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(filterRecruitmentData, 'recruitment_registrations')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filterRecruitmentData.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recruitment registrations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>USN</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>In Club</TableHead>
                        <TableHead>Club Name</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Registered On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterRecruitmentData.map((reg, index) => (
                        <TableRow key={reg.id || index}>
                          <TableCell className="font-medium">{reg.name}</TableCell>
                          <TableCell>{reg.usn}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{reg.year}</Badge>
                          </TableCell>
                          <TableCell>{reg.department}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {reg.contactNumber}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={reg.inCollegeClub === "yes" ? "default" : "secondary"}>
                              {reg.inCollegeClub}
                            </Badge>
                          </TableCell>
                          <TableCell>{reg.clubName || "-"}</TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={reg.skills}>
                              {reg.skills}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(reg.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => reg.id && handleDelete(reg.id, 'recruitment')}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegistrationsTab;