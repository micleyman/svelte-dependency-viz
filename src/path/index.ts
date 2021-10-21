import type { PathCoordinate, PathDirection } from './types';
import { directionMap } from './draw';

export const computeCurve = (
  start: PathCoordinate,
  end: PathCoordinate,
  direction: PathDirection
): string => directionMap[direction](start, end);

const determinePathDirection = (from: HTMLElement, to: HTMLElement): PathDirection => {
  const sourceNodeOffsetRight = from.offsetLeft + from.offsetWidth;
  const sourceNodeOffsetLeft = from.offsetLeft;

  const targetNodeOffsetRight = to.offsetLeft + to.offsetWidth;
  const targetNodeOffsetLeft = to.offsetLeft;
  const targetNodeOffsetCenter = to.offsetLeft + to.offsetWidth / 2;

  // Gets the margin as `${n}px`, and retains the int value n divided by 2
  const margin = parseInt(window.getComputedStyle(from).margin, 10) / 2;

  if (targetNodeOffsetRight <= sourceNodeOffsetLeft) return 'left';
  if (targetNodeOffsetCenter + margin <= sourceNodeOffsetLeft) return 'center-left';
  if (targetNodeOffsetLeft >= sourceNodeOffsetRight) return 'right';
  if (targetNodeOffsetCenter - margin >= sourceNodeOffsetRight) return 'center-right';
  return 'center';
};

export const computePathPosition = (from: HTMLElement, to: HTMLElement) => {
  const direction = determinePathDirection(from, to);
  console.log(direction);
};
