# Greasemonkey-unsafeWindow-Proxy

Workaround library for `unsafeWindow` ( Firefox 30 ~ )

See detail on 

* [Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog](https://blog.mozilla.org/addons/2014/04/10/changes-to-unsafewindow-for-the-add-on-sdk/comment-page-1/#comment-199873 "Changes to unsafeWindow for the Add-on SDK | Mozilla Add-ons Blog")

This library provide proxy object used by `new Proxy(unsafeWindow)`.

## Usage

```js
var contentScriptObject = {"greeting" : "hello from add-on"};
unsafeWindow.contentScriptObject = cloneInto(contentScriptObject, unsafeWindow);
// ==
var win = unsafeWindowProxy(unsafeWindow);
var contentScriptObject = {"greeting" : "hello from add-on"};
win.contentScriptObject = contentScriptObject;
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT