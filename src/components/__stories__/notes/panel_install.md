# Panel

Normalized content wrapper

## Props:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :---: |
| title | Node | true | None | Header content |
| children | Node | one of: <br> [children, render] | None | Children content to render |
| render | Func | false | one of: <br> [children, render] | render function, passes body classname as param |
</center>
</span>

## Installation

```javascript
// Local
import Panel from "~Components/Panel";

const ExampleComponent = () => (
  <Panel title={() => <h3>My Title</h3>} className={"my_classname"}>
    Children content
  </Panel>
);
```

## Actions:

**None**
