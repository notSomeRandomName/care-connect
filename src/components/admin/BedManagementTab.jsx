import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Bed, Users, Filter, CheckCircle2, AlertTriangle, Monitor, Sparkles, RefreshCw } from 'lucide-react';

export const BedManagementTab = () => {
  const {
    beds,
    patients,
    setSelectedBedId,
    setCurrentRole,
    setAdminActiveTab
  } = useHospital();

  const [wardFilter, setWardFilter] = useState('ALL');

  const filteredBeds = beds.filter(b => {
    if (wardFilter === 'ALL') return true;
    return b.ward.toLowerCase().includes(wardFilter.toLowerCase());
  });

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'occupied').length;
  const availableBeds = beds.filter(b => b.status === 'available').length;
  const cleaningBeds = beds.filter(b => b.status === 'cleaning' || b.status === 'maintenance').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Ward Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Hospital Beds</span>
          <div className="text-2xl font-black text-navy-950 mt-1">{totalBeds} Beds</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across 5 specialized wards</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Occupied Beds</span>
          <div className="text-2xl font-black text-blue-900 mt-1">{occupiedBeds}</div>
          <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{Math.round((occupiedBeds / totalBeds) * 100)}% Occupancy</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Available Beds</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{availableBeds}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Ready for immediate intake</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Cleaning / Maintenance</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{cleaningBeds}</div>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Sterilization protocol active</p>
        </div>
      </div>

      {/* Ward Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Filter Ward:
          </span>
          {['ALL', 'ICU', 'General', 'Ward B', 'Maternity', 'Pediatric'].map(w => (
            <button
              key={w}
              onClick={() => setWardFilter(w)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                wardFilter === w
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredBeds.length} of {totalBeds} total beds
        </span>
      </div>

      {/* Bed Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBeds.map(b => {
          const patient = patients.find(p => p.id === b.patientId);
          const isOccupied = b.status === 'occupied';
          const isCleaning = b.status === 'cleaning' || b.status === 'maintenance';

          return (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition shadow-soft flex flex-col justify-between space-y-4 ${
                isOccupied
                  ? 'bg-white border-blue-200 hover:border-blue-400'
                  : isCleaning
                  ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                  : 'bg-white border-emerald-200/80 hover:border-emerald-400'
              }`}
            >
              <div>
                {/* Bed Header */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-navy-900 text-white">
                    Bed {b.bedNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isOccupied
                      ? 'bg-blue-100 text-blue-800'
                      : isCleaning
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-700">{b.ward}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{b.type}</div>
                </div>

                {/* Patient Info or Available Placeholder */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  {isOccupied && patient ? (
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">ADMITTED PATIENT</span>
                      <h5 className="font-extrabold text-navy-950 text-sm">{patient.name}</h5>
                      <p className="text-[11px] text-slate-500 truncate">{patient.diagnosis}</p>
                      <div className="text-[11px] text-cyan-700 font-semibold pt-1">
                        Doctor: {patient.assignedDoctor}
                      </div>
                    </div>
                  ) : isCleaning ? (
                    <div className="text-xs text-amber-700 font-medium py-2">
                      <span className="block font-bold">Post-Discharge Cleaning</span>
                      Sanitization cycle in progress.
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-700 font-medium py-2">
                      <span className="block font-bold">Ready for Intake</span>
                      Bed sanitized & digital touchscreen on standby.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center space-x-2">
                {isOccupied ? (
                  <button
                    onClick={() => {
                      setSelectedBedId(b.id);
                      setCurrentRole('patient');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-navy-900 hover:bg-cyan-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Open Bedside Portal</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedBedId(b.id);
                      setAdminActiveTab('Admission & Discharge');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
                  >
                    <span>Assign Patient</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

