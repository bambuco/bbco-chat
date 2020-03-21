# Chat BambuCo

## Development server

Run `gulp` for a dev server. The app will automatically reload if you change any of the source files.

## Build

Run `gulp build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Usage

Include bbco-chat.min.js somewhere in your html. Make sure both, bbco-chat.min.js and bbco-chat.min.css are present in the same folder.

`<script type="text/javascript" src="bbco-chat.min.js"></script>`

By default the chat will try to use the authentication url as 

`https://${URL_MOODLE}/local/tepuy/components/socket/index.php?uid=${MANIFEST_ID}&courseid=${COURSE_ID}`

But you can pre-define a variable `BBCO_CHAT_AUTH_URL`, to set the url where to get the user authentication information.

```
<script type="text/javascript">
    var BBCO_CHAT_AUTH_URL = "json/fakeauth_2.json";
</script>
```

## Deployment


## Running unit tests

## Further help

