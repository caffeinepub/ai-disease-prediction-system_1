import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DiseaseInfo {
    dietRecommendations: Array<string>;
    mortalityRisk: string;
    name: string;
    description: string;
    symptoms: Array<string>;
    medicineRecommendations: Array<string>;
    preventionTips: Array<string>;
}
export interface PredictionResult {
    matchingSymptoms: Array<string>;
    disease: string;
    confidence: bigint;
}
export interface backendInterface {
    addDisease(disease: DiseaseInfo): Promise<void>;
    getAllDiseases(): Promise<Array<DiseaseInfo>>;
    getAllSymptoms(): Promise<Array<string>>;
    getDiseaseInfo(diseaseName: string): Promise<DiseaseInfo>;
    initialize(): Promise<void>;
    predictDiseases(symptoms: Array<string>): Promise<Array<PredictionResult>>;
}
