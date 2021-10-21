import type { PathCoordinate, PathDirection, PathProperties } from './types';
import { computeCurve } from './draw';

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

const getPathPointFromTop = (el: HTMLElement): PathCoordinate => {
  const x = Math.floor(el.offsetLeft + el.offsetWidth / 2);
  const y = Math.floor(el.offsetTop);

  return { x, y };
};

const getPathEndCoordinate = (el: HTMLElement): PathCoordinate => getPathPointFromTop(el);

const getPathPointFromBottom = (el: HTMLElement): PathCoordinate => {
  const x = Math.floor(el.offsetLeft + el.offsetWidth / 2);
  const y = Math.ceil(el.offsetTop + el.offsetHeight);

  return { x, y };
};

const getPathPointFromLeft = (el: HTMLElement): PathCoordinate => {
  const x = Math.floor(el.offsetLeft);
  const y = Math.floor(el.offsetTop + el.offsetHeight / 2);

  return { x, y };
};

const getPathPointFromRight = (el: HTMLElement): PathCoordinate => {
  const x = Math.floor(el.offsetLeft + el.offsetWidth);
  const y = Math.floor(el.offsetTop + el.offsetHeight / 2);

  return { x, y };
};

// calculate the start position of the path
const getPathStartCoordinate = (el: HTMLElement, direction: PathDirection): PathCoordinate => {
  switch (direction) {
    case 'left':
    case 'center-left':
      return getPathPointFromLeft(el);
    case 'right':
    case 'center-right':
      return getPathPointFromRight(el);
    case 'center':
    default:
      return getPathPointFromBottom(el);
  }
};

type GetPath = (
  isLtr: boolean,
  radius: number,
  margin: number,
  width: number,
  strokeWidth: number,
  height?: number
) => PathCoordinate;
const getPathStart: GetPath = (isLtr, radius, margin, width, strokeWidth) => ({
  x: isLtr ? radius + strokeWidth + margin : width - radius - strokeWidth - margin,
  y: radius + strokeWidth + margin
});

const getPathEnd: GetPath = (isLtr, radius, margin, width, strokeWidth, height) => ({
  x: isLtr ? width - radius - strokeWidth - margin : radius + strokeWidth + margin,
  y: height - radius - strokeWidth - margin
});

export const computePathProperties = (from: HTMLElement, to: HTMLElement): PathProperties => {
  const direction = determinePathDirection(from, to);
  const startCoordinate = getPathStartCoordinate(from, direction);
  const endCoordinate = getPathEndCoordinate(to);
  const radius = 4;
  const strokeWidth = 3;
  const margin = parseInt(window.getComputedStyle(from).margin, 10) / 2;

  const width =
    Math.abs(endCoordinate.x - startCoordinate.x) + 2 * radius + 2 * strokeWidth + margin * 2;
  const height =
    Math.abs(endCoordinate.y - startCoordinate.y) + 2 * radius + 2 * strokeWidth + margin * 2;

  const isLeftToRight = startCoordinate.x <= endCoordinate.x;

  const pathStart = getPathStart(isLeftToRight, radius, margin, width, strokeWidth);
  const pathEnd = getPathEnd(isLeftToRight, radius, margin, width, strokeWidth, height);
  return {
    width,
    height,
    pathEndRadius: radius,
    direction,
    pathStart,
    pathEnd,
    translateX:
      (isLeftToRight ? startCoordinate.x : endCoordinate.x) - radius - strokeWidth - margin,
    translateY: startCoordinate.y - radius - strokeWidth - margin,
    curve: computeCurve(pathStart, pathEnd, direction)
  };
};
