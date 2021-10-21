export type PathCoordinate = {
  x: number;
  y: number;
};

export type PathDirection = 'left' | 'center-left' | 'center' | 'center-right' | 'right';

export interface PathProperties {
  width: number;
  height: number;
  pathEndRadius: number;
  direction: PathDirection;
  pathStart: PathCoordinate;
  pathEnd: PathCoordinate;
  translateX: number;
  translateY: number;
  curve: string;
}
