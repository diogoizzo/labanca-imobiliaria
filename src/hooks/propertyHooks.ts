import { useQuery, useMutation } from "@tanstack/react-query";
import {
    getAllProperties,
    createProperty,
    updateProperty,
} from "@/services/propertyService";

export function useProperties() {
    return useQuery({
        queryKey: ["properties"],
        queryFn: getAllProperties,
    });
}

export function useCreateProperty() {
    return useMutation({
        mutationFn: createProperty,
    });
}

export function useUpdateProperty() {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: FormData }) =>
            updateProperty(id, data),
    });
}
