# Icon Button

Normalized application icon button. Used to enable an icon with button.

## Props:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :-----: |
| children | HTML Element | true | None | icon element to display as button |
| primary | bool | false | false | display icon with primary styles |
| ripple | bool | false | true | enable the ripple effect for the icon |
| size | string | false <br> one of: ['small', 'medium'] | 'small' | render size of the button |
</center>
</span>

## Installation

```javascript
import IconButton from "~Components/IconButton";

const ExampleComponent = () => (
  <div className={"container"}>
    <IconButton
      disabled={false}
      className="myButton"
      onClick={() => console.log("clicked")}
      size="medium"
    >
      <i className="fas fa-mars" />
    </IconButton>
  </div>
);
```

## Actions

**None**
