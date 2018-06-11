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
  getKey?: (child: T) => string,
  getDedupeKey?: (child: T) => string,
  dedupeType?: *,
  renderDrop?: (dropProps: DropProps) => ReactNode,
  maxChildren?: number,
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
  getKey = ({ id }: { id: string }) => id,
  getDedupeKey = getKey,
  dedupeType,
  renderDrop,
  maxChildren = Infinity,
  children
}: LevelProps<T>) => {
  const { Wrapper, props } = getDedupeWrapperAndProps(dedupeType);

  return (
    <Children type={type} key={key}>
      {getDropProps => (
        <Wrapper {...props}>
          {arr.map((child, i) => (
            <React.Fragment key={getKey(child)}>
              {renderDrop && renderDrop(
                getDropProps(i, { childrenCount: arr.length, maxChildren })
              )}
              <Node
                id={getKey(child)}
                dedupeKey={getDedupeKey(child)}
                index={i}
              >
                {getDragProps => children(child, getDragProps)}
              </Node>
            </React.Fragment>
          ))}
          {renderDrop && renderDrop(
            getDropProps(arr.length, { childrenCount: arr.length, maxChildren })
          )}
        </Wrapper>
      )}
    </Children>
  );
};

export default Level;
