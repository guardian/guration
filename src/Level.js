// @flow

import React, { type Node as ReactNode } from 'react';
import Node from './Node';
import Children from './Children';
import Dedupe from './Dedupe';

type DragProps = {
  draggable: true,
  onDragStart: (e: DragEvent) => void
};

type DropProps = {
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent) => void
};

type LevelProps<T> = {
  arr: T[],
  type: string,
  key?: string,
  getKey: (child: T) => string,
  getDedupeKey?: (child: T) => string,
  dedupeType?: *,
  renderDrop: (dropProps: DropProps) => ReactNode,
  children: (child: T, getDragProps: () => DragProps) => ReactNode
};

const getDedupeWrapperAndProps = (dedupeType: *) =>
  dedupeType
    ? {
        Wrapper: Dedupe,
        props: { type: dedupeType }
      }
    : { Wrapper: React.Fragment, props: {} };

const Level = <T: *>({
  arr,
  type,
  key = `${type}s`,
  getKey,
  getDedupeKey = getKey,
  dedupeType,
  renderDrop,
  children
}: LevelProps<T>) => {
  const { Wrapper, props } = getDedupeWrapperAndProps(dedupeType);

  return (
    <Children type={type} key={key}>
      {getDropProps => (
        <Wrapper {...props}>
          {arr.map((child, i) => (
            <React.Fragment key={getKey(child)}>
              {renderDrop(getDropProps(i))}
              <Node
                id={getKey(child)}
                dedupeKey={getDedupeKey(child)}
                index={i}
              >
                {getDragProps => children(child, getDragProps)}
              </Node>
            </React.Fragment>
          ))}
          {renderDrop(getDropProps(arr.length))}
        </Wrapper>
      )}
    </Children>
  );
};

Level.defaultProps = {
  getKey: ({ id }: { id: string }) => id
};

export default Level;
