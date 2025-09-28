/**
 * Utilitários para normalização de texto
 */

/**
 * Normaliza uma string removendo acentos e convertendo para maiúsculo
 * @param text - Texto a ser normalizado
 * @returns Texto normalizado
 */
export function normalizeText(text: string): string {
    if (!text) return text;

    return text
        .toUpperCase() // Converte para maiúsculo
        .normalize("NFD") // Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
        .trim(); // Remove espaços extras
}

/**
 * Compara duas strings usando normalização
 * @param a - Primeira string
 * @param b - Segunda string
 * @returns true se forem equivalentes após normalização
 */
export function compareNormalized(a: string, b: string): boolean {
    return normalizeText(a) === normalizeText(b);
}
