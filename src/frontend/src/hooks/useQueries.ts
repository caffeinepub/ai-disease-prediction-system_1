import { useMutation, useQuery } from "@tanstack/react-query";
import type { DiseaseInfo, PredictionResult } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllSymptoms() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["symptoms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSymptoms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllDiseases() {
  const { actor, isFetching } = useActor();
  return useQuery<DiseaseInfo[]>({
    queryKey: ["diseases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDiseases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDiseaseInfo(diseaseName: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<DiseaseInfo | null>({
    queryKey: ["disease", diseaseName],
    queryFn: async () => {
      if (!actor || !diseaseName) return null;
      return actor.getDiseaseInfo(diseaseName);
    },
    enabled: !!actor && !isFetching && !!diseaseName,
  });
}

export function usePredictDiseases() {
  const { actor } = useActor();
  return useMutation<PredictionResult[], Error, string[]>({
    mutationFn: async (symptoms: string[]) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.predictDiseases(symptoms);
    },
  });
}

export function useInitialize() {
  const { actor, isFetching } = useActor();
  return useQuery<void>({
    queryKey: ["initialize"],
    queryFn: async () => {
      if (!actor) return;
      await actor.initialize();
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
