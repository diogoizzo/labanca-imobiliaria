import { useMutation } from "@tanstack/react-query";
import { createProperty, updateProperty } from "@/services/propertyService";

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
