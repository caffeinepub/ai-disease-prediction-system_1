import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  type DiseaseInfo = {
    name : Text;
    description : Text;
    symptoms : [Text];
    dietRecommendations : [Text];
    medicineRecommendations : [Text];
    preventionTips : [Text];
    mortalityRisk : Text;
  };

  type PredictionResult = {
    disease : Text;
    confidence : Nat;
    matchingSymptoms : [Text];
  };

  let diseases = Map.empty<Text, DiseaseInfo>();

  let initialDiseases : [(Text, DiseaseInfo)] = [
    (
      "Lung Cancer",
      {
        name = "Lung Cancer";
        description = "A type of cancer that begins in the lungs, often caused by smoking or exposure to certain toxins.";
        symptoms = [
          "Persistent cough",
          "Chest pain",
          "Shortness of breath",
          "Coughing up blood",
          "Fatigue",
          "Unexplained weight loss",
        ];
        dietRecommendations = [
          "Leafy greens",
          "Whole grains",
          "Lean proteins",
          "Cruciferous vegetables",
          "Colorful fruits",
        ];
        medicineRecommendations = [
          "Chemotherapy drugs (education only)",
          "Targeted therapy (education only)",
          "Immunotherapy agents (education only)",
        ];
        preventionTips = [
          "Avoid smoking",
          "Limit exposure to carcinogens",
          "Maintain a healthy diet",
          "Regular exercise",
        ];
        mortalityRisk = "High";
      },
    ),
    (
      "Colon Cancer",
      {
        name = "Colon Cancer";
        description = "Cancer that starts in the colon or rectum, often detected through screening tests like colonoscopies.";
        symptoms = [
          "Changes in bowel habits",
          "Blood in stool",
          "Abdominal discomfort",
          "Unexplained weight loss",
          "Fatigue",
        ];
        dietRecommendations = [
          "High-fiber foods",
          "Whole grains",
          "Fruits and vegetables",
          "Lean proteins",
        ];
        medicineRecommendations = [
          "Chemotherapy drugs (education only)",
          "Biologic therapy (education only)",
        ];
        preventionTips = [
          "Regular screenings",
          "Maintain a healthy weight",
          "Limit red meat consumption",
          "Avoid smoking and excessive alcohol",
        ];
        mortalityRisk = "High";
      },
    ),
    (
      "Breast Cancer",
      {
        name = "Breast Cancer";
        description = "Cancer that forms in the cells of the breasts, with early detection improving prognosis.";
        symptoms = [
          "Lump in breast",
          "Changes in breast shape",
          "Nipple discharge",
          "Swelling or redness",
        ];
        dietRecommendations = [
          "Fruits and vegetables",
          "Lean proteins",
          "Whole grains",
          "Healthy fats",
        ];
        medicineRecommendations = [
          "Hormonal therapy (education only)",
          "Chemotherapy drugs (education only)",
          "Targeted therapy (education only)",
        ];
        preventionTips = [
          "Regular self-exams",
          "Mammogram screenings",
          "Healthy lifestyle choices",
        ];
        mortalityRisk = "High";
      },
    ),
    (
      "Leukemia",
      {
        name = "Leukemia";
        description = "Cancer of the blood-forming tissues, including the bone marrow and lymphatic system.";
        symptoms = [
          "Frequent infections",
          "Fatigue",
          "Easy bleeding/bruising",
          "Fever or chills",
          "Unexplained weight loss",
        ];
        dietRecommendations = [
          "Nutrient-rich foods",
          "Lean proteins",
          "Fruits and vegetables",
          "Whole grains",
        ];
        medicineRecommendations = [
          "Chemotherapy drugs (education only)",
          "Targeted therapy (education only)",
          "Immunotherapy agents (education only)",
        ];
        preventionTips = [
          "Avoid tobacco",
          "Healthy lifestyle choices",
        ];
        mortalityRisk = "Medium";
      },
    ),
    (
      "Heart Disease",
      {
        name = "Heart Disease";
        description = "A group of conditions affecting the heart and blood vessels, leading cause of death worldwide.";
        symptoms = [
          "Chest pain",
          "Shortness of breath",
          "Fatigue",
          "Irregular heartbeat",
          "Swelling in legs",
        ];
        dietRecommendations = [
          "Low-sodium foods",
          "Lean proteins",
          "Fruits and vegetables",
          "Whole grains",
          "Healthy fats",
        ];
        medicineRecommendations = [
          "Statins (education only)",
          "Beta blockers (education only)",
          "ACE inhibitors (education only)",
        ];
        preventionTips = [
          "Exercise regularly",
          "Maintain healthy weight",
          "Avoid smoking",
          "Limit saturated fats",
        ];
        mortalityRisk = "High";
      },
    ),
    (
      "Diabetes",
      {
        name = "Diabetes";
        description = "Chronic condition affecting how the body processes blood sugar (glucose).";
        symptoms = [
          "Frequent urination",
          "Increased thirst",
          "Unexplained weight loss",
          "Fatigue",
          "Blurred vision",
        ];
        dietRecommendations = [
          "Low sugar foods",
          "Whole grains",
          "Lean proteins",
          "Fruits and vegetables",
        ];
        medicineRecommendations = [
          "Insulin (education only)",
          "Oral hypoglycemics (education only)",
        ];
        preventionTips = [
          "Maintain healthy weight",
          "Regular exercise",
          "Healthy diet",
        ];
        mortalityRisk = "Medium";
      },
    ),
    (
      "Dengue Fever",
      {
        name = "Dengue Fever";
        description = "Mosquito-borne viral infection causing flu-like symptoms, can lead to severe complications.";
        symptoms = [
          "High fever",
          "Severe headache",
          "Joint and muscle pain",
          "Skin rash",
          "Nausea and vomiting",
        ];
        dietRecommendations = [
          "Hydration",
          "Fruits and vegetables",
          "Nutrient-rich foods",
        ];
        medicineRecommendations = [
          "Paracetamol (education only)",
          "IV fluids (education only)",
        ];
        preventionTips = [
          "Mosquito control",
          "Protective clothing",
          "Insect repellents",
        ];
        mortalityRisk = "Medium";
      },
    ),
  ];

  public shared ({ caller }) func initialize() : async () {
    if (diseases.isEmpty()) {
      for ((name, diseaseInfo) in initialDiseases.values()) {
        diseases.add(name, diseaseInfo);
      };
    };
  };

  public query ({ caller }) func predictDiseases(symptoms : [Text]) : async [PredictionResult] {
    if (diseases.isEmpty()) { Runtime.trap("System not initialized. Call initialize() first.") };
    if (symptoms.size() == 0) { Runtime.trap("No symptoms provided.") };

    let results = List.empty<PredictionResult>();

    for ((name, disease) in diseases.entries()) {
      let matchingSymptoms = List.empty<Text>();
      for (symptom in symptoms.values()) {
        if (disease.symptoms.any(func(s) { s == symptom })) {
          matchingSymptoms.add(symptom);
        };
      };

      let matchCount = matchingSymptoms.size();
      let totalSymptoms = disease.symptoms.size();
      let confidence = if (totalSymptoms > 0) {
        (matchCount * 100) / totalSymptoms;
      } else { 0 };

      let result : PredictionResult = {
        disease = name;
        confidence;
        matchingSymptoms = matchingSymptoms.toArray();
      };
      results.add(result);
    };

    results.toArray().filter(func(r) { r.confidence > 5 });
  };

  public query ({ caller }) func getDiseaseInfo(diseaseName : Text) : async DiseaseInfo {
    switch (diseases.get(diseaseName)) {
      case (null) { Runtime.trap("Disease not found") };
      case (?disease) { disease };
    };
  };

  public query ({ caller }) func getAllSymptoms() : async [Text] {
    let symptomSet = Map.empty<Text, ()>();

    for ((_, disease) in diseases.entries()) {
      for (symptom in disease.symptoms.values()) {
        if (not symptomSet.containsKey(symptom)) {
          symptomSet.add(symptom, ());
        };
      };
    };

    symptomSet.keys().toArray();
  };

  public query ({ caller }) func getAllDiseases() : async [DiseaseInfo] {
    diseases.values().toArray();
  };

  public shared ({ caller }) func addDisease(disease : DiseaseInfo) : async () {
    if (diseases.containsKey(disease.name)) {
      Runtime.trap("Disease already exists!");
    };
    diseases.add(disease.name, disease);
  };
};
