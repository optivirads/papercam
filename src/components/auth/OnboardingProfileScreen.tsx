import React, { useState } from 'react';
import { User, Phone, Mail, GraduationCap, Upload, ArrowRight, Shield } from 'lucide-react';
import type { StudentProfileForm } from '../../types';

interface OnboardingProfileScreenProps {
  initialMobile?: string;
  onSaveProfile: (profile: StudentProfileForm) => void;
}

export const OnboardingProfileScreen: React.FC<OnboardingProfileScreenProps> = ({
  initialMobile = '',
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<StudentProfileForm>({
    fullName: 'K. S. Madhavan',
    email: 'madhavan.ks@example.com',
    mobileNumber: initialMobile || '9876543210',
    qualification: 'Graduate',
    profilePicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetExams: ['LDC 2024 Batch', '10th Prelims VFA']
  });

  const [avatarPreview, setAvatarPreview] = useState<string>(
    formData.profilePicUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const qualificationsList = [
    'SSLC',
    '+2 (Higher Secondary)',
    'Graduate',
    'Post Graduate'
  ] as const;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setFormData({ ...formData, profilePicUrl: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.mobileNumber.trim()) errors.mobileNumber = 'Mobile Number is required';
    if (!formData.email.trim()) errors.email = 'Email Address is required';
    if (!formData.qualification) errors.qualification = 'Qualification is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSaveProfile(formData);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-6 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-[11px] font-extrabold text-[#ffc000] uppercase tracking-wider bg-[#ffc000]/10 px-3 py-1 rounded-full border border-[#ffc000]/20">
          Account Setup • Step 2 of 2
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight pt-2">
          Create Student Profile
        </h1>
        <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto">
          Complete your details to access statewide mock exams and rank predictions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* OPTIONAL: Profile Picture Upload Header */}
        <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-3 shadow-xl text-center">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={avatarPreview}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#ffc000] shadow-md"
            />
            <label className="absolute bottom-0 right-0 w-7 h-7 bg-[#ffc000] text-[#0d1322] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Profile Picture</span>
            <span className="text-[10px] text-slate-400 font-semibold">(Optional) Click icon to upload photo</span>
          </div>
        </div>

        {/* MANDATORY FIELDS CARD */}
        <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-xl">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-[#ffc000]" />
            <span>Required Personal Information</span>
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. K. S. Madhavan"
                className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000]"
              />
            </div>
            {formErrors.fullName && <p className="text-[10px] text-rose-400 mt-1 font-bold">{formErrors.fullName}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                placeholder="9876543210"
                className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000]"
              />
            </div>
            {formErrors.mobileNumber && <p className="text-[10px] text-rose-400 mt-1 font-bold">{formErrors.mobileNumber}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="madhavan@example.com"
                className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000]"
              />
            </div>
            {formErrors.email && <p className="text-[10px] text-rose-400 mt-1 font-bold">{formErrors.email}</p>}
          </div>

          {/* Qualification Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Highest Educational Qualification <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-[#ffc000] absolute left-3.5 top-3.5" />
              <select
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value as any })}
                className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#ffc000]"
              >
                {qualificationsList.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
            </div>
            {formErrors.qualification && <p className="text-[10px] text-rose-400 mt-1 font-bold">{formErrors.qualification}</p>}
          </div>

        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-[#ffc000] text-[#0d1322] font-black text-xs flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow-xl shadow-[#ffc000]/20"
        >
          <span>Complete Profile & Start Learning</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

      </form>

    </div>
  );
};
