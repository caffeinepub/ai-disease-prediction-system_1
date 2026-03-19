import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Brain,
  ChevronRight,
  Database,
  FlaskConical,
  GitBranch,
  HeartPulse,
  Info,
  Leaf,
  Menu,
  Microscope,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ── Disease Data ────────────────────────────────────────────────────────────
type RiskLevel = "Critical" | "High" | "Medium" | "Low";

interface Disease {
  name: string;
  symptoms: string[];
  risk: RiskLevel;
  overview: string;
  diet: string[];
  medicines: string[];
  prevention: string[];
}

const DISEASES: Disease[] = [
  {
    name: "Lung Cancer",
    symptoms: [
      "Persistent Cough",
      "Blood in Cough",
      "Weight Loss",
      "Shortness of Breath",
      "Chest Pain",
      "Fatigue",
      "Hoarseness",
      "Bone Pain",
      "Headache",
      "Loss of Appetite",
      "Wheezing",
      "Chest Tightness",
      "Coughing Up Blood",
      "Rapid Breathing",
      "Difficulty Breathing When Lying Down",
    ],
    risk: "Critical",
    overview:
      "Lung cancer is one of the most common and serious types of cancer. Early detection significantly improves survival rates. This prediction is for educational purposes only.",
    diet: [
      "Antioxidant-rich fruits (berries, citrus)",
      "Cruciferous vegetables (broccoli, cauliflower)",
      "Lean proteins (fish, legumes)",
      "Avoid processed meats and smoking",
      "Green tea for antioxidants",
      "Whole grains for fiber",
    ],
    medicines: [
      "Chemotherapy agents (Carboplatin, Paclitaxel)",
      "Targeted therapies (Erlotinib, Gefitinib)",
      "Immunotherapy (Pembrolizumab)",
      "Radiation therapy protocols",
      "Surgery (Lobectomy, Pneumonectomy)",
    ],
    prevention: [
      "Never smoke — quit immediately if you do",
      "Avoid secondhand smoke exposure",
      "Test home for radon gas",
      "Avoid carcinogens at workplace",
      "Regular lung screening CT for high-risk groups",
    ],
  },
  {
    name: "Breast Cancer",
    symptoms: [
      "Swollen Lymph Nodes",
      "Weight Loss",
      "Fatigue",
      "Night Sweats",
      "Loss of Appetite",
      "Breast Lump",
      "Nipple Discharge",
      "Skin Dimpling",
      "Breast Pain",
      "Arm Swelling",
      "Lump in Armpit",
      "Changes in Moles",
      "Non-healing Sores",
      "Unexplained Bleeding",
    ],
    risk: "High",
    overview:
      "Breast cancer is the most common cancer in women worldwide. Regular mammograms and self-exams are crucial for early detection.",
    diet: [
      "Mediterranean diet rich in olive oil",
      "Soy products in moderation",
      "Omega-3 fatty acids (salmon, walnuts)",
      "Limit alcohol consumption",
      "High-fiber foods",
      "Avoid high-fat dairy",
    ],
    medicines: [
      "Hormone therapy (Tamoxifen, Letrozole)",
      "Targeted therapy (Herceptin/Trastuzumab)",
      "Chemotherapy combinations",
      "CDK4/6 inhibitors (Palbociclib)",
      "PARP inhibitors for BRCA mutations",
    ],
    prevention: [
      "Regular mammography screening",
      "Monthly self breast examination",
      "Maintain healthy body weight",
      "Limit alcohol to 1 drink/day",
      "Breastfeed if possible",
      "Know your family history",
    ],
  },
  {
    name: "Colon Cancer",
    symptoms: [
      "Blood in Stool",
      "Weight Loss",
      "Fatigue",
      "Nausea",
      "Loss of Appetite",
      "Abdominal Pain",
      "Change in Bowel Habits",
      "Rectal Bleeding",
      "Bloating",
      "Constipation",
      "Diarrhea",
      "Rectal Pain",
      "Mucus in Stool",
      "Dark Urine",
    ],
    risk: "High",
    overview:
      "Colorectal cancer develops in the colon or rectum. Colonoscopy screening can detect precancerous polyps before they become cancerous.",
    diet: [
      "High-fiber diet (fruits, vegetables, whole grains)",
      "Limit red and processed meat",
      "Calcium-rich foods (dairy, leafy greens)",
      "Adequate vitamin D",
      "Stay well hydrated",
      "Limit alcohol",
    ],
    medicines: [
      "Chemotherapy (FOLFOX, FOLFIRI regimens)",
      "Targeted therapy (Bevacizumab, Cetuximab)",
      "Immunotherapy (Pembrolizumab for MSI-H)",
      "Surgical resection",
      "Radiation therapy for rectal cancer",
    ],
    prevention: [
      "Colonoscopy screening from age 45",
      "Maintain healthy weight",
      "Exercise regularly (150 min/week)",
      "Eat high-fiber, low-fat diet",
      "Avoid smoking and excess alcohol",
      "Aspirin therapy (consult doctor)",
    ],
  },
  {
    name: "Leukemia",
    symptoms: [
      "Fatigue",
      "Weight Loss",
      "Swollen Lymph Nodes",
      "Night Sweats",
      "Fever",
      "Loss of Appetite",
      "Easy Bruising",
      "Frequent Infections",
      "Bone Pain",
      "Nosebleeds",
      "Pale Skin",
      "Unexplained Bruising",
      "Joint Pain",
      "Chills",
      "Frequent Urination",
    ],
    risk: "Critical",
    overview:
      "Leukemia is cancer of the blood and bone marrow. Different types respond differently to treatment, with some highly treatable with modern therapies.",
    diet: [
      "Iron-rich foods (spinach, lentils)",
      "Vitamin C for iron absorption",
      "Protein-rich foods for recovery",
      "Avoid raw/undercooked foods during treatment",
      "Stay hydrated (2-3L water/day)",
      "Soft foods if mouth sores occur",
    ],
    medicines: [
      "Chemotherapy (Cytarabine, Daunorubicin)",
      "Targeted therapy (Imatinib for CML)",
      "Immunotherapy and CAR-T cell therapy",
      "Bone marrow/stem cell transplant",
      "Supportive care (blood transfusions)",
    ],
    prevention: [
      "Avoid benzene exposure",
      "Limit radiation exposure",
      "No known guaranteed prevention",
      "Maintain healthy immune system",
      "Regular blood count checks if at risk",
    ],
  },
  {
    name: "Heart Disease",
    symptoms: [
      "Chest Pain",
      "Shortness of Breath",
      "Fatigue",
      "Nausea",
      "Body Aches",
      "Rapid Heartbeat",
      "Irregular Heartbeat",
      "Swollen Ankles",
      "Dizziness",
      "Excessive Sweating",
    ],
    risk: "Critical",
    overview:
      "Heart disease is the leading cause of death worldwide. It includes coronary artery disease, heart failure, and arrhythmias. Lifestyle modification is key.",
    diet: [
      "DASH diet (low sodium, rich in potassium)",
      "Mediterranean diet",
      "Omega-3 fatty acids",
      "Limit saturated and trans fats",
      "Reduce sodium to <2300mg/day",
      "Increase fruits and vegetables",
    ],
    medicines: [
      "Statins (Atorvastatin, Rosuvastatin)",
      "ACE inhibitors (Lisinopril)",
      "Beta-blockers (Metoprolol)",
      "Antiplatelet therapy (Aspirin, Clopidogrel)",
      "Nitrates for chest pain relief",
    ],
    prevention: [
      "Quit smoking immediately",
      "Exercise 150 minutes/week",
      "Maintain healthy BP (<130/80)",
      "Control diabetes and cholesterol",
      "Manage stress effectively",
      "Regular cardiovascular checkups",
    ],
  },
  {
    name: "Lymphoma",
    symptoms: [
      "Swollen Lymph Nodes",
      "Night Sweats",
      "Fatigue",
      "Weight Loss",
      "Fever",
      "Chest Pain",
      "Shortness of Breath",
      "Itchy Skin",
      "Loss of Appetite",
      "Lump in Neck",
      "Lump in Armpit",
      "Lump in Groin",
      "Chills",
      "Skin Rash",
    ],
    risk: "High",
    overview:
      "Lymphoma is cancer of the lymphatic system. Hodgkin lymphoma has a high cure rate; Non-Hodgkin lymphoma varies widely. Early detection is critical.",
    diet: [
      "Anti-inflammatory foods",
      "Lean proteins and legumes",
      "Colorful fruits and vegetables",
      "Limit processed foods",
      "Stay hydrated",
      "Avoid alcohol during treatment",
    ],
    medicines: [
      "CHOP chemotherapy regimen",
      "Rituximab (for B-cell lymphomas)",
      "ABVD for Hodgkin lymphoma",
      "Stem cell transplantation",
      "Radiation therapy to affected nodes",
    ],
    prevention: [
      "Protect immune system health",
      "Avoid unnecessary radiation",
      "Treat HIV and infections promptly",
      "Limit immunosuppressive medications when possible",
      "Regular lymph node self-check",
    ],
  },
  {
    name: "Pancreatic Cancer",
    symptoms: [
      "Weight Loss",
      "Nausea",
      "Fatigue",
      "Loss of Appetite",
      "Abdominal Pain",
      "Jaundice",
      "Back Pain",
      "Blood Clots",
      "Dark Urine",
      "Pale Stools",
      "Yellowing Skin",
      "Indigestion",
      "Unexplained Bleeding",
    ],
    risk: "Critical",
    overview:
      "Pancreatic cancer is often diagnosed late due to few early symptoms. It has one of the lowest survival rates, making early recognition of risk factors vital.",
    diet: [
      "Small, frequent meals",
      "Low-fat diet to reduce pancreatic stress",
      "Pancreatic enzyme supplements as prescribed",
      "Avoid alcohol completely",
      "High-calorie nutrient-dense foods",
      "Vitamin D and calcium supplements",
    ],
    medicines: [
      "Gemcitabine-based chemotherapy",
      "FOLFIRINOX regimen for fit patients",
      "PARP inhibitors for BRCA-mutated",
      "Whipple surgery (Pancreaticoduodenectomy)",
      "Palliative care for advanced cases",
    ],
    prevention: [
      "Never smoke",
      "Maintain healthy weight",
      "Limit alcohol intake",
      "Manage diabetes carefully",
      "Avoid chronic pancreatitis triggers",
      "Genetic counseling if family history exists",
    ],
  },
  {
    name: "Brain Tumor",
    symptoms: [
      "Headache",
      "Nausea",
      "Vomiting",
      "Vision Problems",
      "Seizures",
      "Memory Loss",
      "Fatigue",
      "Difficulty Speaking",
      "Loss of Balance",
      "Personality Changes",
      "Dizziness",
      "Numbness",
      "Confusion",
      "Blurred Vision",
      "Tingling",
    ],
    risk: "Critical",
    overview:
      "Brain tumors are abnormal growths of cells in the brain. They can be benign or malignant. Early diagnosis and treatment are critical for improving outcomes. This prediction is for educational purposes only.",
    diet: [
      "Anti-inflammatory foods (leafy greens, berries)",
      "Omega-3 rich fish (salmon, sardines)",
      "Turmeric with black pepper",
      "Avoid processed foods and refined sugar",
      "Colorful vegetables high in antioxidants",
      "Whole grains and legumes",
    ],
    medicines: [
      "Chemotherapy (Temozolomide)",
      "Radiation therapy (stereotactic radiosurgery)",
      "Corticosteroids (Dexamethasone) for swelling",
      "Bevacizumab (Avastin) for glioblastoma",
      "Surgical resection where feasible",
    ],
    prevention: [
      "Regular neurological checkups if symptomatic",
      "Avoid unnecessary radiation to the head",
      "Maintain a healthy lifestyle and diet",
      "Report persistent headaches to a doctor promptly",
      "Genetic counseling if family history exists",
    ],
  },
  {
    name: "Coronary Artery Disease",
    symptoms: [
      "Chest Pain",
      "Shortness of Breath",
      "Fatigue",
      "Nausea",
      "Rapid Heartbeat",
      "Irregular Heartbeat",
      "Cold Hands and Feet",
      "Dizziness",
      "Swollen Legs",
    ],
    risk: "High",
    overview:
      "CAD occurs when coronary arteries narrow due to plaque buildup, reducing blood flow to the heart. It's a major cause of heart attacks.",
    diet: [
      "Heart-healthy Mediterranean diet",
      "Oatmeal and whole grains (soluble fiber)",
      "Nuts and seeds in moderation",
      "Fatty fish twice per week",
      "Reduce sodium and refined sugar",
      "Dark chocolate (>70% cacao) in moderation",
    ],
    medicines: [
      "Statins for cholesterol management",
      "Antiplatelet drugs (Aspirin daily)",
      "Beta-blockers for heart rate control",
      "Calcium channel blockers",
      "Angioplasty or bypass surgery",
    ],
    prevention: [
      "Control high blood pressure",
      "Keep LDL cholesterol <100 mg/dL",
      "Exercise aerobically 5x/week",
      "Quit smoking and avoid secondhand smoke",
      "Manage stress with mindfulness",
      "Annual cardiac risk assessment",
    ],
  },
];

