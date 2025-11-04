declare module '@teachablemachine/image' {
  export interface Prediction {
    className: string
    probability: number
  }

  export class CustomMobileNet {
    predict(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<Prediction[]>
    getTotalClasses(): number
  }

  export function load(modelURL: string, metadataURL: string): Promise<CustomMobileNet>
}
declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}
