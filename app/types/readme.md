### Types

**Use this folder to organize types, interfaces for typescript to use in different modules (components, services etc...).**

You can use namespaces to organize types.

```javascript
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```

You can also create nested namespaces in one declaration:

```javascript
declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```

[More info (Typescript Docs)](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#organizing-types)