const ALL_SYMPTOMS = [
  // General Cancer Symptoms
  "Fatigue",
  "Unexplained Weight Loss",
  "Night Sweats",
  "Fever",
  "Loss of Appetite",
  "Persistent Fatigue",
  "Weakness",
  "Malaise",
  "Poor Concentration",
  "Mood Changes",
  "Depression",
  "Anxiety",
  "Insomnia",
  "Chills",
  "Excessive Sweating",
  // Respiratory / Chest (Cancer)
  "Persistent Cough",
  "Blood in Cough",
  "Coughing Up Blood",
  "Shortness of Breath",
  "Hoarseness",
  "Wheezing",
  "Chest Pain",
  "Chest Tightness",
  "Difficulty Breathing",
  "Chronic Cough",
  // Head / Brain Tumor
  "Headache",
  "Seizures",
  "Memory Loss",
  "Difficulty Speaking",
  "Loss of Balance",
  "Personality Changes",
  "Vision Problems",
  "Blurred Vision",
  "Double Vision",
  "Dizziness",
  "Numbness",
  "Tingling",
  "Confusion",
  "Fainting",
  "Tremors",
  "Muscle Weakness",
  "Loss of Smell",
  "Loss of Taste",
  "Ringing in Ears",
  "Slurred Speech",
  "Sudden Mood Swings",
  "Difficulty Walking",
  "Coordination Problems",
  "Increased Intracranial Pressure",
  "Nausea from Headache",
  "Morning Headaches",
  "Hearing Loss",
  "Facial Numbness",
  "Eyelid Drooping",
  // Digestive / Abdominal (Cancer)
  "Nausea",
  "Vomiting",
  "Abdominal Pain",
  "Blood in Stool",
  "Bloating",
  "Change in Bowel Habits",
  "Rectal Bleeding",
  "Constipation",
  "Diarrhea",
  "Jaundice",
  "Dark Urine",
  "Pale Stools",
  "Difficulty Swallowing",
  "Heartburn",
  "Indigestion",
  "Rectal Pain",
  "Mucus in Stool",
  "Stomach Cramps",
  "Anal Bleeding",
  // Skin (Cancer)
  "Changes in Moles",
  "Non-healing Sores",
  "Skin Dimpling",
  "Itchy Skin",
  "Skin Rash",
  "Yellowing Skin",
  "Pale Skin",
  "Unusual Skin Growth",
  "Scaly Patches",
  "Dark Spots on Skin",
  "Bleeding Skin Lesion",
  "Sore That Does Not Heal",
  "Hair Loss",
  "Nail Changes",
  // Breast / Lymph (Cancer)
  "Breast Lump",
  "Nipple Discharge",
  "Skin Dimpling on Breast",
  "Breast Pain",
  "Arm Swelling",
  "Swollen Lymph Nodes",
  "Lump in Neck",
  "Lump in Armpit",
  "Lump in Groin",
  "Nipple Retraction",
  "Breast Redness",
  // Blood / Immune (Cancer)
  "Easy Bruising",
  "Frequent Infections",
  "Nosebleeds",
  "Bone Pain",
  "Back Pain",
  "Neck Pain",
  "Pale Complexion",
  "Unexplained Bruising",
  "Blood Clots",
  "Petechiae",
  // Urinary / Reproductive (Cancer)
  "Blood in Urine",
  "Frequent Urination",
  "Painful Urination",
  "Pelvic Pain",
  "Testicular Lump",
  "Unusual Discharge",
  "Unexplained Bleeding",
  "Post-menopausal Bleeding",
  "Vaginal Bleeding",
  // Other Cancer-specific
  "Weight Loss",
  "Hoarse Voice",
  "Persistent Sore Throat",
  "Mouth Sores",
  "Lip Sores",
  "Tongue Sores",
  "Difficulty Chewing",
  "Jaw Pain",
  "Ear Pain",
  "Shoulder Pain",
  "Hip Pain",
  "Swollen Face",
  "Nasal Congestion",
  "Frequent Headaches",
];

