import { useQuery, useMutation } from "@tanstack/react-query";
import {
    getAllProperties,
    getProperty,
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

export function useProperty(id: string) {
    return useQuery({
        queryKey: ["property", id],
        queryFn: () => getProperty(id),
    });
}
