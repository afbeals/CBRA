# Primary Button

Normalized application primary buttons. Used to draw attention to primary action.

## Props:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :-----: |
| children | Node | true <br> one of: [children, text] | None | children content to display in button |
| text | string | true <br> one of: [children, text] | None | Text to display on button |
| type | string | false <br> one of: ['primary', 'secondary'] | 'primary' | Button type to render |
| size | string | false <br> one of: ['small', 'medium', 'large'] | 'medium' | render size of the button |

| linkTo | string | false | null | URL to link to, turns button into <a /> element |

| icon | string | false | null | icon classname to display |
| disabled | bool | false | false | Is button disabled |

</center>
</span>

## Installation

```javascript
import Button from "~Components/Button";

const ExampleComponent = () => (
  <div className={"container"}>
    <Button
      text={"Primary Button Text"}
      type={"primary"}
      onClick={() => console.log("hello")}
      disabled={false}
      icon={"fas fas-hourglass"}
      linkTo={"www.google.com"}
      size={"large"}
    />
  </div>
);
```

## Actions

**None**
