# Textfield

Normalized application textfield.

## Props:

<span style="color:#333333">
<center>
| Name | Type | Required | Default | Desc. |
| :---: | :---: | :---: | :---: | :-----: |
| hasError | bool | false | false | render with error indications |
| leadIcon | node | false | none | display icon with textfield |
</center>
</span>

## Installation

```javascript
import IconButton from "~Components/IconButton";

const ExampleComponent = () => (
  <div className={"container"}>
    <TextField
      label="Pokemon Name..."
      onChange={e => console.log(e.target.value)}
      hasError={false}
    />
  </div>
);
```

## Actions

**None**
