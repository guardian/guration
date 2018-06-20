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
  field?: string,
  getKey?: (child: T) => string,
  getDedupeKey?: (child: T) => string,
  dedupeType?: *,
  renderDrop?: (
    dropProps: DropProps,
    isTarget: boolean,
    i: number
  ) => ReactNode,
  maxChildren?: number,
  children: (
    child: T,
    getDragProps: () => DragProps,
    dropProps: DropProps,
    i: number
  ) => ReactNode
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
  field = `${type}s`,
  getKey = ({ id }: { id: string }) => id,
  getDedupeKey = getKey,
  dedupeType,
  renderDrop,
  maxChildren = Infinity,
  children
}: LevelProps<T>) => {
  const { Wrapper, props } = getDedupeWrapperAndProps(dedupeType);

  return (
    <Children type={type} field={field}>
      {(getDropProps, isTarget) => (
        <Wrapper {...props}>
          {arr.map((child, i) => (
            <React.Fragment key={getKey(child)}>
              {renderDrop &&
                renderDrop(
                  getDropProps(i, { childrenCount: arr.length, maxChildren }),
                  isTarget(i),
                  i
                )}
              <Node
                id={getKey(child)}
                dedupeKey={getDedupeKey(child)}
                getDropProps={getIndexOffset =>
                  getDropProps(
                    i,
                    { childrenCount: arr.length, maxChildren },
                    getIndexOffset
                  )
                }
                index={i}
              >
                {(getDragProps, dropProps) =>
                  children(child, getDragProps, dropProps, i)
                }
              </Node>
            </React.Fragment>
          ))}
          {renderDrop &&
            renderDrop(
              getDropProps(arr.length, {
                childrenCount: arr.length,
                maxChildren
              }),
              isTarget(arr.length),
              arr.length
            )}
        </Wrapper>
      )}
    </Children>
  );
};

export default Level;
