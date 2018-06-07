# Guration

A module that allows you to validate drag and drop actions on a tree of data, culminating in 'edits' that describe the modification on a normalized data structure.

```js
const Front = ({ front }) => (
  <GU.Root type="front" id={front.id}>
    <GU.Children type="collection">
      {/* specify a type that can be dropped as children of this position */}
      <GU.RenderChildren arr={front.collections} renderDrop={renderDrop}>
        {/* RenderChildren is a helper that will interleave children and drops, you could otherwise pass a render prop to Children and output completely custom JSX */}
        {(collection, i) => (
          <GU.Node id={collection.id} index={i}>
            {/* Specify a child node that will be allowed to be dragged to any other children drop zone that allows collections, this node will also be specified as the parent of it's children for any edits */}
            {collectionDragProps => (
              <CollectionContainer
                id={collection.id}
                {...collectionDragProps()}
              >
                <GU.Children type="article">
                  {/* Another layer of the tree */}
                  <GU.RenderChildren
                    arr={collection.articles}
                    renderDrop={renderDrop}
                  >
                    {(article, j) => (
                      <GU.Node id={article.id} index={i}>
                        <ArticleContainer
                          id={article.id}
                          {...articleDragProps()}
                        />
                      </GU.Node>
                    )}
                  </GU.RenderChildren>
                </GU.Children>
              </CollectionContainer>
            )}
          </GU.Node>
        )}
      </GU.RenderChildren>
    </GU.Children>
  </GU.Root>
);
```

## How it works
Ultimately, Guration provides drag props (through the `<Node />` component) and drop props (through the `<Children />` component) that can be passed on to consumer components. These props will handle the drag and drop events, validate them and then pass out and edits that arise from valid drag and drops.
