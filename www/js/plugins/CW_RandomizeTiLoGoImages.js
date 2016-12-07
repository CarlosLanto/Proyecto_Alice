//=======================================================================
// Randomize Title/Loading/Game Over Images Plugin (RMMV) v1.0
//=======================================================================
// * The purpose of the Randomize  Title/Loading/Game Over Plugin is to
//   add variety to your game. As the title suggests, it randomizes the
//   Title Screen  and Game Over  backgrounds, as  well as  that boring
//   "Loading..." image. Thus,  a different image will appear each time
//   the scene is loaded.
//
//	 This plugin  was originally three separate ones,  but it made more
//	 sense to merge them into a single plugin for public release rather
//	 than three.  Thus, they're logically  all in one  convenient file,
//	 with options to toggle each section on/off.
//
//	 The bugs still present in the  separate plugins have been fixed in
//	 this plugin,  although there may still be some I've  overlooked or
//	 haven't found.
//
//	 The  "Randomize  Loading... Image" plugin  was originally  written
//	 specifically for "The Adventures  of Tryggr". It was released as a
//	 simple plugin when development on "Otherworld" officially began in
//	 RMMV.  It has since been updated and improved upon,  though it has
//	 not been updated on the blog.
//
//	 The "Randomize Title Screen Bg"  plugin was going to be integrated
//	 into my  "Title Screen Add-On"  plugin, but I decided  last minute
//	 not to include it and it was written as a separate plugin.
//
//	 The  "Randomize  Game Over Bg"  plugin was  first inspired  by the
//	 "Randomize Loading... Image"  plugin specifically for the multiple
//	 endings in "Otherworld",  where it was tweaked for the purposes of
//	 the game. It's been stripped for this plugin, with the irrelevant,
//	 game-exclusive parts removed.
//
//	 Bear in mind,  however, that larger sized or higher quality images
//	 may take  a bit longer to load due  to the way that  RMMV preloads
//	 and caches images.  If you use a plugin to  pre-cache images, such
//   as TDDP's Preloader Manager plugin, this may help significantly.
//
//       * © 2016, Companion Wulf
//
//========================================================================
// CW_RandomizeTiLoGoImages.js
//========================================================================
 
var Imported = Imported || {}; Imported.CW_RandomizeTiLoGoImages = true;
var CWT = CWT|| {}; CWT.TiLoGo = CWT.TiLoGo || {};

CWT.TiLoGo.Version = 1.0;
CWT.TiLoGo.Build = 5.6;
CWT.TiLoGo.Copyright = '© 2016, Companion Wulf';

/*:
 @plugindesc Randomize Loading, Title Screen and Game Over images.
 @author Companion Wulf
 
 @param --+ 'Loading...' Images +--
 @param ---------------------------
 
 @param Randomize Loading Images
 @desc Turns randomized "Loading" images On/Off
 @default On
 
 @param Total Loading Images
 @desc The total number of "Loading" images used.
 @default 3
 
 @param
 @param --+ Title Images +--
 @param ---------------------------
 
 @param Randomize Title Images
 @desc Turns randomized Title Screen images On/Off
 @default On
 
 @param Total Title Images
 @desc The total number of Title Screen images used.
 @default 4
 
 @param
 @param --+ Game Over Images +--
 @param ---------------------------
 
 @param Randomize Game Over Images
 @desc Turns randomized Game Over images on/off.
 @default On
 
 @param Total Game Over Images
 @desc The total number of Game Over images used.
 @default 3
 
 @help
 =======================================================================
 Randomize Title/Loading/Game Over Images Plugin (RMMV) v1.0
 =======================================================================

 Images must be named in sequence: Loading1, Loading2, Title1, Title2,
 GameOver1, GameOver2, etc. All images are in the "System" folder.

 "Total Images" for each parameter is the total number of images you've
 used plus one (to include the default). If this number is greater,
 the system defaults will be used instead.
 
 There are no plugin commands.
 
 This plugin is free to use under CC BY-NC 4.0, but please refer to the
 RPG Maker Times blogsite for other details.
 
 Credit "Companion Wulf" or "RPG Maker Times" if using this plugin in your projects.
 
 */