// ── Prediction Logic ─────────────────────────────────────────────────────────
interface Prediction {
  disease: Disease;
  confidence: number;
}

function predictDiseases(selectedSymptoms: string[]): Prediction[] {
  if (selectedSymptoms.length === 0) return [];
  return DISEASES.map((d) => ({
    disease: d,
    confidence: Math.round(
      (d.symptoms.filter((s) => selectedSymptoms.includes(s)).length /
        d.symptoms.length) *
        100,
    ),
  }))
    .filter((p) => p.confidence >= 10)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

function riskClass(risk: RiskLevel) {
  switch (risk) {
    case "Critical":
      return "risk-critical";
    case "High":
      return "risk-high";
    case "Medium":
      return "risk-medium";
    default:
      return "risk-low";
  }
}

// ── Nav Link ─────────────────────────────────────────────────────────────────
function NavLink({
  href,
  children,
}: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors duration-200 relative group"
      data-ocid={"nav.link"}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
    </a>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About AI" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#checker", label: "Symptom Checker" },
    { href: "#safety", label: "Disease Insights" },
    { href: "#technology", label: "Technology" },
    { href: "#contact", label: "Team" },
  ];
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20"
      style={{
        boxShadow:
          "0 1px 0 oklch(0.82 0.18 195 / 0.15), 0 4px 24px oklch(0 0 0 / 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a
          href="#home"
          className="flex items-center gap-2 font-display font-bold text-lg text-primary"
          style={{ textShadow: "0 0 20px oklch(0.82 0.18 195 / 0.5)" }}
        >
          <ShieldPlus
            className="w-6 h-6"
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))",
            }}
          />
          <span className="hidden sm:inline">AI Disease Prediction</span>
          <span className="sm:hidden">HealthAI</span>
        </a>
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <Button
            asChild
            size="sm"
            className="animate-pulse-glow font-display font-semibold"
            data-ocid="nav.primary_button"
          >
            <a href="#checker">Start Assessment</a>
          </Button>
        </div>
        {/* Mobile */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-primary border border-primary/30 hover:border-primary/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 border-t border-primary/20"
          >
            <nav className="flex flex-col px-4 py-3 gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button
                size="sm"
                className="mt-2"
                onClick={() => {
                  setOpen(false);
                  window.location.hash = "checker";
                }}
              >
                Start Assessment
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.08 0.03 220) 0%, oklch(0.12 0.05 210) 50%, oklch(0.09 0.04 270) 100%)",
        minHeight: "88vh",
      }}
    >
      {/* Animated hex grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.82 0.18 195 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 195 / 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Corner glow effects */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.18 195 / 0.12) 0%, transparent 70%)",
          transform: "translateY(-30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 290 / 0.1) 0%, transparent 70%)",
          transform: "translateY(30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label mb-3 block">
            Science Fair Project 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Predicting Disease <br />
            <span
              className="gradient-heading animate-flicker"
              style={{ display: "inline-block" }}
            >
              with the Power of AI
            </span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
            An educational demonstration of how machine learning and decision
            tree algorithms can analyze symptoms to identify potential disease
            patterns. For informational purposes only — not a medical diagnostic
            tool.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="font-display font-semibold animate-pulse-glow"
              data-ocid="hero.primary_button"
            >
              <a href="#checker">
                <Zap className="w-4 h-4 mr-2" />
                Try Symptom Checker
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-display border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60"
              data-ocid="hero.secondary_button"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              "8 Diseases Modeled",
              "100+ Symptom Inputs",
              "Decision Tree AI",
            ].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-xs font-medium text-primary px-3 py-1.5 rounded-full"
                style={{
                  background: "oklch(0.82 0.18 195 / 0.1)",
                  border: "1px solid oklch(0.82 0.18 195 / 0.25)",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center animate-float"
        >
          <div className="relative w-full max-w-sm">
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at center, oklch(0.82 0.18 195 / 0.15) 0%, transparent 70%)",
                filter: "blur(20px)",
                transform: "scale(1.2)",
              }}
            />
            <div
              className="relative rounded-2xl p-6 space-y-4 neon-card"
              style={{ background: "oklch(0.11 0.03 215)" }}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
                <div
                  className="rounded-xl p-2"
                  style={{ background: "oklch(0.82 0.18 195 / 0.15)" }}
                >
                  <Brain
                    className="w-6 h-6 text-primary"
                    style={{
                      filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.8))",
                    }}
                  />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-foreground">
                    AI Analysis Dashboard
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Decision Tree Model
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-primary font-mono">
                    LIVE
                  </span>
                </div>
              </div>
              {[
                {
                  label: "Lung Cancer",
                  pct: 82,
                  risk: "Critical" as RiskLevel,
                },
                { label: "Heart Disease", pct: 67, risk: "High" as RiskLevel },
                { label: "Lymphoma", pct: 44, risk: "High" as RiskLevel },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-foreground/90">
                      {item.label}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${riskClass(item.risk)}`}
                    >
                      {item.pct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.82 0.18 195 / 0.1)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.82 0.18 195), oklch(0.72 0.22 290))",
                        boxShadow: "0 0 8px oklch(0.82 0.18 195 / 0.6)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5 + item.pct / 200,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-primary/10 flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                Educational demo — not a medical diagnosis
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ background: "oklch(0.11 0.025 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">About This Project</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            Understanding AI Disease Prediction
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <Brain
                  className="w-8 h-8 text-primary"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.7))",
                  }}
                />
              ),
              title: "Educational Purpose",
              body: "This science fair project demonstrates how artificial intelligence can be applied to healthcare data. It is strictly educational and should never replace professional medical diagnosis or advice.",
            },
            {
              icon: (
                <GitBranch
                  className="w-8 h-8 text-primary"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.7))",
                  }}
                />
              ),
              title: "Machine Learning Approach",
              body: "The system uses Decision Tree algorithms — a supervised learning method that makes predictions by asking a series of yes/no questions about symptoms to arrive at a probable condition.",
            },
            {
              icon: (
                <Database
                  className="w-8 h-8 text-primary"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.7))",
                  }}
                />
              ),
              title: "Dataset & Training",
              body: "The model was conceptually trained on symptom-disease datasets sourced from medical literature, correlating symptom patterns with diagnoses across 8 major disease categories.",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="h-full rounded-2xl neon-card transition-all duration-300 border-0"
                style={{ background: "oklch(0.13 0.03 215)" }}
              >
                <CardHeader>
                  <div
                    className="rounded-xl w-14 h-14 flex items-center justify-center mb-2"
                    style={{ background: "oklch(0.82 0.18 195 / 0.12)" }}
                  >
                    {card.icon}
                  </div>
                  <CardTitle className="text-lg font-display text-foreground">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div
          className="mt-8 p-4 rounded-xl flex gap-3"
          style={{
            background: "oklch(0.65 0.22 25 / 0.08)",
            border: "1px solid oklch(0.65 0.22 25 / 0.3)",
          }}
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            <strong className="text-destructive">Medical Disclaimer:</strong>{" "}
            This project is created solely for educational purposes as part of a
            school science fair. The predictions generated are based on
            simplified symptom-mapping algorithms and do <em>not</em> constitute
            medical advice, diagnosis, or treatment. Always consult a qualified
            healthcare professional for any health concerns.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Enter Symptoms",
      desc: "Select symptoms you are experiencing from our comprehensive checklist of 100+ common indicators.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Query Dataset",
      desc: "The system cross-references your symptoms against a curated medical dataset of disease patterns.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Model Analyzes",
      desc: "A Decision Tree algorithm calculates match scores between your symptoms and each disease profile.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Disease Prediction",
      desc: "Top matching conditions are ranked by confidence percentage with risk level classifications.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safety Guidance",
      desc: "Receive educational information on diet, treatment options, and evidence-based prevention strategies.",
    },
  ];
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-label mb-2 block">Process Flow</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            How the AI System Works
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
            A transparent look at each stage of the prediction pipeline, from
            symptom input to actionable health guidance.
          </p>
        </div>
        <div className="relative">
          {/* Neon connecting line desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px neon-line" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center mb-4"
                  style={{
                    background: "oklch(0.11 0.03 215)",
                    border: "2px solid oklch(0.82 0.18 195 / 0.4)",
                    boxShadow:
                      "0 0 20px oklch(0.82 0.18 195 / 0.2), inset 0 0 20px oklch(0.82 0.18 195 / 0.05)",
                  }}
                >
                  <div
                    className="text-primary"
                    style={{
                      filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.8))",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-bold font-mono text-primary mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-sm mb-1.5 text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-primary/40 mt-4 lg:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Symptom Checker ───────────────────────────────────────────────────────────
function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState<Prediction[] | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  function toggleSymptom(s: string) {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function analyze() {
    const preds = predictDiseases(selected);
    setResults(preds);
    setAnalyzed(true);
  }

  function reset() {
    setSelected([]);
    setAge("");
    setGender("");
    setResults(null);
    setAnalyzed(false);
  }

  return (
    <section
      id="checker"
      className="py-20"
      style={{ background: "oklch(0.11 0.025 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">Interactive Demo</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            Symptom Checker
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            Select your symptoms below to see the AI prediction results. For
            educational purposes only.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card
            className="rounded-2xl neon-card border-0"
            style={{ background: "oklch(0.13 0.03 215)" }}
            data-ocid="checker.card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                <Stethoscope
                  className="w-5 h-5 text-primary"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.7))",
                  }}
                />
                Select Symptoms
              </CardTitle>
              <p className="text-xs text-primary font-mono">
                {selected.length} symptom(s) selected
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {ALL_SYMPTOMS.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 group">
                    <Checkbox
                      id={`sym-${s}`}
                      checked={selected.includes(s)}
                      onCheckedChange={() => toggleSymptom(s)}
                      className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      style={
                        selected.includes(s)
                          ? { boxShadow: "0 0 8px oklch(0.82 0.18 195 / 0.5)" }
                          : {}
                      }
                      data-ocid={"checker.checkbox"}
                    />
                    <Label
                      htmlFor={`sym-${s}`}
                      className={`text-sm cursor-pointer transition-colors ${selected.includes(s) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    >
                      {s}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-primary/15">
                <div>
                  <Label className="text-xs mb-1.5 block text-muted-foreground">
                    Age Range
                  </Label>
                  <Select onValueChange={setAge} value={age}>
                    <SelectTrigger
                      className="border-primary/25 bg-muted/50 focus:border-primary focus:ring-primary/30"
                      data-ocid="checker.select"
                    >
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/25">
                      {[
                        "Under 18",
                        "18-30",
                        "31-45",
                        "46-60",
                        "61-75",
                        "Over 75",
                      ].map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block text-muted-foreground">
                    Gender
                  </Label>
                  <Select onValueChange={setGender} value={gender}>
                    <SelectTrigger
                      className="border-primary/25 bg-muted/50 focus:border-primary focus:ring-primary/30"
                      data-ocid="checker.select"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/25">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">
                        Other / Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  className="flex-1 font-display font-semibold animate-pulse-glow"
                  onClick={analyze}
                  disabled={selected.length === 0}
                  data-ocid="checker.submit_button"
                >
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Analyze Symptoms
                </Button>
                {analyzed && (
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    data-ocid="checker.secondary_button"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card
            className="rounded-2xl neon-card-purple border-0"
            style={{ background: "oklch(0.13 0.03 215)" }}
            data-ocid="checker.results_panel"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                <Activity
                  className="w-5 h-5 text-secondary"
                  style={{
                    filter: "drop-shadow(0 0 6px oklch(0.72 0.22 290 / 0.7))",
                  }}
                />
                <span style={{ color: "oklch(0.82 0.18 195)" }}>
                  Prediction Results
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!analyzed && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-ocid="checker.empty_state"
                  >
                    <div
                      className="rounded-full p-6 mb-4"
                      style={{
                        background: "oklch(0.82 0.18 195 / 0.1)",
                        boxShadow: "0 0 30px oklch(0.82 0.18 195 / 0.1)",
                      }}
                    >
                      <Brain
                        className="w-10 h-10 text-primary"
                        style={{
                          filter:
                            "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.6))",
                        }}
                      />
                    </div>
                    <p className="font-display font-medium text-foreground">
                      No Analysis Yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select symptoms and click &quot;Analyze Symptoms&quot; to
                      see predictions.
                    </p>
                  </motion.div>
                )}
                {analyzed && results && results.length === 0 && (
                  <motion.div
                    key="noresults"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-ocid="checker.empty_state"
                  >
                    <Info className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="font-display font-medium">
                      No Strong Matches Found
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try selecting more symptoms for better accuracy.
                    </p>
                  </motion.div>
                )}
                {analyzed && results && results.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                    data-ocid="checker.success_state"
                  >
                    <div
                      className="p-3 rounded-lg flex gap-2 text-xs"
                      style={{
                        background: "oklch(0.65 0.22 25 / 0.08)",
                        border: "1px solid oklch(0.65 0.22 25 / 0.3)",
                      }}
                    >
                      <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-foreground/80">
                        These results are for{" "}
                        <strong className="text-destructive">
                          educational purposes only
                        </strong>
                        . Please consult a doctor for actual diagnosis.
                      </span>
                    </div>
                    {results.map((pred, idx) => (
                      <PredictionCard
                        key={pred.disease.name}
                        pred={pred}
                        rank={idx + 1}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PredictionCard({ pred, rank }: { pred: Prediction; rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.11 0.03 218)",
        border: "1px solid oklch(0.82 0.18 195 / 0.2)",
      }}
      data-ocid={`checker.item.${rank}`}
    >
      <div
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{ background: "oklch(0.15 0.04 215)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono text-primary">
            #{rank}
          </span>
          <span className="font-display font-semibold text-sm text-foreground">
            {pred.disease.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${riskClass(pred.disease.risk)}`}
          >
            {pred.disease.risk} Risk
          </span>
          <Badge
            className="text-xs font-mono"
            style={{
              background: "oklch(0.82 0.18 195 / 0.15)",
              color: "oklch(0.82 0.18 195)",
              border: "1px solid oklch(0.82 0.18 195 / 0.35)",
              boxShadow: "0 0 8px oklch(0.82 0.18 195 / 0.2)",
            }}
          >
            {pred.confidence}% match
          </Badge>
        </div>
      </div>
      <div className="px-4 py-1">
        <div
          className="h-1.5 my-2 rounded-full overflow-hidden"
          style={{ background: "oklch(0.82 0.18 195 / 0.1)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${pred.confidence}%`,
              background:
                "linear-gradient(90deg, oklch(0.82 0.18 195), oklch(0.72 0.22 290))",
              boxShadow: "0 0 8px oklch(0.82 0.18 195 / 0.5)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pred.confidence}%` }}
            transition={{ duration: 0.8, delay: rank * 0.15 }}
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <Tabs defaultValue="overview">
          <TabsList
            className="h-8 text-xs w-full"
            style={{ background: "oklch(0.11 0.03 218)" }}
          >
            <TabsTrigger
              value="overview"
              className="flex-1 text-xs data-[state=active]:text-primary"
              data-ocid={"checker.tab"}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="diet"
              className="flex-1 text-xs data-[state=active]:text-primary"
              data-ocid={"checker.tab"}
            >
              Diet
            </TabsTrigger>
            <TabsTrigger
              value="medicines"
              className="flex-1 text-xs data-[state=active]:text-primary"
              data-ocid={"checker.tab"}
            >
              Medicines
            </TabsTrigger>
            <TabsTrigger
              value="prevention"
              className="flex-1 text-xs data-[state=active]:text-primary"
              data-ocid={"checker.tab"}
            >
              Prevention
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {pred.disease.overview}
            </p>
          </TabsContent>
          <TabsContent value="diet" className="mt-3">
            <ul className="space-y-1">
              {pred.disease.diet.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs">
                  <Leaf
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{
                      color: "oklch(0.75 0.18 155)",
                      filter: "drop-shadow(0 0 4px oklch(0.75 0.18 155 / 0.5))",
                    }}
                  />
                  <span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="medicines" className="mt-3">
            <ul className="space-y-1">
              {pred.disease.medicines.map((m) => (
                <li key={m} className="flex items-start gap-2 text-xs">
                  <Pill
                    className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                    style={{
                      filter: "drop-shadow(0 0 4px oklch(0.82 0.18 195 / 0.5))",
                    }}
                  />
                  <span className="text-muted-foreground">{m}</span>
                </li>
              ))}
            </ul>
            <p
              className="mt-2 text-[11px] font-mono"
              style={{ color: "oklch(0.82 0.16 25)" }}
            >
              ⚠ Never self-medicate. All treatments must be prescribed by a
              licensed physician.
            </p>
          </TabsContent>
          <TabsContent value="prevention" className="mt-3">
            <ul className="space-y-1">
              {pred.disease.prevention.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs">
                  <ShieldCheck
                    className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                    style={{
                      filter: "drop-shadow(0 0 4px oklch(0.82 0.18 195 / 0.5))",
                    }}
                  />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

// ── Safety Measures ───────────────────────────────────────────────────────────
function SafetyMeasures() {
  const cards = [
    {
      icon: (
        <Microscope
          className="w-8 h-8 text-primary"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))" }}
        />
      ),
      title: "Cancer Awareness",
      subtitle: "Early Detection Saves Lives",
      accent: "primary" as const,
      tips: [
        "Schedule annual cancer screenings appropriate for your age and gender",
        "Perform monthly self-examinations for breast and skin changes",
        "Get colonoscopy screening starting at age 45",
        "Mammogram every 1-2 years for women over 40",
        "Annual low-dose CT scan for heavy smokers aged 50-80",
        "Know your family history — some cancers are hereditary",
        "Maintain healthy weight — obesity increases cancer risk",
        "Limit alcohol and avoid tobacco in all forms",
      ],
    },
    {
      icon: (
        <HeartPulse
          className="w-8 h-8"
          style={{
            color: "oklch(0.72 0.22 290)",
            filter: "drop-shadow(0 0 8px oklch(0.72 0.22 290 / 0.7))",
          }}
        />
      ),
      title: "Heart Health",
      subtitle: "Protect Your Most Vital Organ",
      accent: "secondary" as const,
      tips: [
        "Monitor blood pressure regularly — aim for <130/80 mmHg",
        "Keep LDL cholesterol below 100 mg/dL",
        "Exercise at least 150 minutes of moderate activity per week",
        "Follow a heart-healthy diet (Mediterranean or DASH)",
        "Maintain healthy weight and BMI",
        "Quit smoking — risk drops significantly within 1 year",
        "Manage stress through meditation, yoga, or therapy",
        "Get annual heart checkups after age 40",
      ],
    },
  ];
  return (
    <section id="safety" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">Prevention First</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            Disease Safety &amp; Prevention
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            Evidence-based prevention strategies for the most common
            life-threatening diseases.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`h-full rounded-2xl transition-all duration-300 border-0 ${
                  c.accent === "primary" ? "neon-card" : "neon-card-purple"
                }`}
                style={{ background: "oklch(0.13 0.03 215)" }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background:
                          c.accent === "primary"
                            ? "oklch(0.82 0.18 195 / 0.12)"
                            : "oklch(0.72 0.22 290 / 0.12)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <CardTitle className="font-display text-foreground">
                        {c.title}
                      </CardTitle>
                      <p
                        className="text-xs mt-0.5 font-mono"
                        style={{
                          color:
                            c.accent === "primary"
                              ? "oklch(0.82 0.18 195 / 0.7)"
                              : "oklch(0.72 0.22 290 / 0.8)",
                        }}
                      >
                        {c.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {c.tips.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm">
                        <ShieldCheck
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{
                            color:
                              c.accent === "primary"
                                ? "oklch(0.82 0.18 195)"
                                : "oklch(0.72 0.22 290)",
                            filter:
                              c.accent === "primary"
                                ? "drop-shadow(0 0 4px oklch(0.82 0.18 195 / 0.4))"
                                : "drop-shadow(0 0 4px oklch(0.72 0.22 290 / 0.4))",
                          }}
                        />
                        <span className="text-muted-foreground">{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AI Technology ─────────────────────────────────────────────────────────────
function AiTechnology() {
  const techs = [
    {
      icon: (
        <FlaskConical
          className="w-8 h-8 text-primary"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))" }}
        />
      ),
      title: "Python & Machine Learning",
      body: "Python is the primary language for this AI model, leveraging libraries like scikit-learn and pandas. Machine learning enables the system to find patterns in medical data that would be impossible to program manually.",
    },
    {
      icon: (
        <GitBranch
          className="w-8 h-8 text-primary"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))" }}
        />
      ),
      title: "Decision Tree Algorithm",
      body: "A Decision Tree is a flowchart-like structure where each node represents a symptom question, branches represent yes/no answers, and leaf nodes represent disease predictions. It's interpretable and clinically relevant.",
    },
    {
      icon: (
        <Database
          className="w-8 h-8 text-primary"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.7))" }}
        />
      ),
      title: "Dataset Training",
      body: "The model is trained on symptom-disease datasets from medical literature. Each disease has a symptom profile. During prediction, Bayesian-inspired scoring computes the probability of each disease given the observed symptoms.",
    },
  ];
  return (
    <section
      id="technology"
      className="py-20"
      style={{ background: "oklch(0.11 0.025 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">Under the Hood</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            Understanding the AI Technology
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            The tools and algorithms powering this educational demonstration of
            disease prediction.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {techs.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card
                className="h-full rounded-2xl neon-card border-0 text-center transition-all duration-300"
                style={{ background: "oklch(0.13 0.03 215)" }}
              >
                <CardHeader>
                  <div
                    className="mx-auto rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-2"
                    style={{ background: "oklch(0.82 0.18 195 / 0.12)" }}
                  >
                    {t.icon}
                  </div>
                  <CardTitle className="text-lg font-display text-foreground">
                    {t.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">The Team</span>
          <h2 className="font-display text-3xl font-bold gradient-heading">
            Contact &amp; Credits
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="rounded-2xl neon-card border-0"
            style={{ background: "oklch(0.13 0.03 215)" }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">
                Project Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {[
                ["Student Name", "M. Deekhith Kumar"],
                ["School", "[Your School Name]"],
                ["Grade / Class", "10E"],
                ["Science Fair Year", "2026"],
                ["Project Category", "AI with Biology"],
                ["Mentor / Teacher", "[Teacher Name]"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <span className="font-semibold text-primary font-mono text-xs uppercase tracking-wider whitespace-nowrap">
                    {label}:
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card
            className="rounded-2xl neon-card-purple border-0"
            style={{ background: "oklch(0.13 0.03 215)" }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">
                Project References &amp; Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {[
                "World Health Organization (WHO) — Disease Statistics",
                "National Cancer Institute — Cancer Symptom Data",
                "American Heart Association — Cardiovascular Risk Factors",
                "scikit-learn Python Library — ML Algorithms",
                "PubMed Medical Literature Database",
              ].map((ref) => (
                <p key={ref} className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{
                      color: "oklch(0.72 0.22 290)",
                      filter: "drop-shadow(0 0 4px oklch(0.72 0.22 290 / 0.4))",
                    }}
                  />
                  {ref}
                </p>
              ))}
              <div
                className="mt-4 p-3 rounded-xl text-xs"
                style={{
                  background: "oklch(0.82 0.18 195 / 0.08)",
                  border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                }}
              >
                <strong className="text-primary">Note:</strong> This project is
                created for educational purposes only and demonstrates the
                potential of AI in healthcare. It does not replace professional
                medical advice.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t py-10"
      style={{
        background: "oklch(0.08 0.025 220)",
        borderColor: "oklch(0.82 0.18 195 / 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="flex items-center gap-2 font-display font-bold text-primary mb-1"
            style={{ textShadow: "0 0 15px oklch(0.82 0.18 195 / 0.4)" }}
          >
            <ShieldPlus
              className="w-5 h-5"
              style={{
                filter: "drop-shadow(0 0 6px oklch(0.82 0.18 195 / 0.7))",
              }}
            />
            AI Disease Prediction System
          </div>
          <p className="text-xs text-muted-foreground max-w-xs">
            A science fair educational project demonstrating machine learning in
            healthcare. Not a medical device.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {[
            ["#about", "About"],
            ["#how-it-works", "How It Works"],
            ["#checker", "Symptom Checker"],
            ["#safety", "Disease Insights"],
            ["#contact", "Disclaimer"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="hover:text-primary transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center md:text-right">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <HowItWorks />
        <SymptomChecker />
        <SafetyMeasures />
        <AiTechnology />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
