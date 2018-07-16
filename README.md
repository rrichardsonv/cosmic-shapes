# cosmic-shapes

Simple canvas cordova application for geometric visualization

# Setup

##### Prepare js dependencies

`$ npm i`

##### Prepare cordova platforms and plugins

`$ cordova prepare`

##### Build the bundle

`$ npm run build`

you may need to `chmod +x` on `build.sh`;

##### To Start

<table>
<tr>
<td>Browser</td>
<td>

`$ npm run browser-dev`

</td>
</tr>
<tr>
<td>iOS simulator with iPad</td>
<td>

`$ npm run ios-dev`

</td>
</tr>
</table>

### Notes

Clicking on the moon as it is being drawn will hide the controls.

Was not able to get canvas video capture working on ios. Realized too late that my only option was stitching frames together server side with something like ffmpeg given ReplayKit currently does not work on the iPad sim. The basic flow is as follows:

1.  Establish websocket connection
2.  Bind event listeners
3.  On canvas paint begin recording
4.  On stop queue the MediaStream and an image of final state
5.  Run through the queue parsing and kicking down the socket
