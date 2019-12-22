# Overlay

Normalized app overlay for blocking interaction while loading series of events

- _App contains single global `Overlay` component_

## Props:

**None**

## Installation

```javascript
// Local
import Overlay from "~Components/Overlay";

const ExampleComponent = () => (
  <div>
    <Overlay />
  </div>
);
```

## Actions: application

Composed action to fire overlay

```javascript
appShowOverlay();
```

Composed action to hide overlay

```javascript
appHideOverlay();
```
