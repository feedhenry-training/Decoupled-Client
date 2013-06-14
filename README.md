![FeedHenry](http://www.feedhenry.com/wp-content/themes/feedhenry/images/logo.gif)
# Decoupled Builds
This project shows the project layout used for building a FeedHenry application decoupled from the build farm using native SDK's for Cordova.

# Porting to your project
Copy the directory structure, remembering index.html now needs it's full structure including `<html>` and `<body>` tags.
Don't forget the .gitignore file into your new repo - it contains some important lines to keep temporary android and xcode files, along with the WWW directories of both projects out of the repo
You'll need to include the feedhenry JS SDK and init it, as in index.html - remember to switch to targeting live cloud code in release (see index.html). You might want to rename the native projects - at the moment it's called 'Decoupled'. Especially the product name, as that shows up on device once installed.

# Usage
To copy the files into the native projects
1.  npm uninstall -g grunt # remove previous version of grunt if any
2.  npm install -g grunt-cli # install grunt cli globally
3.  npm install . # run this from the root of the project to install required dependencies locally
4.  grunt build # run this from the root of the project to copy the contents of client/default/* to the respective directories
Then, to run the project, open the Xcode project in XCode, and add the android project in Eclipse as an existing project.

# Init FH JS SDK
For a FeedHenry app to communicate with the cloud, we must set some parameters that allow it to do so. These parameters can be found from the details section of your app in the app studio.

The details you need are:
*host* - Host to use, i.e. https://apps.feedhenry.com
*appid* - Your App ID, used to identify your app.
*appkey* - Your App API Key

These details must then be put into `package.json` which will then get used as parameters to render index.html when the app is being built. These parameters are also automatically supplied when running the app with `fhc local`.

```javascript
$fh.init({
  "host": {{{ host }}},
  "appid": {{ appid }},
  "appkey": {{ appkey }},
}, function(res) {
  // Init call was successful. Alert the response
  alert('Got response from init:' + JSON.stringify(res));
}, function(msg, err) {
  // An error occured during the init call. Alert some debugging information
  alert('Init call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
  });
```

To read more about $fh.init please visit our
[docs site](http://docs.feedhenry.com/v2/api_js_client_api.html#$fh.init).

# index.html Templates
The default Gruntfile renders index.html as a mustache template. As well as the required parameters for $fh.init, it is also possible to add other parameters to the template through the `templateParams` property in `package.json`. For each of the build configurations, it is possible to supply a `templateParams` that will override the `templateParams` property in the root of package.json.

```javascript
{
    "templateParams": {
        "property": "value",
        "otherProperty": "otherValue"
    },
    "android": {
        "templateParams": {
            "property": "android value"
        }
    },
    "ios": {

    }
}
```

In the example above, when the android build is being produced `index.html` will be passed the parameters:

```javascript
{
    "property": "android value",
    "otherProperty": "otherValue"
}
```

Whereas the ios build will use the default template parameters:
```javascript
{
    "property": "value",
    "otherProperty": "otherValue"
}
```


# Support
This project has been tested on OSX in part on Windows - it should support both.
Upgrading to a new version of Cordova/Phonegap is easy - just replace the JS files in resources/cordova/ios (and android) directories and they'll get copied across by the build task.
