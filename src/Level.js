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
  getKey: (child: T) => string,
  getDedupeKey?: (child: T) => string,
  dedupeType?: *,
  renderDrop?: (
    dropProps: DropProps,
    isTarget: boolean,
    i: number
  ) => ReactNode,
  maxChildren: number,
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

class Level<T: *> extends React.Component<LevelProps<T>> {
  static defaultProps = {
    getKey: ({ id }: { id: string }) => id,
    maxChildren: Infinity
  };

  render() {
    const {
      arr,
      type,
      field = `${type}s`,
      getKey,
      getDedupeKey = getKey,
      dedupeType,
      children,
      maxChildren,
      renderDrop
    } = this.props;

    const { Wrapper, props } = getDedupeWrapperAndProps(dedupeType);

    return (
      <Children type={type} field={field}>
        {(_getDropProps, isTarget) => {
          const getDropProps = _getDropProps({
            childrenCount: arr.length,
            maxChildren
          });
          return (
            <Wrapper {...props}>
              {arr.map((child, i) => (
                <React.Fragment key={getKey(child)}>
                  {!!renderDrop && renderDrop(getDropProps(i), isTarget(i), i)}
                  <Node
                    id={getKey(child)}
                    dedupeKey={getDedupeKey(child)}
                    index={i}
                  >
                    {(getDragProps, getIndexOffset) =>
                      children(
                        child,
                        getDragProps,
                        getDropProps(i, getIndexOffset),
                        i
                      )
                    }
                  </Node>
                </React.Fragment>
              ))}
              {!!renderDrop &&
                renderDrop(
                  getDropProps(arr.length),
                  isTarget(arr.length),
                  arr.length
                )}
            </Wrapper>
          );
        }}
      </Children>
    );
  }
}

export default Level;
