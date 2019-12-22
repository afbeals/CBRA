# Loading

Normalized app loading animation

## Props:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :---: |
| text | string | false | None | Additional informational text |
| dark | bool | false | false | Render for dark backgrounds |
| size | string <br> one of: ['small', 'medium', 'large'] | false | 'md' | Size of animation |
</center>
</span>

## Installation

```javascript
// Local
import Loading from "~Components/Loading";

const ExampleComponent = () => (
  <div>
    <Loading text="I'm loading" dark={false} size={"lg"} />
  </div>
);
```

## Actions:

**None**
