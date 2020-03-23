declare module 'react-sizes';

declare module '*.json' {
  const resource: any;
  export = resource;
}

declare module '*.png' {
  const resource: string;
  export = resource;
}

declare module '*.svg' {
  const resource: string;
  export = resource;
}

declare module '*.css' {
  const resource: any;
  export default resource;
}

declare module '*.scss';
