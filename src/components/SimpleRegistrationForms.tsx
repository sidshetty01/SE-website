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
  name: string;
  usn: string;
  year: string;
  department: string;
  phoneNumber: string;
  email: string;
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Lift-Off Workshop Registration
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
              <Label htmlFor="usn">USN *</Label>
              <Input
                id="usn"
                {...register("usn", { required: "USN is required" })}
                placeholder="Enter your USN"
              />
              {errors.usn && <p className="text-red-500 text-sm">{errors.usn.message}</p>}
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
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-accent to-primary">
            Register for Workshop
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
