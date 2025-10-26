import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Download, RefreshCw, Trash2, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [recruitmentRegistrations, setRecruitmentRegistrations] = useState<RecruitmentRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchRecruitmentRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("recruitment_registrations")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) throw error;
      setRecruitmentRegistrations((data as RecruitmentRegistration[]) || []);
      toast({ title: "Data Loaded ✅", description: `Loaded ${data?.length || 0} recruitment registrations` });
    } catch (e) {
      console.error("Error fetching recruitment registrations:", e);
      toast({ title: "Error Loading Data", description: "Failed to fetch recruitment registrations from cloud.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruitmentRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;
    try {
      const { error } = await supabase.from("recruitment_registrations").delete().eq("id", id);
      if (error) throw error;
      await fetchRecruitmentRegistrations();
      toast({ title: "Deleted Successfully ✅", description: "Registration has been removed." });
    } catch (e) {
      console.error("Error deleting registration:", e);
      toast({ title: "Delete Failed", description: "Failed to delete registration.", variant: "destructive" });
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      toast({ title: "No Data", description: "No registrations to export.", variant: "destructive" });
      return;
    }
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast({ title: "Export Successful ✅", description: "CSV file has been downloaded." });
  };

  const filtered = recruitmentRegistrations.filter(reg => {
    const q = searchTerm.toLowerCase();
    return (
      reg.name.toLowerCase().includes(q) ||
      reg.usn.toLowerCase().includes(q) ||
      reg.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recruitmentRegistrations.length}</div>
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
            <div className="text-3xl font-bold text-primary">{recruitmentRegistrations.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search by name, USN, or department..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchRecruitmentRegistrations} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recruitment Registrations</CardTitle>
            <Button variant="outline" size="sm" onClick={() => exportToCSV(filtered, 'recruitment_registrations')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
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
                  {filtered.map((reg, idx) => (
                    <TableRow key={reg.id || idx}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.usn}</TableCell>
                      <TableCell><Badge variant="outline">{reg.year}</Badge></TableCell>
                      <TableCell>{reg.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{reg.contactNumber}</div>
                      </TableCell>
                      <TableCell><Badge variant={reg.inCollegeClub === 'yes' ? 'default' : 'secondary'}>{reg.inCollegeClub}</Badge></TableCell>
                      <TableCell>{reg.clubName || '-'}</TableCell>
                      <TableCell><div className="max-w-xs truncate" title={reg.skills}>{reg.skills}</div></TableCell>
                      <TableCell>{new Date(reg.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => reg.id && handleDelete(reg.id)}>
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
    </div>
  );
};

export default RegistrationsTab;