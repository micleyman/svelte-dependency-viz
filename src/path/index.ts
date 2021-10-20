import type { PathCoordinate, PathDirection } from './types';
import { directionMap } from './draw';

export const computeCurve = (
  start: PathCoordinate,
  end: PathCoordinate,
  direction: PathDirection
): string => directionMap[direction](start, end);
