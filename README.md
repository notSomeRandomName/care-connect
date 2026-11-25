# CARECONNECT – Smart Hospital Management Ecosystem

> **Tagline:** *“Everything a Patient Needs, Just One Touch Away.”*

CARECONNECT is a modern, responsive, full-stack healthcare technology platform designed to digitize hospital operations, eliminate repetitive paperwork, prevent medical data duplication, and interconnect admitted patients, attending physicians, nursing stations, hospital pharmacies, printing departments, and executive administration through a single centralized digital nervous system.

---

## 🌟 Key Architecture & Highlights

1. **Centralized Real-Time Digital EMR Backbone**:
   - Single Patient ID (`PAT-2026-XXXX`) unified across Admission, Bed Allocation, Nursing Observations, Doctor Prescriptions, Laboratory Reports, Pharmacy Dispensing, Printing Logistics, and Discharge Billing.
   - Any clinical order or telemetry change made by a Doctor or Nurse instantly synchronizes to that patient's physical bedside touchscreen interface.

2. **Dedicated Patient Bedside Touchscreen Kiosk (The Core Innovation)**:
   - Optimized for mounted bedside tablets with large, accessible touch targets, high contrast, and responsive layout.
   - **Permanent Emergency SOS Button**: Features visual pulsating beacons, one-touch trigger, hospital hotline extensions (`Ext. 3333` / `911`), and immediate audible dispatch to the assigned Nurse Station.
   - **Diagnostic & Lab Reports Viewer**: Direct bedside access to Troponin-I panels, 12-lead ECGs, CT Angiography, Brain MRIs, X-Rays, and Histopathology with full clinical findings.
   - **One-Touch Bedside Print Requests**: Requests physical laser printouts of any verified medical record. The hospital print hub prints and delivers the document directly to the bedside.
   - **Doctor-Authorized Medicine Ordering**: Displays only doctor-prescribed medications. Patients can request refills or scheduled doses, with live status tracking (`Pending` → `Approved & Dispensed` → `Out for Bedside Delivery` → `Delivered`).
   - **Nurse & Hospital Service Dispatch**: Direct touch buttons for Duty Nurse Call, Wheelchair Transport Assistance, Housekeeping & Fresh Linens, and General Attendant Support.
   - **Personalized Clinical Nutrition & Meal Schedule**: Breakfast, Lunch, and Dinner dietary prescriptions (e.g. Cardiac Low-Sodium, Post-Surgical Soft, Diabetic Mechanical Soft, Pediatric Allergen-Free, Neutropenic Oncology Diet).

3. **Hospital Administrator Dashboard (16 Enterprise Modules)**:
   - **Overview**: 10 live KPI metrics (Admitted Patients, Available Beds, Occupied Beds, Discharged EMRs, Today's Admissions, Today's Discharges, Pending Medicines, Pending Prints, Active SOS Alarms, Staff On Duty) + Interactive 24-bed Ward Allocation Map & Department Analytics.
   - **Patient Management**: Search, filter by ward, review clinical diagnoses, transfer beds, and launch individual touchscreen kiosks.
   - **Admission & Discharge**: Complete patient intake form with auto-ID generation, ward allocation, attendant pass creation, and full discharge summary generation with bed release.
   - **Bed Management**: Interactive 24-bed matrix covering ICU, General Ward A, Ward B, Maternity, and Pediatric wards with real-time status toggles (`Occupied`, `Available`, `Cleaning`, `Maintenance`).
   - **Doctor & Nurse Management**: Duty assignments, contact lines, and shift badges.
   - **Medical Records & Laboratory Reports**: Comprehensive searchable repository of verified lab tests and imaging.
   - **Pharmacy & Medicine Requests**: Central inventory tracking with batch numbers, stock indicators, and prescription verification.
   - **Printing Requests Hub**: Laser queue management with status pipeline (`Pending` → `Printing` → `Ready for Delivery` → `Delivered`).
   - **Billing & Payments**: Itemized room, doctor, pharmacy, and diagnostic invoice breakdowns with insurance reconciliation.
   - **Emergency Alerts**: Rapid response dispatch desk with incident logs and timestamped response metrics.
   - **Staff Management**: Rosters across physicians, nursing personnel, clinical pharmacists, and print couriers.
   - **Analytics & Reports**: Operational throughput KPIs, paperwork elimination rates (92.4%), and average emergency response times (48 seconds).
   - **Settings & Demo Reset**: Instant state reset to restore pristine demo data.

4. **Dedicated Doctor Dashboard**:
   - Multi-specialist switcher (Cardiology, Neurology, Critical Care, Orthopedics, Pediatrics, General Surgery).
   - Real-time patient roster with live vitals.
   - Issue New Prescriptions (dosage, schedule, route, duration) → immediately reflected on Bedside Touchscreen!
   - Upload & Order Diagnostic Reports (Blood tests, X-rays, CT scans, MRIs) → instantly available on Bedside Touchscreen!
   - Update Clinical Treatment Plans and add progress notes.

5. **Dedicated Nurse Station Dashboard**:
   - Priority 1 Emergency SOS Alert Beacon with flashing pulse animations and bed number badges.
   - Immediate "Acknowledge & Respond" dispatch protocol.
   - Bedside Assistance Queue (Nurse call, Wheelchair, Housekeeping) with status updates.
   - Live Vitals Entry modal: Record Heart Rate, Blood Pressure, SpO2, Temperature, Respiration, Blood Glucose → updates Bedside monitor instantly!

6. **Dedicated Pharmacy Dashboard**:
   - Real-time incoming medicine orders from bedside screens.
   - Prescription authorization verification badge.
   - Approve, Dispense, Out for Bedside Delivery, and Handover Confirmation workflow.
   - Medicine inventory stock monitoring with low-stock alerts.

7. **Dedicated Printing Department Dashboard**:
   - Real-time queue of patient-requested paper documents.
   - Document inspection modal with high-res clinical letterhead.
   - Status tracking from `Pending` → `Printing` → `Ready for Delivery` → `Delivered to Bedside`.

8. **Interactive 12-Step Guided Demo Tour (For Judges & Investors)**:
   - Built-in walkthrough modal demonstrating the complete 12-step end-to-end patient lifecycle required by the prompt.

---

## 🚀 Running the Application

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Launch
```bash
# Navigate to the platform directory
cd careconnect-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be live at:
**`http://localhost:3000/`**

---

## 📋 The 12-Step Guided Demo Workflow (Section 11)

1. **Step 1**: Admin registers a new patient (Auto-generates ID, assigns bed, fills demographics & clinical diagnosis).
2. **Step 2**: System reserves available bed and initializes digital EMR.
3. **Step 3**: Bedside Touchscreen Portal automatically awakens with personalized clinical portal.
4. **Step 4**: Attending Doctor uploads blood gas / laboratory report.
5. **Step 5**: Patient opens and inspects the report directly on their bedside tablet.
6. **Step 6**: Patient requests a physical laser printout with one touch.
7. **Step 7**: Printing department prints and marks the job "Delivered to Bedside".
8. **Step 8**: Patient requests prescribed medicine refill from hospital pharmacy.
9. **Step 9**: Pharmacy verifies authorized prescription, dispenses, and confirms delivery.
10. **Step 10**: Patient clicks the prominent red Emergency Assistance SOS button.
11. **Step 11**: Nurse Dashboard receives flashing priority alarm with bed number and dispatches staff.
12. **Step 12**: Admin executes discharge, generates clinical summary, settles invoice, and releases bed to available inventory.

