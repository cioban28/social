# Pages

Pages/Routes of our application.

### Folder structure:
```
/pages
  /[PageName]          # Folder with name of page
    /components        # Components related only to this page. If component will be shared between different pages use root `components` folder
    /[PageName].tsx    # Page main container
    /index.tsx         # exports [PageName].tsx
```
