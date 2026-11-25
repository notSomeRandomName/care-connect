import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, UserPlus, CheckCircle, Shield, AlertCircle, Bed } from 'lucide-react';

export const PatientRegistrationModal = ({ isOpen, onClose }) => {
  const { beds, staff, registerPatient, showToast } = useHospital();

  const availableBeds = beds.filter(b => b.status === 'available');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '1988-05-12',
    gender: 'Male',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    relationship: 'Spouse',
    address: '',
    medicalHistory: '',
    allergies: 'None reported',
    diagnosis: '',
    assignedDoctor: staff.doctors[0]?.name || 'Dr. Sarah Jenkins',
    assignedNurse: staff.nurses[0]?.name || 'Nurse Elena Ramos',
    bedId: availableBeds[0]?.id || '',
    attendantName: '',
    attendantPhone: '',
    currentTreatment: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.phone || !formData.diagnosis || !formData.bedId) {
      showToast('Please fill out all required clinical fields.', 'warning');
      return;
    }

    const created = registerPatient(formData);
    if (created) {
      onClose();
    }
  };

  const handleFillDemoData = () => {
    setFormData({
      name: 'Eleanor Vance Sterling',
      age: '46',
      dob: '1980-09-14',
      gender: 'Female',
      phone: '+1 (555) 674-8899',
      emergencyContact: 'David Vance',
      emergencyPhone: '+1 (555) 674-8890',
      relationship: 'Brother',
      address: '92 West End Avenue, New York, NY',
      medicalHistory: 'Hypothyroidism, controlled hypertension, mild allergy to penicillin.',
      allergies: 'Penicillin (mild rash)',
      diagnosis: 'Acute Pyelonephritis with Uncontrolled Dehydration',
      assignedDoctor: 'Dr. Aisha Patel',
      assignedNurse: 'Nurse Elena Ramos',
      bedId: availableBeds[0]?.id || beds[0].id,
      attendantName: 'David Vance',
      attendantPhone: '+1 (555) 674-8890',
      currentTreatment: 'IV Ceftriaxone 1g daily, isotonic saline resuscitation, renal profile monitoring.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">New Patient Intake & Bed Assignment</h3>
              <p className="text-xs text-cyan-200">Automatically creates EMR, assigns bed & activates bedside touchscreen</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleFillDemoData}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition"
            >
              Fill Sample Data
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          
          {/* Section 1: Demographics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 flex items-center">
              1. Patient Demographics & Identification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age (Years) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 45"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
              <input
                type="text"
                placeholder="Street address, city, state, zip"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Section 2: Clinical Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 flex items-center">
              2. Clinical Diagnosis & Medical History
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admission Diagnosis *</label>
              <input
                type="text"
                required
                placeholder="Primary clinical diagnosis for hospital admission"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Allergies (Critical Flag)</label>
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Sulfa, Peanuts or 'None'"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-rose-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Prior Medical History</label>
                <input
                  type="text"
                  placeholder="Hypertension, diabetes, surgeries..."
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Initial Treatment Plan Instructions</label>
              <textarea
                rows={2}
                placeholder="Initial IV orders, vitals frequency, dietary instructions..."
                value={formData.currentTreatment}
                onChange={(e) => setFormData({ ...formData, currentTreatment: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Section 3: Bed Assignment & Staff */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 flex items-center">
              3. Bed Allocation & Staff Assignment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Available Bed *</label>
                {availableBeds.length === 0 ? (
                  <p className="text-xs text-rose-500 font-bold p-2 bg-rose-50 rounded-lg">
                    No beds currently available. Discharge a patient first.
                  </p>
                ) : (
                  <select
                    value={formData.bedId}
                    onChange={(e) => setFormData({ ...formData, bedId: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-cyan-400 bg-cyan-50/50 font-bold text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {availableBeds.map(b => (
                      <option key={b.id} value={b.id}>
                        Bed {b.bedNumber} ({b.ward} - {b.department})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Attending Doctor</label>
                <select
                  value={formData.assignedDoctor}
                  onChange={(e) => setFormData({ ...formData, assignedDoctor: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {staff.doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Nurse</label>
                <select
                  value={formData.assignedNurse}
                  onChange={(e) => setFormData({ ...formData, assignedNurse: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {staff.nurses.map(n => (
                    <option key={n.id} value={n.name}>{n.name} ({n.ward})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Emergency Contact & Attendant Pass */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 flex items-center">
              4. Emergency Contact & Attendant Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Primary next-of-kin"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value, attendantName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  placeholder="Spouse, Child, Parent..."
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value, attendantPhone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={availableBeds.length === 0}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-cyan-600/30 transition active:scale-95 flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete Admission & Activate Bed</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

