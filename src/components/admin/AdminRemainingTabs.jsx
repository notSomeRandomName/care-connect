import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Users, Stethoscope, HeartPulse, Pill, Printer, DollarSign,
  ShieldAlert, BarChart3, Settings, Search, CheckCircle, Clock,
  FileText, ShieldCheck, AlertTriangle, Eye, RotateCcw, Download,
  Send, Phone, Mail, Award, CheckCircle2
} from 'lucide-react';

// 1. STAFF MANAGEMENT TAB
export const StaffManagementTab = () => {
  const { staff } = useHospital();
  const [activeSubTab, setActiveSubTab] = useState('doctors'); // 'doctors' | 'nurses' | 'pharmacy' | 'printers'

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header and Filter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-navy-950 flex items-center">
            <Users className="w-5 h-5 mr-2 text-cyan-600" />
            Hospital Staff & Clinical Roster
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time on-duty status, ward assignments, and credential verifications
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {[
            { id: 'doctors', label: `Doctors (${staff.doctors.length})` },
            { id: 'nurses', label: `Nurses (${staff.nurses.length})` },
            { id: 'pharmacy', label: `Pharmacists (${staff.pharmacists.length})` },
            { id: 'printers', label: `Printing Hub (${staff.printers.length})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeSubTab === t.id
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeSubTab === 'doctors' &&
          staff.doctors.map(d => (
            <div key={d.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center space-x-3">
                <img src={d.avatar} alt={d.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{d.name}</h4>
                  <span className="text-xs font-bold text-cyan-700">{d.specialty}</span>
                </div>
              </div>
              <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Department:</span>
                  <strong className="text-slate-800">{d.department}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Duty Station:</span>
                  <span className="text-slate-800 font-semibold">{d.room}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contact:</span>
                  <span className="font-mono text-slate-700">{d.phone}</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  {d.status}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{d.id}</span>
              </div>
            </div>
          ))}

        {activeSubTab === 'nurses' &&
          staff.nurses.map(n => (
            <div key={n.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{n.name}</h4>
                  <span className="text-xs text-rose-600 font-semibold">{n.ward}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 font-mono">
                  {n.badge}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-600 pt-2 border-t border-slate-100">
                <div>Shift: <strong className="text-slate-800">{n.shift}</strong></div>
                <div>Station Phone: <span className="font-mono text-slate-800">{n.phone}</span></div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  {n.status}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{n.id}</span>
              </div>
            </div>
          ))}

        {activeSubTab === 'pharmacy' &&
          staff.pharmacists.map(ph => (
            <div key={ph.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">{ph.name}</h4>
              <div className="text-xs space-y-1 text-slate-600">
                <div>License: <strong className="font-mono text-slate-800">{ph.license}</strong></div>
                <div>Direct Ext: <span className="font-mono text-slate-800">{ph.phone}</span></div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-800">
                  {ph.status}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{ph.id}</span>
              </div>
            </div>
          ))}

        {activeSubTab === 'printers' &&
          staff.printers.map(pr => (
            <div key={pr.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">{pr.name}</h4>
              <div className="text-xs space-y-1 text-slate-600">
                <div>Role: <strong className="text-slate-800">{pr.role}</strong></div>
                <div>Dispatch: <span className="text-slate-800">{pr.station}</span></div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800">
                  Online
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{pr.id}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// 2. MEDICAL RECORDS & LAB REPORTS ADMIN TAB
export const MedicalRecordsAdminTab = () => {
  const { patients, setActiveReportForModal } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');

  const allReports = patients.flatMap(p => 
    p.reports.map(r => ({ ...r, patientName: p.name, patientId: p.id, bedNumber: p.bedNumber, ward: p.ward }))
  ).filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-navy-950 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-cyan-600" />
            Central Hospital EMR & Diagnostic Reports Archive
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive repository of verified laboratory, imaging, and pathology results
          </p>
        </div>

        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report title, patient, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allReports.map(report => (
          <div key={report.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800">
                  {report.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{report.date}</span>
              </div>
              <h4 className="font-extrabold text-navy-950 text-sm mt-2">{report.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{report.findings}</p>
              <div className="mt-2 text-xs text-slate-600">
                Patient: <strong className="text-slate-800">{report.patientName}</strong> (Bed {report.bedNumber})
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
              </span>
              <button
                onClick={() => {
                  const targetPatient = patients.find(p => p.id === report.patientId);
                  setActiveReportForModal({ report, patient: targetPatient });
                }}
                className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white text-xs font-bold transition flex items-center space-x-1"
              >
                <Eye className="w-3 h-3" />
                <span>View Full Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. PHARMACY & MEDICINE REQUESTS ADMIN TAB
export const PharmacyAdminTab = () => {
  const { inventory, medicineRequests, updateMedicineRequestStatus } = useHospital();
  const [activeView, setActiveView] = useState('requests'); // 'requests' | 'inventory'

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-navy-950 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-cyan-600" />
            Hospital Pharmacy Operations & Fulfillment Queue
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Live orders requested directly from patient bedside touchscreen portals
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setActiveView('requests')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeView === 'requests' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Medicine Requests ({medicineRequests.length})
          </button>
          <button
            onClick={() => setActiveView('inventory')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeView === 'inventory' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Inventory Stock ({inventory.length})
          </button>
        </div>
      </div>

      {activeView === 'requests' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="py-3 px-4">Order ID & Time</th>
                <th className="py-3 px-4">Patient / Bed</th>
                <th className="py-3 px-4">Medicine & Dosage</th>
                <th className="py-3 px-4">Prescribing Doctor</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medicineRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    {req.id}
                    <div className="text-[10px] text-slate-400 font-normal">{req.requestTime}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {req.patientName}
                    <div className="text-[11px] text-cyan-700 font-mono">Bed {req.bedNumber} ({req.ward})</div>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-navy-950">
                    {req.medicineName}
                    <span className="text-slate-500 font-normal ml-1">x{req.quantity}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{req.prescribedBy}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Doctor Authorized
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'Approved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {req.status !== 'Delivered' ? (
                      <button
                        onClick={() => updateMedicineRequestStatus(req.id, 'Delivered', 'Delivered to bedside by courier.')}
                        className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition"
                      >
                        Mark Delivered
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map(item => (
            <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-navy-950 text-sm">{item.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                  {item.dosage}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pt-1">
                <span>Stock On Hand:</span>
                <strong className={`text-sm ${item.stock < 50 ? 'text-rose-600 font-black' : 'text-slate-800'}`}>
                  {item.stock} {item.unit}
                </strong>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Batch: {item.batch}</span>
                <span className={`font-bold ${item.status === 'Low Stock' ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. PRINTING REQUESTS ADMIN TAB
export const PrintingAdminTab = () => {
  const { printingRequests, updatePrintJobStatus } = useHospital();

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
        <h3 className="text-base font-extrabold text-navy-950 flex items-center">
          <Printer className="w-5 h-5 mr-2 text-cyan-600" />
          Central Hospital Printing Department & Bedside Delivery Desk
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Patient-initiated physical print requests for diagnostic results and prescriptions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <th className="py-3 px-4">Print Job ID</th>
              <th className="py-3 px-4">Patient & Location</th>
              <th className="py-3 px-4">Requested Document</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {printingRequests.map(job => (
              <tr key={job.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-4 font-mono font-bold text-slate-800">{job.id}</td>
                <td className="py-3 px-4">
                  <div className="font-extrabold text-slate-900">{job.patientName}</div>
                  <div className="text-[11px] text-cyan-700 font-mono">Bed {job.bedNumber} ({job.ward})</div>
                </td>
                <td className="py-3 px-4 font-bold text-navy-950">{job.reportTitle}</td>
                <td className="py-3 px-4 font-mono text-slate-500">{job.requestTime}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    job.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : job.status === 'Ready for Delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {job.status !== 'Delivered' ? (
                    <button
                      onClick={() => updatePrintJobStatus(job.id, 'Delivered', 'Marcus Vance')}
                      className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white font-bold text-[11px] transition"
                    >
                      Mark Delivered
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-semibold">Delivered</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. BILLING & PAYMENTS TAB
export const BillingPaymentsTab = () => {
  const { patients } = useHospital();

  const totalBilled = patients.reduce((acc, p) => acc + (p.billing?.totalAmount || 0), 0);
  const totalInsurance = patients.reduce((acc, p) => acc + (p.billing?.insuranceCovered || 0), 0);
  const totalPatientPayable = patients.reduce((acc, p) => acc + (p.billing?.patientPayable || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold uppercase text-slate-500">Total Active Invoices</span>
          <div className="text-2xl font-black text-navy-950 mt-1">${totalBilled.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">{patients.length} admitted patients</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold uppercase text-slate-500">Insurance Pre-Authorized</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">${totalInsurance.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">82% average reimbursement</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold uppercase text-slate-500">Patient Co-Pay Balance</span>
          <div className="text-2xl font-black text-cyan-700 mt-1">${totalPatientPayable.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Payable at discharge reconciliation</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-navy-950">Patient Admission Billing Breakdown</h3>
          <span className="text-xs text-slate-500">Itemized room, doctor, pharmacy & lab charges</span>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Room & Board</th>
              <th className="py-3 px-4">Consultation</th>
              <th className="py-3 px-4">Pharmacy & Lab</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Insurance Paid</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-4">
                  <div className="font-extrabold text-slate-900">{p.name}</div>
                  <div className="text-[11px] font-mono text-cyan-700">{p.id} • Bed {p.bedNumber}</div>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700">${p.billing?.roomCharges}</td>
                <td className="py-3 px-4 font-mono text-slate-700">${p.billing?.doctorConsultation}</td>
                <td className="py-3 px-4 font-mono text-slate-700">${(p.billing?.pharmacyCharges || 0) + (p.billing?.laboratoryCharges || 0)}</td>
                <td className="py-3 px-4 font-bold font-mono text-navy-950">${p.billing?.totalAmount}</td>
                <td className="py-3 px-4 font-bold font-mono text-emerald-600">${p.billing?.insuranceCovered}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                    {p.billing?.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 6. EMERGENCY ALERTS ADMIN TAB
export const EmergencyAlertsAdminTab = () => {
  const { emergencyAlerts, acknowledgeEmergencyAlert } = useHospital();

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
        <h3 className="text-base font-extrabold text-navy-950 flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-rose-600" />
          Hospital Emergency Incident Management & Rapid Response Log
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Priority Code Blue alerts triggered from bedside touchscreen SOS buttons
        </p>
      </div>

      <div className="space-y-3">
        {emergencyAlerts.map(alert => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              !alert.acknowledged
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-400/40 animate-pulse'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                !alert.acknowledged ? 'bg-rose-600 text-white animate-bounce' : 'bg-slate-100 text-slate-500'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    !alert.acknowledged ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    Bed {alert.bedNumber} ({alert.ward}) — {alert.patientName}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">{alert.reason}</p>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Alert Timestamp: {alert.timestamp} • Incident ID: {alert.id}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-end sm:self-auto">
              {!alert.acknowledged ? (
                <button
                  onClick={() => acknowledgeEmergencyAlert(alert.id, 'Admin Command Desk')}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 transition active:scale-95"
                >
                  Acknowledge & Clear Alarm
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Attended by {alert.acknowledgedBy} ({alert.acknowledgedTime})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. ANALYTICS & REPORTS TAB
export const AnalyticsReportsTab = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
        <h3 className="text-base font-extrabold text-navy-950 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-cyan-600" />
          CareConnect Clinical Performance & Operational Analytics
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time metrics demonstrating paperwork reduction, turnaround time, and ecosystem efficiency
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-1">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Manual Paperwork Elimination</span>
          <div className="text-3xl font-black text-cyan-600">92.4%</div>
          <p className="text-slate-400">Zero duplicate EMR entries</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-1">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Bedside SOS Dispatch Speed</span>
          <div className="text-3xl font-black text-emerald-600">48 sec</div>
          <p className="text-slate-400">Average nurse acknowledgment</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-1">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Pharmacy Fulfillment Time</span>
          <div className="text-3xl font-black text-blue-600">14 min</div>
          <p className="text-slate-400">From bedside request to delivery</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-1">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Bed Turnaround Speed</span>
          <div className="text-3xl font-black text-purple-600">38 min</div>
          <p className="text-slate-400">Discharge to new intake readiness</p>
        </div>
      </div>
    </div>
  );
};

// 8. SETTINGS TAB
export const SettingsTab = () => {
  const { resetDemoData } = useHospital();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
        <h3 className="text-base font-extrabold text-navy-950 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-cyan-600" />
          CareConnect Platform Settings & Configuration
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Ecosystem environment controls, integration parameters, and demo state management
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-4">
        <div>
          <h4 className="font-bold text-navy-950 text-sm">Demo Data & State Reset</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Reset all patient records, bed assignments, print requests, and medicine orders back to the initial demo baseline.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-700 text-white font-extrabold text-xs transition active:scale-95 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore Pristine Demo Dataset</span>
        </button>
      </div>
    </div>
  );
};

