export declare function calculateAlphaMap(data: Buffer | Uint8ClampedArray, width: number, height: number): Float32Array;
export declare function detectConfig(width: number, height: number): {
    logoSize: 48 | 96;
    marginRight: 32 | 64;
    marginBottom: 32 | 64;
};
export declare function removeGeminiWatermark(filePath: string): Promise<boolean>;
export default removeGeminiWatermark;
