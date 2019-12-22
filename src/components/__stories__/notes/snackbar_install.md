# Snackbar

Temporary and fixed brief message about app processes.

- _App contains single global snackbar_
- _uses values from enum to decide message type (color)_

## Props:

**None**

## Installation

```javascript
// Local
import Snackbar from "~Components/Snackbar";
import appEnum from "~Util/enum";

const ExampleComponent = () => (
  <div>
    <Snackbar />
  </div>
);
```

## Actions: application

Example composed action to show `Snackbar` message.

```javascript
appShowNotify({
  type: appEnum.APP.NOTIFY_TYPE.NORMAL,
  msg: "successfully sent",
  timer: 3400 // optional
});
```
