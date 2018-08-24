# Guration

A module that allows you to validate drag and drop actions on a tree of data, culminating in 'edits' that describe the modification on a normalized data structure. There are two types of edits a `Remove` and an `Insert`. The drag and drop logic is handle by the `Level` component, so reference below to drag zones and drop zones will refer to the drag zones created using the `Level` component. Note that **edits don't change the tree**, instead the expectation is that state updates will be made in the consumer appilcation in response to these edits that cause a render to the `Guration` part of the app that then reflects these edits.

## Edits

First it will be worth describing edits. Edits are objects that describe an update to the tree and will only be fired when they are deemed to be valid (i.e. a drop of some type into a position that accepts that type). Moves into the same position (i.e. moving an element into the drop zone either side of itself) will not fire edits, and edits that are invalid will fire errors.

### `Remove`

A `Remove` edit will only fire as part of a pair of edits: `[Remove, Insert]`, which describes a move of an element from inside the Guration `Root` context back into another valid position. It has the following shape:

```js
type Remove = {
  type: 'REMOVE',
  payload: {
    type: string,
    id: string,
    path: {
      parent: {
        type: string,
        childrenField: string,
        index: number,
        id: string
      }
    }
  }
};
```

### `Insert`

An `Insert` edit will fire either in tandem with a `Remove` edit (for a move of an item from within the `Guration` context as mentioned above), or otherwise for an insert of some item from outside that has been mapped in through (`mapIn`)[#mapIn]. It has the following shape:

```js
type Insert = {
  type: 'INSERT',
  payload: {
    type: string,
    id: string,
    path: {
      index: number,
      parent: {
        type: string,
        childrenField: string,
        index: number,
        id: string
      }
    }
  }
};
```

## Component API

### `<Root />`

This is the wrapper around a `Guration` context and [`Levels`](#Level) cannot be rendered outside of a `Root`. It's component that allows you to listen for edits made from drag and drop actions.

#### Props

##### `id: number | string`

This is the root id that will be used as the parent of the whole tree and will appear in edits that drop into drop zones for the root level of the tree.

##### `type: string`

Similarly to the [`id`](#id) this will describe the type of the root node (again, used in edits) but this is also what limits drops into this position: only drops of the same type can be made at the root level.

##### `field: ?string`

This will set the `childrenField` in an edit, which can allow for easier reflection on the type of edit to be made.

##### `onChange: ?(Edit[]) => void`

This expects a callback function that will receive an array of (`edits`)[#Edits] each time an action has happened. Currently the array will have the shape of either: `[Remove, Insert]` or `[Insert]`.

##### `onEdit: ?{ [string]: (edit) => void }`

An object with any of the keys `INSERT` or `REMOVE` where the values are callbacks which will only fire on specific edits as a convenience for `onChange`.

##### `onError: ?(error: string) => void`

A callback that will recieve strings describing errors regarding invalid drops. For example, dropping an element of one type into a level of another type or dropping an element into a child of itself.

##### `mapIn: ?{ [string]: string => { id: string, type: string } }`

An object whose keys represent a `type` on `e.dataTransfer.types` that can be handle by the callback that is in the value position of the object. The callback will receive any data that is found when `e.dataTranfer.getData(type)` is called and is expected to return an object of `{ id: string, type: string }` that can be used to validate and then generate an edit in a drop zone.

##### `mapOut: ?{ [string]: (el: Object, type: string, id: string, path: Path[]) => string }`

An object that does the opposite of `mapIn` and describes how to transform a node into drag data. The keys on the object are the keys that will be called using `e.dataTransfer.setData(key)`, allowing drags from here to other drop zones (possibly other Guration contexts).

### \<Level />

A `Level` is repsonsible for defining the types for a specific level in the tree as well as defining the types for the elements that _are_ currently rendered in that position. It also provides the props for draggable nodes and renders drop zones between these nodes.

#### Props

##### `arr: <T: Object>[]`

The array of elements to map over. Passing this in allows the component to handle laying out drop zones between each element (using fragments) and plucking the id of each element in order to construct edits.

##### `children: (item, getNodeProps, index) => ReactElement`

This is not a React element but a function child. `item` is an item in the array, `getNodeProps()` is a function that will return the node props (such as the drag event handlers etc.) to spread on a React DOM node to make it draggable. In future it will taking a prop argument that will allow adding other props to the same Node. Currently, all event handlers that are added by these props, would be remove if adding the same event handlers to the same node.

##### `type: string`

Much like `Root` this specifies both the time of the draggable elements at this level and the type of element that can be dragged to this level.

##### `field: ?string`

Again much like `Root` this specifies the `childrenField` field of an edit that can help for making updates.

##### `renderDrop: ?(getDropProps, { canDrop: boolean, isTarget: boolean }, index) => ReactElement`

This is a function that will be used to render the drops between the draggable nodes rendered by `children`. `isOver` is much like `:hover` pseduo-selector except that when `dropOnNode` is true `isTarget` will also be true when that position is the target position for a drop while hovering a node.

##### `getKey: ?(el: T) => number | string`

A function that returns the key from each object in the array, defaults to `({ id }) => id`

##### `dedupeType: ?string`

Specifying this on a `Level` will ensure that anything below this level that is of the same `type` and has the same `dedupeKey` will act as a move rather than an insert.

##### `getDedupeKey: ?(el: T) => number | string``

The function that returns the key for comapring items for deduping, defaults to `getKey`.

##### `dropOnNode: ?boolean`

A boolean that defaults to `treu`, which specifics whether `getNodeProps` will return props that allow dropping on top of the node element. If this is true, dropping in the top 50% of the node will result in a drop at that node's index, and likewise dropping in the bottom 50% will result in a drop at the index after that node.

## Example

Each `Level` will render drop zones - rendered by `renderDrop`, which received the props required for handling browser drop events - around each child. Each child will be rendered using the render prop supplied to `Level`; a single function child. This function will be passed each item in the `arr` and a second argument `getDragProps` that you can add to any of your components in order to drag it around (see example). Currently adding these props to a DOM node that wraps a `Level` component is not supported.

```js
const renderDrop = (getProps, i) => <Drop Zone {...getProps(i)} />;

const Front = ({ front }) => (
  <Root
    id={front.id}
    type="front"
    onChange={change => console.log(change)}
    onError={error => console.log(error)}
  >
    <Level
      arr={front.collections}
      type="collection"
      renderDrop={renderDrop}
      dedupeType="articleFragment"
    >
      {({ title, articleFragments }) => (
        <div>
          <h1>{title}</h1>
          <Indent>
            <Level
              arr={articleFragments}
              type="articleFragment"
              renderDrop={renderDrop}
            >
              {({ title, meta: { supporting } }, afDragProps) => (
                <div>
                  <h1 {...afDragProps()}>{title}</h1>
                  <Indent>
                    <Level
                      arr={supporting}
                      type="articleFragment"
                      renderDrop={renderDrop}
                    >
                      {({ title }, sDragProps) => (
                        <div>
                          <h1 {...sDragProps()}>{title}</h1>
                        </div>
                      )}
                    </Level>
                  </Indent>
                </div>
              )}
            </Level>
          </Indent>
        </div>
      )}
    </Level>
  </Root>
);
```
