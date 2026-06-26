export declare function calculateAlphaMap(data: Buffer | Uint8ClampedArray, width: number, height: number): Float32Array;
export declare function detectConfig(width: number, height: number): {
    logoSize: 48 | 96;
    marginRight: number;
    marginBottom: number;
    alphaScale: number;
};
export declare function removeGeminiWatermark(filePath: string): Promise<boolean>;
export default removeGeminiWatermark;
