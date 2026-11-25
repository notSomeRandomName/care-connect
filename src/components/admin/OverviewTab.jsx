import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Users, Bed, HeartPulse, CheckCircle2, AlertTriangle,
  Pill, Printer, TrendingUp, Clock, Activity, ShieldAlert,
  ArrowUpRight, ArrowDownRight, ArrowRight, UserCheck, Stethoscope
} from 'lucide-react';

export const OverviewTab = ({ onOpenRegistration, onSelectTab }) => {
  const {
    patients,
    dischargedPatients,
    beds,
    staff,
    medicineRequests,
    printingRequests,
    emergencyAlerts,
    setSelectedBedId,
    setCurrentRole
  } = useHospital();

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'occupied').length;
  const availableBeds = beds.filter(b => b.status === 'available').length;
  const cleaningBeds = beds.filter(b => b.status === 'cleaning' || b.status === 'maintenance').length;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const pendingMeds = medicineRequests.filter(m => m.status === 'Pending').length;
  const pendingPrints = printingRequests.filter(p => p.status === 'Pending').length;
  const activeEmergencies = emergencyAlerts.filter(e => !e.acknowledged).length;

  const onDutyDoctors = staff.doctors.filter(d => d.status === 'On Duty').length;
  const onDutyNurses = staff.nurses.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. TOP METRICS GRID (10 REQUIRED OVERVIEW METRICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Metric 1: Total Admitted Patients */}
        <div
          onClick={() => onSelectTab('Patient Management')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 hover:shadow-soft transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Admitted Patients</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">{patients.length}</span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> Live
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Active Bedside EMRs</p>
        </div>

        {/* Metric 2: Available Beds */}
        <div
          onClick={() => onSelectTab('Bed Management')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 hover:shadow-soft transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Available Beds</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">{availableBeds}</span>
            <span className="text-[11px] font-semibold text-slate-500">/ {totalBeds} Total</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Ready for intake</p>
        </div>

        {/* Metric 3: Occupied Beds */}
        <div
          onClick={() => onSelectTab('Bed Management')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 hover:shadow-soft transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Occupied Beds</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-900">{occupiedBeds}</span>
            <span className="text-[11px] font-bold text-cyan-600">{occupancyRate}% rate</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{cleaningBeds} cleaning/maint.</p>
        </div>

        {/* Metric 4: Discharged Patients */}
        <div
          onClick={() => onSelectTab('Admission & Discharge')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 hover:shadow-soft transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Discharged</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">{dischargedPatients.length}</span>
            <span className="text-[11px] font-semibold text-purple-600">Archived EMR</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Preserved histories</p>
        </div>

        {/* Metric 5: Active Emergency Alerts */}
        <div
          onClick={() => onSelectTab('Emergency Alerts')}
          className={`p-4 rounded-2xl border transition cursor-pointer group ${
            activeEmergencies > 0
              ? 'bg-red-50 border-red-300 ring-2 ring-red-400/40 animate-pulse'
              : 'bg-white border-slate-200/80 shadow-xs hover:border-cyan-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${activeEmergencies > 0 ? 'text-red-700' : 'text-slate-500'}`}>
              Emergency Alerts
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-110 transition ${
              activeEmergencies > 0 ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl font-black ${activeEmergencies > 0 ? 'text-red-600' : 'text-slate-700'}`}>
              {activeEmergencies}
            </span>
            <span className={`text-[11px] font-extrabold ${activeEmergencies > 0 ? 'text-red-600 animate-bounce' : 'text-emerald-600'}`}>
              {activeEmergencies > 0 ? 'CRITICAL SOS' : 'All Clear'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Real-time nurse dispatch</p>
        </div>

        {/* Metric 6: Today's Admissions */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Today's Admissions</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">4</span>
            <span className="text-[11px] font-semibold text-teal-600">+25% vs avg</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">All bed sensors active</p>
        </div>

        {/* Metric 7: Today's Discharges */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Today's Discharges</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">2</span>
            <span className="text-[11px] font-semibold text-slate-500">Avg stay 3.8 days</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Bed turnaround 42 min</p>
        </div>

        {/* Metric 8: Pending Medicine Requests */}
        <div
          onClick={() => onSelectTab('Medicine Requests')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Medicines</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">{pendingMeds}</span>
            <span className="text-[11px] font-semibold text-amber-600">Pharmacy Queue</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Direct bedside requests</p>
        </div>

        {/* Metric 9: Pending Printing Requests */}
        <div
          onClick={() => onSelectTab('Printing Requests')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Prints</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-navy-950">{pendingPrints}</span>
            <span className="text-[11px] font-semibold text-indigo-600">Print Hub</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Bedside physical delivery</p>
        </div>

        {/* Metric 10: Staff Availability */}
        <div
          onClick={() => onSelectTab('Staff Management')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Staff On Duty</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">{onDutyDoctors + onDutyNurses}</span>
            <span className="text-[11px] font-semibold text-slate-500">{onDutyDoctors} MD • {onDutyNurses} RN</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">100% station coverage</p>
        </div>

      </div>

      {/* 2. INTERACTIVE CHARTS & VISUAL BED OCCUPANCY MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Bed Status Grid Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-navy-950 flex items-center">
                <Bed className="w-5 h-5 mr-2 text-cyan-600" />
                Live Ward Bed Allocation Matrix (24 Beds)
              </h3>
              <p className="text-xs text-slate-500">
                Click any occupied bed to immediately inspect or switch to its Bedside Touchscreen.
              </p>
            </div>
            
            {/* Status Legend */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span> Available
              </span>
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span> Occupied
              </span>
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5"></span> Cleaning
              </span>
            </div>
          </div>

          {/* Bed Tiles Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {beds.map((b) => {
              const p = patients.find(pat => pat.id === b.patientId);
              const isOccupied = b.status === 'occupied';
              const isCleaning = b.status === 'cleaning' || b.status === 'maintenance';

              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBedId(b.id);
                    if (isOccupied) {
                      setCurrentRole('patient');
                    }
                  }}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer select-none ${
                    isOccupied
                      ? 'bg-blue-50/80 border-blue-200 hover:border-blue-400 hover:shadow-xs'
                      : isCleaning
                      ? 'bg-amber-50/60 border-amber-200 text-amber-700'
                      : 'bg-emerald-50/50 border-emerald-200/80 hover:border-emerald-400'
                  }`}
                  title={isOccupied ? `Bed ${b.bedNumber}: ${p?.name} (Click to open Bedside Screen)` : `Bed ${b.bedNumber}: Available`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-400">{b.ward.split(' ')[0]}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      isOccupied ? 'bg-blue-600' : isCleaning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
                  </div>
                  <div className="text-sm font-extrabold text-navy-950 font-mono">
                    {b.bedNumber}
                  </div>
                  <p className="text-[10px] text-slate-600 truncate mt-0.5 font-medium">
                    {isOccupied ? p?.name.split(' ')[0] : 'Available'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span>Overall Ward Occupancy: <strong className="text-navy-900">{occupancyRate}%</strong></span>
            <button
              onClick={() => onSelectTab('Bed Management')}
              className="text-cyan-700 font-bold hover:text-cyan-800 transition flex items-center"
            >
              Open Full Bed Management <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Department Analytics Chart Simulation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-navy-950 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-cyan-600" />
              Department Patient Load
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Admissions distribution across specialties</p>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-3 py-2">
            {[
              { dept: 'Cardiology & ICU', count: 3, percentage: 38, color: 'bg-rose-500' },
              { dept: 'Neurology & Stroke', count: 1, percentage: 15, color: 'bg-indigo-500' },
              { dept: 'General Surgery & Ortho', count: 2, percentage: 25, color: 'bg-cyan-500' },
              { dept: 'Pediatrics', count: 1, percentage: 12, color: 'bg-amber-500' },
              { dept: 'Maternity (OB/GYN)', count: 1, percentage: 10, color: 'bg-teal-500' },
            ].map((item) => (
              <div key={item.dept} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.dept}</span>
                  <span className="font-bold text-navy-950">{item.count} pts ({item.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-100 text-xs text-cyan-900 font-medium">
            💡 Hospital operating at normal baseline capacity. Average Code Blue response time: <strong>48 seconds</strong>.
          </div>
        </div>

      </div>

      {/* 3. RECENT ADMISSIONS & LIVE REQUEST STATUS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-navy-950">Active Patient Roster & Digital Bedside Status</h3>
            <p className="text-xs text-slate-500">Real-time telemetry and bedside touchscreen readiness</p>
          </div>

          <button
            onClick={onOpenRegistration}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Admit New Patient</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Patient ID & Name</th>
                <th className="py-3 px-4">Bed / Ward</th>
                <th className="py-3 px-4">Clinical Diagnosis</th>
                <th className="py-3 px-4">Care Team</th>
                <th className="py-3 px-4">Latest Vitals</th>
                <th className="py-3 px-4">Bedside Portal</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.slice(0, 5).map((p) => {
                const bed = beds.find(b => b.patientId === p.id);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">{p.name}</div>
                      <div className="text-[11px] font-mono text-cyan-700">{p.id} • {p.age}y/{p.gender}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        Bed {p.bedNumber}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.ward}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700 font-medium">
                      {p.diagnosis}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>Dr: <strong className="text-slate-800">{p.assignedDoctor.split(' ')[1]}</strong></div>
                      <div>RN: <span className="text-slate-600">{p.assignedNurse.split(' ')[1]}</span></div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-slate-800 font-bold">HR {p.vitals.heartRate} • BP {p.vitals.bloodPressure}</div>
                      <div className="text-[11px] text-emerald-600 font-semibold">SpO2 {p.vitals.spo2}% • {p.vitals.temperature}°F</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                        Active & Connected
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (bed) setSelectedBedId(bed.id);
                          setCurrentRole('patient');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white font-bold text-[11px] transition"
                      >
                        Open Bedside
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

