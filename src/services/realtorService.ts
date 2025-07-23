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
