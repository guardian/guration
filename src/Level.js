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

  getDropProps(getDropProps: *, i: number, getIndexOffset: *) {
    const { arr, maxChildren } = this.props;
    return getDropProps(i, { childrenCount: arr.length, maxChildren });
  }

  renderDrop(i: number, getDropProps: *, isTarget: *) {
    const { renderDrop } = this.props;
    return (
      !!renderDrop &&
      renderDrop(this.getDropProps(getDropProps, i), isTarget(i), i)
    );
  }

  render() {
    const {
      arr,
      type,
      field = `${type}s`,
      getKey,
      getDedupeKey = getKey,
      dedupeType,
      children
    } = this.props;

    const { Wrapper, props } = getDedupeWrapperAndProps(dedupeType);

    return (
      <Children type={type} field={field}>
        {(getDropProps, isTarget) => (
          <Wrapper {...props}>
            {arr.map((child, i) => (
              <React.Fragment key={getKey(child)}>
                {this.renderDrop(i, getDropProps, isTarget)}
                <Node
                  id={getKey(child)}
                  dedupeKey={getDedupeKey(child)}
                  index={i}
                >
                  {(getDragProps, getIndexOffset) =>
                    children(
                      child,
                      getDragProps,
                      this.getDropProps(getDropProps, i, getIndexOffset),
                      i
                    )
                  }
                </Node>
              </React.Fragment>
            ))}
            {this.renderDrop(arr.length, getDropProps, isTarget)}
          </Wrapper>
        )}
      </Children>
    );
  }
}

export default Level;
