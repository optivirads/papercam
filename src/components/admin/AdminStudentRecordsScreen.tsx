import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  Search,
  Plus,
  Download,
  Mail,
  Phone,
  BarChart2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export interface AdminStudentRecord {
  id: string;
  studentId: string;
  initials: string;
  name: string;
  batchTag: string;
  enrolledDate: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  progressPercent: number;
  avatarUrl?: string;
}

const initialAdminStudents: AdminStudentRecord[] = [
  {
    id: 's-1',
    studentId: 'PSC-24-0891',
    initials: 'AK',
    name: 'Anand Krishnan',
    batchTag: 'LDC 2024 Batch',
    enrolledDate: '12 Jan 2024',
    email: 'anand.k@example.com',
    phone: '+91 98765 43210',
    status: 'active',
    progressPercent: 78
  },
  {
    id: 's-2',
    studentId: 'PSC-23-1102',
    initials: 'SN',
    name: 'Sruthy N.',
    batchTag: 'KAS Mains 2023',
    enrolledDate: '05 Nov 2023',
    email: 'sruthy.n@example.com',
    phone: '+91 87654 32109',
    status: 'active',
    progressPercent: 42
  },
  {
    id: 's-3',
    studentId: 'PSC-24-0155',
    initials: 'RV',
    name: 'Rahul Varma',
    batchTag: 'LDC 2024 Batch',
    enrolledDate: '02 Feb 2024',
    email: 'r.varma@example.com',
    phone: '+91 76543 21098',
    status: 'inactive',
    progressPercent: 12,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const AdminStudentRecordsScreen: React.FC = () => {
  const [students, setStudents] = useState<AdminStudentRecord[]>(initialAdminStudents);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('All Batches');
  const [selectedStatusTab, setSelectedStatusTab] = useState<'All' | 'Active' | 'Inactive'>('All');

  useEffect(() => {
    async function loadStudents() {
      const list = await apiService.getAdminStudents();
      setStudents(list.length > 0 ? list : initialAdminStudents);
    }
    loadStudents();
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    batchTag: 'LDC 2024 Batch'
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'All Batches' || s.batchTag === selectedBatch;
    const matchesStatus =
      selectedStatusTab === 'All' ||
      (selectedStatusTab === 'Active' && s.status === 'active') ||
      (selectedStatusTab === 'Inactive' && s.status === 'inactive');
    return matchesSearch && matchesBatch && matchesStatus;
  });

  const [viewingStatsStudent, setViewingStatsStudent] = useState<AdminStudentRecord | null>(null);
  const [editingStudent, setEditingStudent] = useState<AdminStudentRecord | null>(null);

  const handleExportCsv = () => {
    const headers = ['ID', 'Student ID', 'Name', 'Email', 'Phone', 'Batch', 'Enrolled Date', 'Progress %', 'Status'];
    const rows = students.map((s) => [
      s.id,
      s.studentId,
      `"${s.name}"`,
      s.email,
      `"${s.phone}"`,
      `"${s.batchTag}"`,
      s.enrolledDate,
      `${s.progressPercent}%`,
      s.status
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'papercam_students_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.email) return;

    const initials = newStudentForm.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created: AdminStudentRecord = {
      id: `s-${Date.now()}`,
      studentId: `PSC-24-${Math.floor(1000 + Math.random() * 9000)}`,
      initials: initials || 'ST',
      name: newStudentForm.name,
      batchTag: newStudentForm.batchTag,
      enrolledDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      email: newStudentForm.email,
      phone: newStudentForm.phone || '+91 98765 00000',
      status: 'active',
      progressPercent: 0
    };

    setStudents([created, ...students]);
    await apiService.saveAdminStudent(created);
    setIsAddModalOpen(false);
    setNewStudentForm({ name: '', email: '', phone: '', batchTag: 'LDC 2024 Batch' });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] pb-24 px-5 pt-4 space-y-5 max-w-lg mx-auto animate-fade-in text-slate-100">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Student Records
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5 leading-relaxed">
          Manage enrollments, monitor progress, and update student profiles.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-3 px-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer shadow-lg shadow-[#ffc000]/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Student</span>
        </button>

        <button
          onClick={handleExportCsv}
          className="py-3 px-3 rounded-xl bg-[#0d1322] border border-[#ffc000]/60 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-[#1a253d] cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4 text-[#ffc000]" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="rounded-3xl bg-[#141c2e] border border-slate-800 p-4 space-y-3 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or ID..."
            className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffc000]"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-[#0d1322] border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#ffc000]"
          >
            <option value="All Batches">All Batches</option>
            <option value="LDC 2024 Batch">LDC 2024 Batch</option>
            <option value="KAS Mains 2023">KAS Mains 2023</option>
            <option value="10th Prelims VFA">10th Prelims VFA</option>
          </select>

          <div className="flex items-center gap-1 bg-[#0d1322] p-1 rounded-xl border border-slate-800 text-[11px] font-extrabold">
            {(['All', 'Active', 'Inactive'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedStatusTab === tab
                    ? 'bg-[#ffc000] text-[#0d1322]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {filteredStudents.map((st) => (
          <div
            key={st.id}
            className="rounded-3xl bg-[#141c2e] border border-slate-800 p-5 space-y-3.5 shadow-xl relative"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {st.avatarUrl ? (
                  <img
                    src={st.avatarUrl}
                    alt={st.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#ffc000]/40 shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#1f2b45] text-sky-300 border border-sky-400/40 font-black text-xs flex items-center justify-center shrink-0 shadow-inner">
                    {st.initials}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-extrabold text-white leading-tight">
                    {st.name}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 block mt-0.5">
                    ID: {st.studentId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewingStatsStudent(st)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                  title="View Student Performance"
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingStudent(st)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                  title="Edit Student Record"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-extrabold text-slate-300 bg-[#0d1322] px-2.5 py-1 rounded-md border border-slate-800 inline-block mb-1">
                {st.batchTag}
              </span>
              <div className="text-slate-300 font-medium">
                Enrolled: <span className="text-white font-bold">{st.enrolledDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{st.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{st.phone}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${st.status === 'active' ? 'bg-[#2ed573]' : 'bg-rose-500'}`} />
                  <span className={st.status === 'active' ? 'text-[#2ed573]' : 'text-rose-400'}>
                    {st.status === 'active' ? 'Active' : 'Inactive (30d+)'}
                  </span>
                </span>

                <span className="text-[#2ed573] font-black">{st.progressPercent}% Comp.</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    st.status === 'active' ? 'bg-[#2ed573]' : 'bg-[#ffc000]'
                  }`}
                  style={{ width: `${st.progressPercent}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Showing 1 to 10 of 2,451 students</span>

        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-lg bg-[#0d1322] border border-slate-800 flex items-center justify-center text-slate-400 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-lg bg-[#ffc000] text-[#0d1322] font-black flex items-center justify-center cursor-pointer">
            1
          </button>
          <button className="w-7 h-7 rounded-lg bg-[#0d1322] border border-slate-800 flex items-center justify-center text-slate-300 cursor-pointer">
            2
          </button>

          <button className="w-7 h-7 rounded-lg bg-[#0d1322] border border-slate-800 flex items-center justify-center text-slate-300 cursor-pointer">
            3
          </button>
          <span className="px-1 text-slate-500">...</span>
          <button className="w-7 h-7 rounded-lg bg-[#0d1322] border border-slate-800 flex items-center justify-center text-slate-400 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-3xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-white">
              Create Student Enrollment Record
            </h3>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-300 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  placeholder="e.g. Anand Krishnan"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newStudentForm.email}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                  placeholder="anand@example.com"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newStudentForm.phone}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Enrolled Batch</label>
                <select
                  value={newStudentForm.batchTag}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, batchTag: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#ffc000]"
                >
                  <option value="LDC 2024 Batch">LDC 2024 Batch</option>
                  <option value="KAS Mains 2023">KAS Mains 2023</option>
                  <option value="10th Prelims VFA">10th Prelims VFA</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs hover:brightness-110 cursor-pointer shadow-md mt-2"
              >
                Enroll Student
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STATS MODAL */}
      {viewingStatsStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-3xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in text-slate-100">
            <button
              onClick={() => setViewingStatsStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffc000]/15 border border-[#ffc000]/30 text-[#ffc000] font-black text-xs flex items-center justify-center shrink-0">
                {viewingStatsStudent.initials}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">{viewingStatsStudent.name}</h3>
                <span className="text-[10px] font-bold text-slate-400">{viewingStatsStudent.studentId} • {viewingStatsStudent.batchTag}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#0d1322] border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Course Progress</span>
                <span className="text-lg font-extrabold text-[#2ed573]">{viewingStatsStudent.progressPercent}%</span>
              </div>

              <div className="bg-[#0d1322] border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Status</span>
                <span className={`text-xs font-extrabold capitalize ${viewingStatsStudent.status === 'active' ? 'text-[#2ed573]' : 'text-rose-400'}`}>
                  {viewingStatsStudent.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setViewingStatsStudent(null)}
              className="w-full py-2.5 rounded-xl bg-[#ffc000] text-[#0d1322] font-extrabold text-xs cursor-pointer hover:brightness-110"
            >
              Close Performance Summary
            </button>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121829] border border-slate-800 rounded-3xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative animate-fade-in text-slate-100">
            <button
              onClick={() => setEditingStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-extrabold text-white">Edit Student Record</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!editingStudent) return;
                setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
                await apiService.saveAdminStudent(editingStudent);
                setEditingStudent(null);
              }}
              className="space-y-3 text-xs font-bold"
            >
              <div>
                <label className="text-slate-400 block mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Enrolled Batch</label>
                <input
                  type="text"
                  required
                  value={editingStudent.batchTag}
                  onChange={(e) => setEditingStudent({ ...editingStudent, batchTag: e.target.value })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#ffc000]"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Account Status</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#ffc000]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ffc000] text-[#0d1322] font-black text-xs cursor-pointer hover:brightness-110"
              >
                Save Record Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
