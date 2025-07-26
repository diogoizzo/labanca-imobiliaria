import { RealtorFormData } from "@/components/form/RealtorForm";

export const createRealtor = async (
    realtorData: RealtorFormData
): Promise<any> => {
    const response = await fetch("/api/realtors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(realtorData),
    });

    if (!response.ok) {
        throw new Error("Failed to create realtor");
    }

    return response.json();
};

export const getRealtor = async (id: string): Promise<any> => {
    const response = await fetch(`/api/realtors/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch realtor");
    }

    return response.json();
};

export const updateRealtor = async (
    id: string,
    realtorData: RealtorFormData
): Promise<any> => {
    const response = await fetch(`/api/realtors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(realtorData),
    });

    if (!response.ok) {
        throw new Error("Failed to update realtor");
    }

    return response.json();
};