(function() {
	
	//-----------------------------------------------------------------------------
	// ** Parameters ** //
	//-----------------------------------------------------------------------------
	CWT.TiLoGo.parameters = PluginManager.parameters('CW_RandomizeTiLoGoImages');
	// * Randomized Loading Image
	CWT.TiLoGo.toggleRandomizeLoadingImg = String(CWT.TiLoGo.parameters['Randomize Loading Images'].toUpperCase() || 'ON') === 'ON' ? true : false;
	CWT.TiLoGo.numLoadingImg = Number(CWT.TiLoGo.parameters['Total Loading Images']);
	// * Randomized Title Image
	CWT.TiLoGo.toggleRandomizeTitleImg = String(CWT.TiLoGo.parameters['Randomize Title Images'].toUpperCase() || 'ON') === 'ON' ? true : false;
	CWT.TiLoGo.numTitleImg = Number(CWT.TiLoGo.parameters['Total Title Images']);
	// * Randomized Game Over Image
	CWT.TiLoGo.toggleRandomizeGameOverImg = String(CWT.TiLoGo.parameters['Randomize Game Over Images'].toUpperCase() || 'ON') === 'ON' ? true : false;
	CWT.TiLoGo.numGameOverImg = Number(CWT.TiLoGo.parameters['Total Game Over Images']);


	//-----------------------------------------------------------------------------
	// ** Loading... Images ** //
	//-----------------------------------------------------------------------------
	CWT.TiLoGo.CW_alias_Graphics_initGraphics = SceneManager.initGraphics;
	SceneManager.initGraphics = function() {		
		if (CWT.TiLoGo.toggleRandomizeLoadingImg) {
			var randomImageL = (Math.floor(Math.randomInt(CWT.TiLoGo.numLoadingImg)));
			randomImageL <= 0 ? src = 'Loading' : src = 'Loading'+randomImageL;
		}
		CWT.TiLoGo.CW_alias_Graphics_initGraphics.call(this, src);
	};
	
	//-----------------------------------------------------------------------------
	// ** Title Images ** //
	//-----------------------------------------------------------------------------
	CWT.TiLoGo.CW_alias_Scene_Title_createBackground = Scene_Title.prototype.createBackground;
	Scene_Title.prototype.createBackground = function() {
		if (CWT.TiLoGo.toggleRandomizeTitleImg) {
			var randomImageT = (Math.floor(Math.randomInt(CWT.TiLoGo.numTitleImg)));
			randomImageT <= 0 ? src = $dataSystem.title1Name : src = 'Title'+randomImageT;
			CWT.TiLoGo.CW_alias_Scene_Title_createBackground.call(this);
			this._backSprite1 = new Sprite(ImageManager.loadTitle1(src));
			this.addChild(this._backSprite1);
		} else {
			CWT.TiLoGo.CW_alias_Scene_Title_createBackground.call(this);
		}
	};
	
	//-----------------------------------------------------------------------------
	// ** Game Over Images ** //
	//-----------------------------------------------------------------------------
	CWT.TiLoGo.CW_alias_Scene_GameOver_createBackground = Scene_Gameover.prototype.createBackground;
	Scene_Gameover.prototype.createBackground = function() {
		if (CWT.TiLoGo.toggleRandomizeGameOverImg) {
			var randomImageG = (Math.floor(Math.randomInt(CWT.TiLoGo.numGameOverImg)));
			randomImageG <= 0 ? src = 'GameOver' : src = 'GameOver'+randomImageG;
		}
		this._backSprite = new Sprite(ImageManager.loadSystem(src));
		this.addChild(this._backSprite);
	};



	

	
	
})();



/*
=================================================================
 Randomize Title/Loading/Game Over Images Plugin Updates Log
	* This is primarily for my own use and because I like keeping records
	  of updates to any scripts/plugins I write to keep track.

	* Future Updates
		--Plugin has its own preload/precache method notably for browsers
		
		Version.Update.Bug Fix/Tweak
	
	* v1.0.0 [5.6] (Pending)
		--RELEASE: Version 1.0 (Public)
	* v0.5.6 [5.6] (17-Jun-2016)
		--TWEAK: Truncate and alias Randomize Loading Images function
		--BUG FIX: Options to toggle On/Off always 'true'
	* v0.5.4 [5.4] (03-May-2016)
		--BUG FIX: Random images use defaults if the random number is 0 or greater than the
			number of images defined in section parameters
		--TWEAK: Truncate if/else statements
		--BUG FIX: Random Title image not appearing
		--TWEAK: Reconstruct coding for better optimisation
		--ADD: Parameter options to turn each part On/Off
		--ADD: Randomize Game Over Images
		--ADD: Randomize Title Images
		--ADD: Randomize Loading Images
		--Create plugin (basically a rewrite of all three existing plugins)
=================================================================
*/




















