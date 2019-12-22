# Page

Normalized Page wrapper

## Parameters:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :---: |
| WrappedComponent | Element | true | None | The component to be rendered |
| title | string | false | 'Page Title' | Header title for page |
| headerComponent | Element | false | None | Content to render under title |
</center>
</span>

## Installation

```javascript
// Local
import page from "~Components/Page";

// Constants
const HeaderComponent = () => <h2>Sub Text</h2>;
const HomePage = page(
  React.lazy(() => import("~Pages/Home")),
  "Home Page",
  <HeaderComponent />
);

const ExampleComponent = () => (
  <div>
    <HomePage />
  </div>
);
```

## Actions:

**None**
