<a name="0.2.1"></a>
# 0.2.1 (2014-08-08)

## Bug Fixes

- **AngularJS 1.3.x**: Animation unit test now works and added fix for `.processQueue`
  ([e0ded6f](https://github.com/marcoslin/angularAMD/commit/e0ded6ffd290299322a721f7c669867151e9d435)
   [#80](https://github.com/marcoslin/angularAMD/issues/80))

- **IE8**: Removed the use of `.const` breaking IE8.
  ([e0ded6f](https://github.com/marcoslin/angularAMD/commit/e0ded6ffd290299322a721f7c669867151e9d435)
   [#84](https://github.com/marcoslin/angularAMD/issues/84))

<a name="0.2.0"></a>
# 0.2.0 (2014-07-23)
*0.2.0-rc.1 (2014-06-28)*

## Bug Fixes

- **ngload**: ngload now correctly load module that creates submodules internally
  ([e8b74af](https://github.com/marcoslin/angularAMD/commit/e8b74afd8e8de40accd15d40ea58b2d4fbb53ca5)
   [#67](https://github.com/marcoslin/angularAMD/issues/67))

## Features

- **angularAMD.<<recipe>>**: modules now can be defined before bootstrap using `angularAMD.factory`
  ([81a5495](https://github.com/marcoslin/angularAMD/commit/81a54955080cff296118321ee993eb66d95507a5)
   [#14](https://github.com/marcoslin/angularAMD/issues/14))

- **.config**: New method allowing changing of configuration post bootstrap
  ([d3ebfed](https://github.com/marcoslin/angularAMD/commit/d3ebfed13bc83fea326ef1dca98a82977782cd40)
   [#71](https://github.com/marcoslin/angularAMD/issues/71))
   
- **.route**: `controller` parameter can now be omitted if module specified in `controllerUrl` returns
  a function.
  ([550cd28](https://github.com/marcoslin/angularAMD/commit/550cd2832d0bdeac73d9c50b1ec68e7c087e9d93)
   [#72](https://github.com/marcoslin/angularAMD/issues/72))

## Breaking Changes

- **app.<<recipe>>**: `app.register` is now deprecated so a factory creation using `app.register.factory`
  is now `app.factory`.  To support this, `.bootstrap` creates a alternate `app` that need to be used
  instead of the `app` created using `angular.module(...)`.
  ([54b5ec2](https://github.com/marcoslin/angularAMD/commit/54b5ec2d2553b30cff60dde94e9b06b0be5bf435)
   [1c7922b](https://github.com/marcoslin/angularAMD/commit/1c7922b9ecd6b04f80f97085edf8debb346c83b8)
   [#63](https://github.com/marcoslin/angularAMD/pull/63)
   [#70](https://github.com/marcoslin/angularAMD/issues/70))
  


<a name="0.1.1"></a>
# 0.1.1 (2014-05-28)

## Bug Fixes

- **ngload**: On-demand loading of animation now works
  ([eae2e56](https://github.com/marcoslin/angularAMD/commit/eae2e5623d742bc0ef1e6c10eb74da7ae9e367a0)
   [#31](https://github.com/marcoslin/angularAMD/issues/31))
- **.bootstrap** Fixed Firefox Right-Click bug in Html5Mode
   [as per this post](https://groups.google.com/d/msg/angular/LAk9oZqRx24/mPXPj495WlEJ)
  ([9ce8ca1](https://github.com/marcoslin/angularAMD/commit/9ce8ca18d2b69b4779714bb6a49feee784450458)
   [#41](https://github.com/marcoslin/angularAMD/issues/41))
- **www**: As result of
  [40a6dd0](https://github.com/marcoslin/angularAMD/commit/40a6dd0c89f49926fc4f5be4c5450f9eb61dcd42),
  removed `$rootScope` from `.config` block and replaced with custom `configValue` provider.
  ([6e4f7d1](https://github.com/marcoslin/angularAMD/commit/6e4f7d154879abd11c8292ded2e947e55e580347)
   [#60](https://github.com/marcoslin/angularAMD/issues/60))
- **www**: Sample Plunk doesn't execute due to MIME type error.  Switched to use `jsdelivr` instead of `raw.github.com` and from Plunker to `bl.ocks.org`
  ([cf8c0ff](https://github.com/marcoslin/angularAMD/commit/cf8c0fffdc47fe2e85d36dfaf46365ed2d6ec66f)
   [#59](https://github.com/marcoslin/angularAMD/issues/59)
   [#54](https://github.com/marcoslin/angularAMD/issues/54))

## Features

- **unittest** Unit Test now include Registered Controller with Registered Factory
  ([c40bc19](https://github.com/marcoslin/angularAMD/commit/c40bc194983cc7d34b4c38e43405acf6591a1f6c)
   [#27](https://github.com/marcoslin/angularAMD/issues/27))
- **e2e**: Added Protractor e2e testing.  Need to run manually using `grunt test-e2e` and excluded from Travis-CI for now.
  ([4efc87d](https://github.com/marcoslin/angularAMD/commit/4efc87d9c4ce4db8ac9f67752a448536e08d56af)
   [5f746ef](https://github.com/marcoslin/angularAMD/commit/5f746ef3f7554a8e068557b0e8b79e52cc7d114d)
   [6299430](https://github.com/marcoslin/angularAMD/commit/6299430877278dfb8e919bc5a872d0974543743d))


## Breaking Changes

- **ngload**: `ngload` did not correctly execute the `.config` block causing `.provider` to fail
  ([40a6dd0](https://github.com/marcoslin/angularAMD/commit/40a6dd0c89f49926fc4f5be4c5450f9eb61dcd42)
   [#28](https://github.com/marcoslin/angularAMD/issues/28)
   [#21](https://github.com/marcoslin/angularAMD/issues/21)).
   Prior to this fix, module loaded using `ngload` allowed for `.config` block to load instance such as `$rootScope`.  Loading these module now will result in error.

<a name="0.1.0"></a>
# 0.1.0 (2013-11-13)

### Initial Public Release with `ngload`
