# Guration

A module that allows you to validate drag and drop actions on a tree of data, culminating in 'edits' that describe the modification on a normalized data structure.

## Example
Each `Level` will render drop zones - rendered by `renderDrop`, which received the props required for handling drag events - around each child. Each child will be rendered using the render prop below `Level`. The level will be passed each item in the `arr` and a second argument `getDragProps` that you can add to any of your components in order to trag it around. Currently adding  these props to a node that wraps a `Level` component is not supported.

```js
const renderDrop = (getProps, i) => <DropZone {...getProps(i)} />;

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
              offset={offset}
              type="articleFragment"
              renderDrop={renderDrop}
              maxChildren={2}
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

## How it works
Behind the scenes the `Root` component will handle the drag and drop events, validate them and then pass out and edits that arise from valid drag and drops.
