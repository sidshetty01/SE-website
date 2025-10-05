import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types for form data
interface RecruitmentFormData {
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

interface WorkshopFormData {
  // Team Leader
  name: string;
  usn: string;
  year: string;
  department: string;
  phoneNumber: string;
  email: string;
  // Member 2
  member2Name: string;
  member2Usn: string;
  member2Department: string;
  member2Phone: string;
 
  // Member 3
  member3Name: string;
  member3Usn: string;
  member3Department: string;
  member3Phone: string;
  
  // Member 4
  member4Name: string;
  member4Usn: string;
  member4Department: string;
  member4Phone: string;

  // Payment
  paymentScreenshot: File | null;
  timestamp: string;
}

// Local storage keys
const RECRUITMENT_STORAGE_KEY = "soaring_eagles_recruitment_data";
const WORKSHOP_STORAGE_KEY = "soaring_eagles_workshop_data";

export const RecruitmentForm = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<RecruitmentFormData>();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const inCollegeClub = watch("inCollegeClub");

  const onSubmit = async (data: RecruitmentFormData) => {
    const formData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    
    try {
      // Save to 'recruitment_registrations' table
      const { error } = await supabase
        .from('recruitment_registrations')
        .insert([formData]);
      
      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: `Failed to submit: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Your recruitment application has been submitted to the cloud.",
      });
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error('Submission error:', err);
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
          <Users className="w-4 h-4 mr-2" />
          Register for Recruitment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Recruitment Registration 2025-26
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="year">Year *</Label>
              <Select onValueChange={(value) => register("year").onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                {...register("department", { required: "Department is required" })}
                placeholder="e.g., Computer Science"
              />
              {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
            </div>

            <div>
              <Label htmlFor="usn">USN *</Label>
              <Input
                id="usn"
                {...register("usn", { required: "USN is required" })}
                placeholder="Enter your USN"
              />
              {errors.usn && <p className="text-red-500 text-sm">{errors.usn.message}</p>}
            </div>

            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                {...register("contactNumber", { 
                  required: "Contact number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                })}
                placeholder="Enter 10-digit mobile number"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
            </div>
          </div>

          <div>
            <Label>Are you present in any college club? *</Label>
            <RadioGroup
              onValueChange={(value) => register("inCollegeClub").onChange({ target: { value } })}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {inCollegeClub === "yes" && (
            <div>
              <Label htmlFor="clubName">Which club? *</Label>
              <Input
                id="clubName"
                {...register("clubName", { required: inCollegeClub === "yes" ? "Club name is required" : false })}
                placeholder="Enter club name"
              />
              {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName.message}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="skills">Skills *</Label>
            <Textarea
              id="skills"
              {...register("skills", { required: "Skills are required" })}
              placeholder="Describe your technical skills, interests, and relevant experience"
              rows={4}
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
            Submit Registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const WorkshopForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WorkshopFormData>();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: WorkshopFormData) => {
    const formData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    
    try {
      // Save to 'workshop_registrations' table
      const { error } = await supabase
        .from('workshop_registrations')
        .insert([formData]);
      
      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: `Failed to submit: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Your workshop registration has been submitted to the cloud.",
      });
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error('Submission error:', err);
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80">
          <Calendar className="w-4 h-4 mr-2" />
          Register for Workshop
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Lift-Off Workshop Registration (₹400)
          </DialogTitle>
          <div className="mt-4 flex justify-center h-48">
            <img src="/images/liftoff.png" alt="Lift-Off Workshop" className="h-full object-contain rounded-lg" />
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Team Name Section */}
          <div className="mb-8">
            <Label htmlFor="teamName" className="text-2xl font-bold block mb-3">Team Name *</Label>
            <Input
              id="teamName"
              {...register("teamName", { required: "Team name is required" })}
              placeholder="Enter your team name"
              className="text-lg py-4 px-4"
            />
            {errors.teamName && <p className="text-red-500 text-sm mt-2">{errors.teamName.message}</p>}
          </div>

          {/* Team Leader Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Leader Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name (Team Leader) *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Team leader name is required" })}
                  placeholder="Enter team leader's name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="usn">USN *</Label>
                <Input
                  id="usn"
                  {...register("usn", { required: "USN is required" })}
                  placeholder="Enter team leader's USN"
                />
                {errors.usn && <p className="text-red-500 text-sm">{errors.usn.message}</p>}
              </div>

              <div>
                <Label htmlFor="year">Year *</Label>
                <Select onValueChange={(value) => register("year").onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  {...register("department", { required: "Department is required" })}
                  placeholder="e.g., Computer Science"
                />
                {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                  })}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" }
                  })}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Member 2 Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Member 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member2Name">Full Name *</Label>
                <Input
                  id="member2Name"
                  {...register("member2Name", { required: "Member 2 name is required" })}
                  placeholder="Enter member's name"
                />
                {errors.member2Name && <p className="text-red-500 text-sm">{errors.member2Name.message}</p>}
              </div>

              <div>
                <Label htmlFor="member2Usn">USN *</Label>
                <Input
                  id="member2Usn"
                  {...register("member2Usn", { required: "Member 2 USN is required" })}
                  placeholder="Enter member's USN"
                />
                {errors.member2Usn && <p className="text-red-500 text-sm">{errors.member2Usn.message}</p>}
              </div>

              <div>
                <Label htmlFor="member2Department">Department *</Label>
                <Input
                  id="member2Department"
                  {...register("member2Department", { required: "Member 2 department is required" })}
                  placeholder="e.g., Computer Science"
                />
                {errors.member2Department && <p className="text-red-500 text-sm">{errors.member2Department.message}</p>}
              </div>

              <div>
                <Label htmlFor="member2Phone">Phone Number *</Label>
                <Input
                  id="member2Phone"
                  {...register("member2Phone", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                  })}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.member2Phone && <p className="text-red-500 text-sm">{errors.member2Phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Member 3 Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Member 3</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member3Name">Full Name *</Label>
                <Input
                  id="member3Name"
                  {...register("member3Name", { required: "Member 3 name is required" })}
                  placeholder="Enter member's name"
                />
                {errors.member3Name && <p className="text-red-500 text-sm">{errors.member3Name.message}</p>}
              </div>

              <div>
                <Label htmlFor="member3Usn">USN *</Label>
                <Input
                  id="member3Usn"
                  {...register("member3Usn", { required: "Member 3 USN is required" })}
                  placeholder="Enter member's USN"
                />
                {errors.member3Usn && <p className="text-red-500 text-sm">{errors.member3Usn.message}</p>}
              </div>

              <div>
                <Label htmlFor="member3Department">Department *</Label>
                <Input
                  id="member3Department"
                  {...register("member3Department", { required: "Member 3 department is required" })}
                  placeholder="e.g., Computer Science"
                />
                {errors.member3Department && <p className="text-red-500 text-sm">{errors.member3Department.message}</p>}
              </div>

              <div>
                <Label htmlFor="member3Phone">Phone Number *</Label>
                <Input
                  id="member3Phone"
                  {...register("member3Phone", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                  })}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.member3Phone && <p className="text-red-500 text-sm">{errors.member3Phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Member 4 Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Member 4</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member4Name">Full Name *</Label>
                <Input
                  id="member4Name"
                  {...register("member4Name", { required: "Member 4 name is required" })}
                  placeholder="Enter member's name"
                />
                {errors.member4Name && <p className="text-red-500 text-sm">{errors.member4Name.message}</p>}
              </div>

              <div>
                <Label htmlFor="member4Usn">USN *</Label>
                <Input
                  id="member4Usn"
                  {...register("member4Usn", { required: "Member 4 USN is required" })}
                  placeholder="Enter member's USN"
                />
                {errors.member4Usn && <p className="text-red-500 text-sm">{errors.member4Usn.message}</p>}
              </div>

              <div>
                <Label htmlFor="member4Department">Department *</Label>
                <Input
                  id="member4Department"
                  {...register("member4Department", { required: "Member 4 department is required" })}
                  placeholder="e.g., Computer Science"
                />
                {errors.member4Department && <p className="text-red-500 text-sm">{errors.member4Department.message}</p>}
              </div>

              <div>
                <Label htmlFor="member4Phone">Phone Number *</Label>
                <Input
                  id="member4Phone"
                  {...register("member4Phone", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" }
                  })}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.member4Phone && <p className="text-red-500 text-sm">{errors.member4Phone.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="mb-4 p-4 bg-secondary/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <img src="/images/paymentqr.jpg" alt="Payment QR Code" className="w-48 h-48 object-contain" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Amount: ₹400</p>
                  <p className="text-sm text-muted-foreground">1. Scan the QR code to pay</p>
                  <p className="text-sm text-muted-foreground">2. Take a screenshot of the payment confirmation</p>
                  <p className="text-sm text-muted-foreground">3. Upload the screenshot below</p>
                </div>
              </div>
            </div>
            <Label htmlFor="paymentScreenshot">Payment Screenshot *</Label>
            <Input
              id="paymentScreenshot"
              type="file"
              accept="image/*"
              {...register("paymentScreenshot", { required: "Payment screenshot is required" })}
              className="cursor-pointer"
            />
            {errors.paymentScreenshot && <p className="text-red-500 text-sm">{errors.paymentScreenshot.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-accent to-primary">
            Register for Workshop
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
