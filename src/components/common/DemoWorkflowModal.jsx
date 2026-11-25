import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  X, CheckCircle, ArrowRight, Play, Sparkles, UserPlus,
  Bed, Monitor, FileText, Printer, CheckSquare, Pill,
  AlertTriangle, LogOut, RotateCcw, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DemoWorkflowModal = ({ isOpen, onClose }) => {
  const {
    patients,
    beds,
    setCurrentRole,
    setAdminActiveTab,
    setSelectedBedId,
    registerPatient,
    doctorAddReport,
    requestPrintJob,
    updatePrintJobStatus,
    requestMedicineOrder,
    updateMedicineRequestStatus,
    triggerEmergencyAlert,
    dischargePatient,
    showToast,
    printingRequests,
    medicineRequests,
    emergencyAlerts,
    setActiveReportForModal
  } = useHospital();

  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  const DEMO_STEPS = [
    {
      step: 1,
      title: 'Admin Registers a New Patient',
      actor: 'Hospital Administrator',
      targetRole: 'admin',
      targetTab: 'Admission & Discharge',
      icon: UserPlus,
      description: 'Hospital reception/admin fills out complete intake details (Demographics, Allergies, Attendant, Diagnosis).',
      actionLabel: 'Simulate Step 1: Register "Alexander Scott"',
      runAction: () => {
        const availableBed = beds.find(b => b.status === 'available') || beds[0];
        const newP = registerPatient({
          name: 'Alexander Scott',
          age: 48,
          dob: '1978-02-14',
          gender: 'Male',
          phone: '+1 (555) 778-9900',
          emergencyContact: 'Rachel Scott',
          emergencyPhone: '+1 (555) 778-9901',
          relationship: 'Spouse',
          address: '42 Highland Terrace, Boston, MA',
          medicalHistory: 'Mild Hypertension, Penicillin allergy',
          allergies: 'Penicillin',
          diagnosis: 'Acute Gastrointestinal Bleed & Severe Dehydration',
          assignedDoctor: 'Dr. Sarah Jenkins',
          assignedNurse: 'Nurse Elena Ramos',
          bedId: availableBed.id,
          attendantName: 'Rachel Scott',
          attendantPhone: '+1 (555) 778-9901'
        });
        setCurrentRole('admin');
        setAdminActiveTab('Patient Management');
        showToast('Step 1 Complete: Patient Alexander Scott registered & record created!', 'success');
      }
    },
    {
      step: 2,
      title: 'System Generates ID & Assigns Bed',
      actor: 'CareConnect Core Engine',
      targetRole: 'admin',
      targetTab: 'Bed Management',
      icon: Bed,
      description: 'System automatically issues unique Patient ID (PAT-2026-XXXX) and reserves an available bed in the correct clinical ward.',
      actionLabel: 'View Bed Assignment in Bed Management',
      runAction: () => {
        setCurrentRole('admin');
        setAdminActiveTab('Bed Management');
        showToast('Step 2 Verified: Bed reserved and linked to digital EMR!', 'info');
      }
    },
    {
      step: 3,
      title: 'Bedside Touchscreen Portal Activates',
      actor: 'Patient Touchscreen Kiosk',
      targetRole: 'patient',
      icon: Monitor,
      description: 'The physical tablet mounted beside the patient\'s bed automatically awakens with personalized medical portal, large touch controls, and emergency button.',
      actionLabel: 'Switch to Bedside Touchscreen Portal',
      runAction: () => {
        const p = patients[0];
        const patientBed = beds.find(b => b.patientId === p.id) || beds[1];
        setSelectedBedId(patientBed.id);
        setCurrentRole('patient');
        showToast(`Step 3: Bedside Touchscreen active for Bed ${patientBed.bedNumber} (${p.name})!`, 'success');
      }
    },
    {
      step: 4,
      title: 'Doctor Uploads Lab / Blood Report',
      actor: 'Doctor (Dr. Sarah Jenkins)',
      targetRole: 'doctor',
      icon: FileText,
      description: 'Attending physician uploads high-priority diagnostic lab findings. Real-time bus pushes it directly to the bedside screen.',
      actionLabel: 'Doctor Uploads "Serial Blood Gas & Electrolytes Panel"',
      runAction: () => {
        const targetPatient = patients[0];
        doctorAddReport(targetPatient.id, {
          title: 'Comprehensive Arterial Blood Gas & Electrolytes Panel',
          category: 'Blood Test',
          doctor: 'Dr. Sarah Jenkins',
          labTechnician: 'Urgent Care Stat Lab',
          findings: 'Arterial blood gas confirms metabolic acidosis resolving. Serum potassium normalized to 4.1 mEq/L. Serum lactate reduced to 1.4 mmol/L.',
          recommendation: 'Continue IV hydration and monitor electrolytes in 12 hours.'
        });
        setCurrentRole('doctor');
        showToast(`Step 4: Doctor uploaded new lab report for ${targetPatient.name}!`, 'success');
      }
    },
    {
      step: 5,
      title: 'Patient Opens Report on Bedside Screen',
      actor: 'Patient (Bedside)',
      targetRole: 'patient',
      icon: Eye,
      description: 'Patient taps the new report on their bedside tablet to inspect results, findings, and doctor comments in transparent, accessible language.',
      actionLabel: 'Open Report on Bedside Screen',
      runAction: () => {
        const targetPatient = patients[0];
        const latestReport = targetPatient.reports[0];
        const patientBed = beds.find(b => b.patientId === targetPatient.id) || beds[1];
        setSelectedBedId(patientBed.id);
        setCurrentRole('patient');
        if (latestReport) {
          setActiveReportForModal({ report: latestReport, patient: targetPatient });
        }
        showToast(`Step 5: Patient viewing "${latestReport?.title || 'Report'}" on bedside screen!`, 'info');
      }
    },
    {
      step: 6,
      title: 'Patient Requests Physical Printed Copy',
      actor: 'Patient (Bedside)',
      targetRole: 'patient',
      icon: Printer,
      description: 'With one touch, patient requests physical printing for their medical folder or family. Sent immediately to the hospital printing department.',
      actionLabel: 'Request Bedside Physical Printout',
      runAction: () => {
        const targetPatient = patients[0];
        const latestReport = targetPatient.reports[0];
        if (latestReport) {
          requestPrintJob(targetPatient.id, latestReport.id);
        }
        setCurrentRole('patient');
        showToast('Step 6: Print request dispatched to Hospital Printing Hub!', 'success');
      }
    },
    {
      step: 7,
      title: 'Printing Dept Receives & Delivers Document',
      actor: 'Printing Department (Marcus Vance)',
      targetRole: 'printing',
      icon: CheckSquare,
      description: 'Central printing staff prints the high-resolution laser document and marks it "Delivered to Bedside".',
      actionLabel: 'Printing Dept Marks Order "Delivered"',
      runAction: () => {
        const pending = printingRequests[0];
        if (pending) {
          updatePrintJobStatus(pending.id, 'Delivered', 'Marcus Vance');
        }
        setCurrentRole('printing');
        showToast('Step 7: Print job completed and delivered to patient bedside!', 'success');
      }
    },
    {
      step: 8,
      title: 'Patient Requests Prescribed Medicine',
      actor: 'Patient (Bedside)',
      targetRole: 'patient',
      icon: Pill,
      description: 'Patient clicks to request doctor-authorized prescription medication directly from the hospital pharmacy.',
      actionLabel: 'Patient Requests Prescribed Medication',
      runAction: () => {
        const targetPatient = patients[0];
        const rx = targetPatient.prescriptions[0];
        if (rx) {
          requestMedicineOrder(targetPatient.id, rx.id, 1);
        }
        setCurrentRole('patient');
        showToast(`Step 8: Medicine order for ${rx?.medicineName} submitted to Pharmacy!`, 'success');
      }
    },
    {
      step: 9,
      title: 'Pharmacy Verifies & Updates Delivery',
      actor: 'Hospital Pharmacy (Alex Rivera, PharmD)',
      targetRole: 'pharmacy',
      icon: CheckCircle,
      description: 'Pharmacist verifies valid prescription against clinical records, dispenses medication, and confirms bedside courier delivery.',
      actionLabel: 'Pharmacy Approves & Confirms Delivery',
      runAction: () => {
        const pending = medicineRequests[0];
        if (pending) {
          updateMedicineRequestStatus(pending.id, 'Delivered', 'Dispensed and bedside delivery confirmed by courier.');
        }
        setCurrentRole('pharmacy');
        showToast('Step 9: Medicine verified and delivered to patient bedside!', 'success');
      }
    },
    {
      step: 10,
      title: 'Patient Clicks Emergency Assistance',
      actor: 'Patient (Bedside)',
      targetRole: 'patient',
      icon: AlertTriangle,
      description: 'Patient presses the prominent red SOS button on their bedside screen for immediate urgent care.',
      actionLabel: 'Simulate Bedside Emergency SOS Call',
      runAction: () => {
        const targetPatient = patients[0];
        const patientBed = beds.find(b => b.patientId === targetPatient.id) || beds[1];
        setSelectedBedId(patientBed.id);
        triggerEmergencyAlert(targetPatient.id, 'Acute chest discomfort reported via Bedside Emergency SOS Button');
        setCurrentRole('patient');
        showToast(`Step 10: 🚨 SOS Triggered from Bed ${targetPatient.bedNumber}!`, 'error');
      }
    },
    {
      step: 11,
      title: 'Nurse Station Receives & Acknowledges Alert',
      actor: 'Nurse Station (Nurse Elena Ramos)',
      targetRole: 'nurse',
      icon: AlertTriangle,
      description: 'Nursing station receives audible/visual priority alarm with bed number, patient details, and dispatches rapid response team.',
      actionLabel: 'Nurse Station Acknowledges Alert',
      runAction: () => {
        setCurrentRole('nurse');
        showToast('Step 11: Nurse Station responding to Code Blue alert with priority dispatch!', 'info');
      }
    },
    {
      step: 12,
      title: 'Admin Discharges Patient & Releases Bed',
      actor: 'Hospital Administrator',
      targetRole: 'admin',
      targetTab: 'Admission & Discharge',
      icon: LogOut,
      description: 'Admin compiles final summary, settles patient invoice, marks bed available for sanitization, and archives digital EMR.',
      actionLabel: 'Complete Patient Discharge & Release Bed',
      runAction: () => {
        const targetPatient = patients[0];
        if (targetPatient) {
          dischargePatient(targetPatient.id, 'Full recovery achieved. Patient discharged in stable condition with outpatient cardiology follow-up in 10 days.');
        }
        setCurrentRole('admin');
        setAdminActiveTab('Admission & Discharge');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast('Step 12: Complete patient lifecycle finished! Bed released to available inventory.', 'success');
      }
    }
  ];

  const currentStepObj = DEMO_STEPS.find(s => s.step === activeStep) || DEMO_STEPS[0];
  const CurrentIcon = currentStepObj.icon;

  const handleExecuteCurrent = () => {
    currentStepObj.runAction();
    if (activeStep < 12) {
      setActiveStep(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold tracking-tight text-white">
                  CARECONNECT 12-STEP END-TO-END DEMO TOUR
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  Investor & Judge Mode
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Demonstrates the complete interconnected hospital ecosystem across all 6 dashboards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills / Slider */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center space-x-2">
          {DEMO_STEPS.map((s) => {
            const isDone = s.step < activeStep;
            const isCurrent = s.step === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
                  isCurrent
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Step {s.step}</span>
                {isDone && <CheckCircle className="w-3 h-3 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Current Step Focus Showcase */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60 flex flex-col justify-between">
          
          <div className="space-y-5">
            {/* Step Card Header */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <CurrentIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                      STEP {currentStepObj.step} OF 12
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">
                      Actor: <strong className="text-navy-900">{currentStepObj.actor}</strong>
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-navy-900 mt-1">
                    {currentStepObj.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                    {currentStepObj.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-navy-100 text-navy-800">
                  Target Dashboard: {currentStepObj.targetRole.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Step Execution & Live Feedback Preview */}
            <div className="p-5 bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-2xl shadow-md border border-navy-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">
                    Live System Trigger
                  </h5>
                  <p className="text-xs text-slate-300 mt-1">
                    Clicking below will execute this workflow step in real time, update the centralized database, and switch to the relevant dashboard.
                  </p>
                </div>

                <button
                  onClick={handleExecuteCurrent}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition active:scale-95 flex items-center justify-center space-x-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{currentStepObj.actionLabel}</span>
                </button>
              </div>
            </div>

            {/* Interconnection Explainer Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <strong className="text-navy-900 block mb-1">Centralized State</strong>
                <p className="text-slate-500">All 6 dashboards share one unified patient database. Zero duplicated records or manual data re-entry.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <strong className="text-navy-900 block mb-1">Immediate Bedside Sync</strong>
                <p className="text-slate-500">Doctor prescriptions & reports push instantly to the patient's bedside touch display with zero lag.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <strong className="text-navy-900 block mb-1">Audit Compliance</strong>
                <p className="text-slate-500">Every admission, medicine dispense, print job, and SOS trigger is permanently timestamped.</p>
              </div>
            </div>
          </div>

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              Previous Step
            </button>

            <span className="text-xs font-semibold text-slate-500">
              Step {activeStep} of 12
            </span>

            <button
              onClick={() => setActiveStep(prev => Math.min(12, prev + 1))}
              disabled={activeStep === 12}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 disabled:opacity-40 transition flex items-center space-x-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

