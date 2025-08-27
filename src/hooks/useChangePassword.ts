import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "@/services/realtorService";

interface ChangePasswordData {
    id: string;
    oldPassword: string;
    newPassword: string;
}
interface ChangePasswordResponse {
    success: boolean;
    message: string;
}

export function useChangePassword() {
    const queryClient = useQueryClient(); // <- topo do hook

    return useMutation<ChangePasswordResponse, Error, ChangePasswordData>({
        mutationFn: async ({ id, oldPassword, newPassword }) => {
            const response = await changePassword(id, oldPassword, newPassword);
            if (!response.success) throw new Error(response.message);
            return response;
        },
        onSuccess: () => {
            // agora só usamos o objeto já criado
            queryClient.invalidateQueries({ queryKey: ["realtor"] });
            queryClient.invalidateQueries({ queryKey: ["realtors"] });
        },
    });
}
