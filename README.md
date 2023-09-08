# Add Web Workers to create-react-app using Parcel (eject not required)

Find the original blog post here:  https://carterembry.com/2023/web-workers-react-app-parcel-wo-eject

I've been working on [FidgetMap](https://www.fidgetmap.com/) for a while now. I think I could speed up a lot of processes (including the basic render loop) by adding [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to handle a lot of the rendering tasks asynchronously. The whole game is drawn by writing RGB data to arrays then compositing them onto a canvas, so it's really a perfect candidate for [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). It's pretty wild to think it's come this far without any background threads but here we are.

I won't get into a whole history lesson about [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), suffice to say they will let me pass a lot of rendering to a background thread (multiple background threads in my case) to free up the main execution thread. The whole game should be faster with certain tasks compartmentalized in the background.

The main part of the game is drawn directly to a canvas, as mentioned above, but the UI controls such as the menu and interactive buttons are written in React. No point in reinventing the wheel regarding text and flex-style rendering. So I built the project using create-react-app (with Typescript). I want to write my [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) in the same style, preferably in the same source code. But you can't just import Web Worker modules then make them into workers. You have to instantiate a worker with a URL to a separate JavaScript file (or bundle).

CRA is great. It hides any configuration and makes it super easy to start a React project. But it's not so great at advanced configuration like this, where you need to compile your app to one JS file and potentially several [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) into separate files. The usual recommendation is to eject from create-react-app. This lets you fiddle with configuration as needed, but with great power comes great responsibility. Once you've ejected, you have to maintain the configuration and scripts yourself. No more easy updating of one well tested project.

So how can we make different compile targets for different entry points? Parcel to the rescue.  ParcelJS is a zero-configuration build tool that works with Typescript out-of-the-box. You just say "hey Parcel, this entry file" and it Does The Thing™. Enough talk, let me show you how I did it.

