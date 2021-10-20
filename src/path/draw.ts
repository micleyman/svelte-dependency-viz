import type { PathCoordinate } from './types';

const drawTopDown = (start: PathCoordinate, end: PathCoordinate) => {
  const halfDeltaY = (end.y - start.y) / 2;
  const dx1 = start.x;
  const dy1 = start.y + halfDeltaY;
  const dx2 = end.x;
  const dy2 = end.y - halfDeltaY;

  return `M ${start.x}, ${start.y} C ${dx1}, ${dy1} ${dx2}, ${dy2} ${end.x}, ${end.y}`;
};

const drawLeft = (start: PathCoordinate, end: PathCoordinate) => {
  const deltaX = start.x - end.x;
  const deltaY = end.y - start.y;
  const dx1 = start.x - deltaX * 0.5;
  const dy1 = start.y;
  const dx2 = end.x;
  const dy2 = end.y - deltaY * 0.5;

  return `M ${start.x}, ${start.y} C ${dx1}, ${dy1} ${dx2}, ${dy2} ${end.x}, ${end.y}`;
};

const drawRight = (start: PathCoordinate, end: PathCoordinate) => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const dx1 = start.x + deltaX * 0.5;
  const dy1 = start.y;
  const dx2 = end.x;
  const dy2 = end.y - deltaY * 0.5;

  return `M ${start.x}, ${start.y} C ${dx1}, ${dy1} ${dx2}, ${dy2} ${end.x}, ${end.y}`;
};

const drawCenterRight = (start: PathCoordinate, end: PathCoordinate) => {
  const deltaX = Math.abs(start.x - end.x);
  const halfDeltaY = (end.y - start.y) / 2;
  const dx1 = start.x + deltaX * 0.5;
  const dy1 = start.y;
  const dx2 = end.x;
  const dy2 = end.y - halfDeltaY;

  return `M ${start.x}, ${start.y} C ${dx1}, ${dy1} ${dx2}, ${dy2} ${end.x}, ${end.y}`;
};

const drawCenterLeft = (start: PathCoordinate, end: PathCoordinate) => {
  const deltaX = Math.abs(start.x - end.x);
  const halfDeltaY = (end.y - start.y) / 2;
  const dx1 = start.x - deltaX * 0.5;
  const dy1 = start.y;
  const dx2 = end.x;
  const dy2 = end.y - halfDeltaY;

  return `M ${start.x}, ${start.y} C ${dx1}, ${dy1} ${dx2}, ${dy2} ${end.x}, ${end.y}`;
};

export const directionMap = {
  left: drawLeft,
  right: drawRight,
  'center-left': drawCenterLeft,
  'center-right': drawCenterRight,
  center: drawTopDown
};
