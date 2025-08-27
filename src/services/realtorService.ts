import RealtorFormData from "@/interfaces/RealtorFormData";

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

export const changePassword = async (
    id: string,
    oldPassword: string,
    newPassword: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`/api/realtors/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to change password",
        };
    }
};
