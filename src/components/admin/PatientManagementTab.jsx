import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Users, Search, Filter, Monitor, FileText, ArrowRightLeft,
  LogOut, Shield, HeartPulse, UserPlus, Phone, MapPin, AlertCircle
} from 'lucide-react';

export const PatientManagementTab = ({ onOpenRegistration }) => {
  const {
    patients,
    beds,
    setSelectedBedId,
    setCurrentRole,
    setAdminActiveTab,
    dischargePatient
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [activePatientDrawer, setActivePatientDrawer] = useState(null);

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.bedNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedWard === 'ALL') return matchesSearch;
    return matchesSearch && p.ward.toLowerCase().includes(selectedWard.toLowerCase());
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Top Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Patient Name, ID (PAT-...), Bed, Diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Ward:</span>
            {['ALL', 'ICU', 'General', 'Ward B', 'Maternity', 'Pediatric'].map(ward => (
              <button
                key={ward}
                onClick={() => setSelectedWard(ward)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedWard === ward
                    ? 'bg-navy-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ward}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenRegistration}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/30 transition active:scale-95 flex items-center justify-center space-x-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Patient Registration</span>
        </button>

      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Patient Profile</th>
                <th className="py-3 px-4">Bed & Ward</th>
                <th className="py-3 px-4">Attending Doctor & Nurse</th>
                <th className="py-3 px-4">Allergies & History</th>
                <th className="py-3 px-4">Admission Date</th>
                <th className="py-3 px-4">EMR & Touchscreen</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No admitted patients match your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map(p => {
                  const targetBed = beds.find(b => b.bedNumber === p.bedNumber);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900 text-sm">{p.name}</div>
                        <div className="text-[11px] font-mono text-cyan-700 font-semibold">{p.id}</div>
                        <div className="text-[11px] text-slate-500">{p.age} yrs • {p.gender}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">
                          Bed {p.bedNumber}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{p.ward}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{p.assignedDoctor}</div>
                        <div className="text-[11px] text-slate-500">{p.assignedNurse}</div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-rose-600 truncate">
                          {p.allergies}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                          {p.medicalHistory}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {p.admissionDate}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                          Bedside Active
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => {
                              if (targetBed) setSelectedBedId(targetBed.id);
                              setCurrentRole('patient');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white font-bold text-[11px] transition flex items-center space-x-1"
                            title="Open Patient Touchscreen Kiosk"
                          >
                            <Monitor className="w-3.5 h-3.5" />
                            <span>Bedside</span>
                          </button>

                          <button
                            onClick={() => {
                              setAdminActiveTab('Admission & Discharge');
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] transition"
                            title="Go to Discharge Desk"
                          >
                            Discharge
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

