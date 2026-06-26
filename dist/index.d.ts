export interface WatermarkOptions {
    /** false면 동적 감지를 끄고 detectConfig 고정값만 사용. 기본 true */
    dynamic?: boolean;
    /** 동적 감지 수용 임계값(Pearson 상관). 기본 0.8 */
    minCorrelation?: number;
    /** 우하단 코너에서 탐색 최소 마진(px). 기본 8 */
    searchMinMargin?: number;
    /** 우하단 코너에서 탐색 최대 마진(px). 기본 160 */
    searchMaxMargin?: number;
}
export interface WatermarkLocation {
    x: number;
    y: number;
    logoSize: 48 | 96;
    alphaScale: number;
    correlation: number;
    method: "detected" | "fallback";
}
export declare function calculateAlphaMap(data: Buffer | Uint8ClampedArray, width: number, height: number): Float32Array;
/**
 * 우하단 코너 영역에서 워터마크 위치를 상호상관으로 탐색.
 * 반환: 최고 상관 위치(top-left)와 상관계수.
 */
export declare function detectWatermark(data: Uint8ClampedArray, width: number, height: number, alphaMap: Float32Array, logoSize: number, searchMinMargin?: number, searchMaxMargin?: number): {
    x: number;
    y: number;
    correlation: number;
};
/**
 * 흰색 워터마크 가정에서 위치 (x,y)의 실제 불투명도 스케일을 최소제곱으로 추정.
 * 합성식: watermarked = a*255 + (1-a)*orig,  a = scale * templateAlpha
 * => (w - bg) = scale * templateAlpha * (255 - bg)  (orig≈로컬 배경)
 * 채널 3개에 걸친 회귀로 scale을 구하고 [0.2,1.5]로 클램프한다.
 */
export declare function estimateAlphaScale(data: Uint8ClampedArray, imageWidth: number, x: number, y: number, alphaMap: Float32Array, logoSize: number): number;
export declare function detectConfig(width: number, height: number): {
    logoSize: 48 | 96;
    marginRight: number;
    marginBottom: number;
    alphaScale: number;
};
/**
 * PNG 이미지에서 Gemini SynthID 워터마크를 제거(in-place).
 *
 * 기본은 동적 감지: 우하단 코너에서 스파클 템플릿과의 상호상관으로 위치를 찾고,
 * 그 위치의 불투명도를 최소제곱으로 추정한다. 상관계수가 minCorrelation 미만이면
 * detectConfig의 고정값으로 폴백한다. dynamic:false로 끄면 고정값만 사용.
 */
export declare function removeGeminiWatermark(filePath: string, options?: WatermarkOptions): Promise<boolean>;
export default removeGeminiWatermark;
